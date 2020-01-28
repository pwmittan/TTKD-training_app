import React, {useState, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import {HeaderBackButton} from 'react-navigation-stack';

import Video from 'react-native-video';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  getContentOwnStepsSorted,
  getContentOwnVideoUri,
  getContentOwnCachedVideoPath,
} from './../redux/selectors';
import {genCachedUri} from './../redux/actions';

const RATES = [0.25, 0.5, 1.0, 1.25, 1.5, 2.0];
const DEFAULT_SPEED = 1.0;
const PROGRESS_BAR_WIDTH = 250;
const BASE_URI = 'https://ttkd-test-s3.s3.amazonaws.com/ttkd';

const secondsToTime = time => {
  return `${Math.floor(time / 60)} : ${time % 60 < 10 ? '0' : ''} ${time % 60}`;
};

const VideoWithControls = props => {
  const dispatch = useDispatch();

  /////////// Props/Navigation access////////////////
  const contentId =
    (props.navigation && props.navigation.getParam('contentId')) ||
    props.contentId;
  const recordedVideo =
    props.navigation && props.navigation.getParam('recordedVideo');

  ////////////////// Selector Access /////////////////////
  const steps = useSelector(state =>
    getContentOwnStepsSorted(state, contentId),
  );
  const contentVideoUri = useSelector(state =>
    getContentOwnVideoUri(state, contentId),
  );
  const cachedVideoPath = useSelector(state =>
    getContentOwnCachedVideoPath(state, contentId),
  );

  //////////////// State ////////////////////////
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(DEFAULT_SPEED);
  const [loading, setLoading] = useState(true);

  //Remove and do it a better way
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  ///////////////////// Effects /////////////////////
  useEffect(() => {
    Array.isArray(steps) &&
      steps.length &&
      flatListRef.current &&
      flatListRef.current.scrollToIndex({index: currentStepIndex});
  }, [steps, currentStepIndex]);

  useEffect(() => {
    !cachedVideoPath &&
      dispatch(genCachedUri(contentId, BASE_URI, contentVideoUri));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!props.isFocused) {
      setPaused(true);
    }
  }, [props.isFocused]);

  ////////////////// Helper Methods ////////////////////

  const handleLoad = meta => {
    setDuration(meta.duration);
    props.setVideoLength && props.setVideoLength(meta.duration);
    setLoading(false);
    console.info('Finished loading');
  };

  const handlePlayPausePress = () => {
    progress >= 1 && Object.values(videoRefs).map(ref => ref.current.seek(0));
    setPaused(!paused);
  };

  const handleProgressPress = e => {
    const progressBarPosition = e.nativeEvent.locationX;
    const seekTime = (progressBarPosition / PROGRESS_BAR_WIDTH) * duration;

    Object.values(videoRefs).map(ref => ref.current.seek(seekTime));
  };
  const handleProgress = curProgress => {
    loading && setLoading(false);
    setProgress(curProgress.currentTime / duration);
  };
  const handleRateTouch = () =>
    setRate(
      RATES[
        (RATES.findIndex(listRate => listRate === rate) + 1) % RATES.length
      ],
    );
  const handleEnd = () => {
    setPaused(true);
    setProgress(1);
  };

  const handleStepPress = stepTime =>
    Object.values(videoRefs).map(ref => ref.current.seek(stepTime));

  const {width} = Dimensions.get('window');
  const videoHeight = width * 0.5265;
  const fullHeight = recordedVideo ? videoHeight * 2 : videoHeight;

  const recordedVideoRef = useRef();
  const videoRefs = {
    contentVideoRef: useRef(),
    ...(recordedVideo ? {recordedVideoRef: recordedVideoRef} : {}),
  };
  const flatListRef = useRef();

  ///////////////////////////// Render Code //////////////////////////////

  const renderSteps = (
    <View style={styles.steps}>
      <FlatList
        onScrollToIndexFailed={error => {
          console.info('onScrollToIndex failed', error);
        }}
        ref={flatListRef}
        data={steps}
        keyExtractor={step => `${step.id}`}
        renderItem={({item, index}) => {
          const progressSeconds = Math.round(progress * duration);
          const isCurrentStep =
            (!item.start_time || item.start_time <= progressSeconds) &&
            (!item.end_time || item.end_time > progressSeconds);
          isCurrentStep &&
            index !== currentStepIndex &&
            setCurrentStepIndex(index);
          return (
            <TouchableOpacity
              onPress={() => handleStepPress(item.start_time || 0)}>
              <View
                style={[
                  styles.step,
                  isCurrentStep ? styles.currentStep : null,
                ]}>
                <Text style={styles.stepText}>
                  {`${index + 1}: ${item.description}`}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Videos */}
      <View style={{height: fullHeight, ...styles.video}}>
        <TouchableWithoutFeedback onPress={handlePlayPausePress}>
          <View>
            {recordedVideo && (
              <Video
                source={recordedVideo}
                paused={paused}
                rate={rate}
                resizeMode="contain"
                onEnd={handleEnd}
                ref={videoRefs.recordedVideoRef}
                style={{height: videoHeight, ...styles.video}}
              />
            )}
            {cachedVideoPath && (
              <Video
                source={{
                  uri: cachedVideoPath,
                }}
                paused={paused}
                rate={rate}
                // Because we are downloading and caching videos, there should realistically
                // never be a time where the video needs to buffer
                // onBuffer={() => {
                //   console.info('Loading!');
                //   setLoading(true);
                // }}
                // bufferConfig={{
                //   minBufferMs: 15000,
                //   maxBufferMs: 50000,
                //   bufferForPlaybackMs: 2500,
                //   bufferForPlaybackAfterRebufferMs: 5000,
                // }}
                resizeMode="contain"
                onLoad={handleLoad}
                onError={e => console.info('Error on Video', e)}
                onProgress={handleProgress}
                onEnd={handleEnd}
                ref={videoRefs.contentVideoRef}
                style={{height: videoHeight, ...styles.video}}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* Controls */}
      <View style={styles.controls}>
        <TouchableWithoutFeedback onPress={handlePlayPausePress}>
          <Icon
            name={!paused ? 'pause' : 'play'}
            size={30}
            color="rgb(255,255,255)"
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleProgressPress}>
          <View>
            <ProgressBar
              progress={progress}
              color="rgb(255,255,255)"
              unfilledColor="rgba(255,255,255,0.5)"
              borderColor="rgb(255,255,255)"
              width={PROGRESS_BAR_WIDTH}
              height={20}
            />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.controlsText}>
          {secondsToTime(Math.floor(progress * duration))}
        </Text>
        <TouchableWithoutFeedback onPress={handleRateTouch}>
          <Text style={styles.controlsText}>{`${rate}x`}</Text>
        </TouchableWithoutFeedback>
      </View>
      {renderSteps}
      {/* Loading Indicator */}
      <ActivityIndicator
        style={{top: fullHeight / 2 - 16, ...styles.activityIndicator}}
        animating={loading}
        size="large"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
  },
  controls: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  controlsText: {
    color: 'rgb(255,255,255)',
  },
  steps: {
    height: 50,
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
  },
  step: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  currentStep: {
    backgroundColor: '#C4BBBB',
  },
  stepText: {
    fontSize: 16,
  },
  activityIndicator: {
    position: 'absolute',
  },
});

VideoWithControls.navigationOptions = ({navigation}) => {
  return {
    headerLeft: (
      <HeaderBackButton
        tintColor="white"
        onPress={() => navigation.navigate('Content')}
      />
    ),
  };
};

export default withNavigationFocus(VideoWithControls);
