import React, {useState, useRef, useEffect} from 'react';

import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import {HeaderBackButton} from 'react-navigation-stack';

import Video from 'react-native-video';

import Controls from './Controls';
import ContentVideo from './ContentVideo';

import {DEFAULT_SPEED} from './constants';
import Steps from './Steps';

const VideoWithControls = props => {
  /////////// Props/Navigation access////////////////
  const contentId =
    (props.navigation && props.navigation.getParam('contentId')) ||
    props.contentId;
  const recordedVideo =
    props.navigation && props.navigation.getParam('recordedVideo');

  //////////////// State ////////////////////////
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(DEFAULT_SPEED);
  const [loading, setLoading] = useState(true);

  ///////////////////// Effects /////////////////////

  useEffect(() => {
    if (!props.isFocused) {
      setPaused(true);
    }
  }, [props.isFocused]);

  ////////////////// Helper Methods ////////////////////

  const handleLoad = meta => {
    // Should be removed when video_length is added to db schema
    setDuration(meta.duration);
    props.setVideoLength && props.setVideoLength(meta.duration);

    setLoading(false);
    console.info('Finished loading');
  };

  const handlePlayPausePress = () => {
    progress >= 1 && Object.values(videoRefs).map(ref => ref.current.seek(0));
    setPaused(!paused);
  };

  const handleProgress = curProgress => {
    loading && setLoading(false);
    setProgress(curProgress.currentTime / duration);
  };

  const handleEnd = () => {
    setPaused(true);
    setProgress(1);
  };

  const {width} = Dimensions.get('window');
  const videoHeight = width * 0.5265;
  const fullHeight = recordedVideo ? videoHeight * 2 : videoHeight;

  const recordedVideoRef = useRef();
  const videoRefs = {
    contentVideoRef: useRef(),
    ...(recordedVideo ? {recordedVideoRef: recordedVideoRef} : {}),
  };

  ///////////////////////////// Render Code //////////////////////////////
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
                ref={videoRefs.recordedVideoRef}
                style={{height: videoHeight, ...styles.video}}
              />
            )}
            <ContentVideo
              contentId={contentId}
              paused={paused}
              rate={rate}
              handleLoad={handleLoad}
              handleProgress={handleProgress}
              handleEnd={handleEnd}
              videoHeight={videoHeight}
              ref={videoRefs.contentVideoRef}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Controls
        videoRefs={videoRefs}
        paused={paused}
        handlePlayPausePress={handlePlayPausePress}
        duration={duration}
        progress={progress}
        rate={rate}
        setRate={setRate}
      />
      <Steps
        videoRefs={videoRefs}
        contentId={contentId}
        progress={progress}
        duration={duration}
      />
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
