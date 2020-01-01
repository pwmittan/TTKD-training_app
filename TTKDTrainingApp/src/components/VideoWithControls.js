import React, {useState, useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import Video from 'react-native-video';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/FontAwesome';

import {getContentOwnVideo} from './../redux/selectors';

const secondsToTime = time => {
  return `${Math.floor(time / 60)} : ${time % 60 < 10 ? '0' : ''} ${time % 60}`;
};
const RATES = [0.25, 0.5, 1.0, 1.25, 1.5, 2.0];
const DEFAULT_SPEED = 1.0;

const PROGRESS_BAR_WIDTH = 250;

const VideoWithControls = props => {
  const contentId = props.navigation && props.navigation.getParam('contentId');

  let contentVideo = useSelector(state => getContentOwnVideo(state, contentId));
  if (!contentVideo) {
    contentVideo = props.contentVideo;
  }
  const recordedVideo =
    props.navigation && props.navigation.getParam('recordedVideo');

  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(DEFAULT_SPEED);

  useEffect(() => {
    setPaused(true);
  }, [props.isFocused]);

  const handlePlayPausePress = () => {
    if (progress >= 1) {
      contentVideoRef.current.seek(0);
      recordedVideoRef.current && recordedVideoRef.current.seek(0);
    }
    setPaused(!paused);
  };
  const handleProgressPress = e => {
    const position = e.nativeEvent.locationX;
    const newProgress = (position / PROGRESS_BAR_WIDTH) * duration;
    contentVideoRef.current.seek(newProgress);
    recordedVideoRef.current && recordedVideoRef.current.seek(newProgress);
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
  const handleProgress = curProgress =>
    setProgress(curProgress.currentTime / duration);
  const handleLoad = meta => {
    setDuration(meta.duration);
    props.setVideoLength && props.setVideoLength(meta.duration);
  };

  const {width} = Dimensions.get('window');
  const videoHeight = width * 0.5265;
  const fullHeight = recordedVideo ? videoHeight * 2 : videoHeight;

  // Shim to be able to use local video files until file hosting is working
  const contentVideoSource = contentVideo.uri
    ? {uri: contentVideo.uri}
    : contentVideo;

  const recordedVideoRef = useRef(null);
  const contentVideoRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={{height: fullHeight + 48, width: '100%'}}>
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
              source={contentVideoSource}
              paused={paused}
              rate={rate}
              resizeMode="contain"
              onLoad={handleLoad}
              onProgress={handleProgress}
              onEnd={handleEnd}
              ref={contentVideoRef}
              style={{height: videoHeight, width: '100%'}}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.controls}>
        <TouchableWithoutFeedback onPress={handlePlayPausePress}>
          <Icon
            name={!paused ? 'pause' : 'play'}
            size={30}
            color={Colors.white}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleProgressPress}>
          <View>
            <ProgressBar
              progress={progress}
              color={Colors.white}
              unfilledColor="rgba(255,255,255,0.5)"
              borderColor={Colors.white}
              width={PROGRESS_BAR_WIDTH}
              height={20}
            />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.duration}>
          {secondsToTime(Math.floor(progress * duration))}
        </Text>
        <TouchableWithoutFeedback onPress={handleRateTouch}>
          <Text style={styles.rate}>{`${rate}x`}</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 48,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  mainButton: {
    marginRight: 15,
  },
  duration: {
    color: Colors.white,
    marginLeft: 15,
  },
  rate: {
    color: Colors.white,
  },
});

export default withNavigationFocus(VideoWithControls);
