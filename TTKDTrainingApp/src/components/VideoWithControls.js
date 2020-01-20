import React, {useState, useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import {HeaderBackButton} from 'react-navigation-stack';

import Video from 'react-native-video';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  getContentOwnStepsSorted,
  getContentVideoUri,
} from './../redux/selectors';

const secondsToTime = time => {
  return `${Math.floor(time / 60)} : ${time % 60 < 10 ? '0' : ''} ${time % 60}`;
};
const RATES = [0.25, 0.5, 1.0, 1.25, 1.5, 2.0];
const DEFAULT_SPEED = 1.0;

const PROGRESS_BAR_WIDTH = 250;

const VideoWithControls = props => {
  const contentId =
    (props.navigation && props.navigation.getParam('contentId')) ||
    props.contentId;

  const steps = useSelector(state =>
    getContentOwnStepsSorted(state, contentId),
  );

  const recordedVideo =
    props.navigation && props.navigation.getParam('recordedVideo');

  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(DEFAULT_SPEED);
  const contentVideoUri = useSelector(state =>
    getContentVideoUri(state, contentId),
  );

  useEffect(() => {
    if (!props.isFocused) {
      setPaused(true);
    }
  }, [props.isFocused]);

  const handleLoad = meta => {
    setDuration(meta.duration);
    props.setVideoLength && props.setVideoLength(meta.duration);
  };
  const handlePlayPausePress = () => {
    if (progress >= 1) {
      contentVideoRef.current.seek(0);
      recordedVideoRef.current && recordedVideoRef.current.seek(0);
    }
    setPaused(!paused);
  };
  const handleProgressPress = e => {
    const progressBarPosition = e.nativeEvent.locationX;
    const seekTime = (progressBarPosition / PROGRESS_BAR_WIDTH) * duration;

    contentVideoRef.current.seek(seekTime);
    recordedVideoRef.current && recordedVideoRef.current.seek(seekTime);
  };
  const handleProgress = curProgress => {
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

  const handleStepPress = stepTime => {
    contentVideoRef.current.seek(stepTime);
    recordedVideoRef.current && recordedVideoRef.current.seek(stepTime);
  };

  const {width} = Dimensions.get('window');
  const videoHeight = width * 0.5265;
  const fullHeight = recordedVideo ? videoHeight * 2 : videoHeight;

  const recordedVideoRef = useRef(null);
  const contentVideoRef = useRef(null);

  return (
    <View style={styles.container}>
      {/* Videos */}
      <View style={{height: fullHeight, width: '100%'}}>
        <TouchableWithoutFeedback onPress={handlePlayPausePress}>
          <View>
            {recordedVideo && (
              <Video
                source={recordedVideo}
                paused={paused}
                rate={rate}
                resizeMode="contain"
                onEnd={handleEnd}
                ref={recordedVideoRef}
                style={{height: videoHeight, width: '100%'}}
              />
            )}
            <Video
              source={{uri: contentVideoUri}}
              paused={paused}
              rate={rate}
              // onBuffer={() => {
              //   console.log('buffering!');
              //   setPaused(true);
              // }}
              // bufferConfig={{
              //   minBufferMs: 15000,
              //   maxBufferMs: 50000,
              //   bufferForPlaybackMs: 2500,
              //   bufferForPlaybackAfterRebufferMs: 5000,
              // }}
              resizeMode="contain"
              onLoad={handleLoad}
              onError={e => console.error('ERROR: ', e)}
              onProgress={handleProgress}
              onEnd={handleEnd}
              ref={contentVideoRef}
              style={{height: videoHeight, width: '100%'}}
            />
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
      {/* Steps */}
      <View style={styles.steps}>
        <FlatList
          data={steps}
          keyExtractor={step => `${step.id}`}
          renderItem={({item}) => {
            const progressSeconds = Math.round(progress * duration);
            const isCurrentStep =
              (!item.start_time || item.start_time <= progressSeconds) &&
              (!item.end_time || item.end_time > progressSeconds);
            return (
              <TouchableOpacity
                onPress={() => handleStepPress(item.start_time || 0)}>
                <View
                  style={[
                    styles.step,
                    isCurrentStep ? styles.currentStep : null,
                  ]}>
                  <Text style={styles.stepText}>
                    {`\u2022 ${item.description}`}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
  steps: {
    width: '100%',
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
  controlsText: {
    color: 'rgb(255,255,255)',
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
