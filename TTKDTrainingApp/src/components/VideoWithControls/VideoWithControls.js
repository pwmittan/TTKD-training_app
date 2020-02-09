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
import Orientation from 'react-native-orientation-locker';

import ContentVideo from './ContentVideo';
import Controls from './Controls';
import Steps from './Steps';

import {DEFAULT_SPEED} from './constants';

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
  const [showControls, setShowControls] = useState(false);

  const [videoHeight, setVideoHeight] = useState(0);
  const [videoRatio, setVideoRatio] = useState(16 / 9);
  const [isPortrait, setIsPortrait] = useState(true);

  ///////////////////// Effects /////////////////////

  useEffect(() => {
    if (!props.isFocused) {
      setPaused(true);
    }
  }, [props.isFocused]);

  useEffect(() => {
    Orientation.addOrientationListener(onOrientationChange);
    // Calling it because it doesn't happen on mount
    Orientation.getOrientation(orientation => onOrientationChange(orientation));

    return () => Orientation.removeOrientationListener(onOrientationChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onOrientationChange = orientation => {
    const {width, height} = Dimensions.get('window');
    const smallDim = Math.min(width, height);
    const bigDim = Math.max(width, height);

    if (orientation === 'PORTRAIT' || orientation === 'PORTRAIT-UPSIDEDOWN') {
      setIsPortrait(true);
      setVideoHeight(smallDim / videoRatio);
    } else {
      setIsPortrait(false);
      const maxHeight = smallDim - 185;
      setVideoHeight(
        bigDim / videoRatio > maxHeight ? maxHeight : bigDim / videoRatio,
      );
    }
  };

  ////////////////// Helper Methods ////////////////////

  const handleLoad = meta => {
    setDuration(meta.duration);
    setVideoRatio(meta.naturalSize.width / meta.naturalSize.height);

    setLoading(false);
    setShowControls(true);
    console.info('Finished loading');
  };

  const handlePlayPausePress = () => {
    progress >= 1 && Object.values(videoRefs).map(ref => ref.current.seek(0));
    paused && setTimeout(() => setShowControls(false), 1500);
    setPaused(!paused);
  };

  const handleProgress = curProgress => {
    loading && setLoading(false);
    setProgress(curProgress.currentTime / duration);
  };

  const handleEnd = () => {
    setPaused(true);
    setProgress(1);
    setShowControls(true);
  };

  const recordedVideoRef = useRef();
  const videoRefs = {
    contentVideoRef: useRef(),
    ...(recordedVideo ? {recordedVideoRef: recordedVideoRef} : {}),
  };

  const videoWidth = !isPortrait && recordedVideo ? '50%' : '100%';

  ///////////////////////////// Render Code //////////////////////////////
  return (
    <View style={styles.container}>
      {/* Videos */}
      <View style={styles.fullWidth}>
        <TouchableWithoutFeedback
          onPress={() => setShowControls(!showControls)}>
          <View
            style={{
              ...styles.fullWidth,
              ...(isPortrait ? styles.flexColumn : styles.flexRow),
            }}>
            {recordedVideo && (
              <Video
                poster={recordedVideo.uri}
                source={recordedVideo}
                paused={paused}
                rate={rate}
                resizeMode="contain"
                ref={videoRefs.recordedVideoRef}
                style={{
                  height: videoHeight,
                  width: videoWidth,
                }}
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
              videoWidth={videoWidth}
              ref={videoRefs.contentVideoRef}
            />
          </View>
        </TouchableWithoutFeedback>
        <Controls
          show={showControls}
          videoRefs={videoRefs}
          paused={paused}
          handlePlayPausePress={handlePlayPausePress}
          duration={duration}
          progress={progress}
          rate={rate}
          setRate={setRate}
          maxWidth={
            !isPortrait && recordedVideo ? '100%' : videoHeight * videoRatio
          }
        />
      </View>
      <Steps
        videoRefs={videoRefs}
        contentId={contentId}
        progress={progress}
        duration={duration}
      />
      {/* Loading Indicator */}
      <ActivityIndicator
        style={{
          top:
            (isPortrait && recordedVideo ? videoHeight : videoHeight / 2) - 18,
          ...styles.activityIndicator,
        }}
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
  },
  fullWidth: {
    width: '100%',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
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
    title: (navigation.getParam('recordedVideo') && 'Comparison') || 'Playback',
  };
};

export default withNavigationFocus(VideoWithControls);
