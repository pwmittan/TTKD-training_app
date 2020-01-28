import React from 'react';
import {View, TouchableWithoutFeedback, Text, StyleSheet} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/FontAwesome';

import {PROGRESS_BAR_WIDTH} from './constants';

const RATES = [0.25, 0.5, 1.0, 1.25, 1.5, 2.0];

const secondsToTime = time => {
  return `${Math.floor(time / 60)} : ${time % 60 < 10 ? '0' : ''} ${time % 60}`;
};

const Controls = props => {
  const {
    videoRefs,
    paused,
    handlePlayPausePress,
    duration,
    progress,
    rate,
    setRate,
  } = props;

  const handleProgressPress = e => {
    const progressBarPosition = e.nativeEvent.locationX;
    const seekTime = (progressBarPosition / PROGRESS_BAR_WIDTH) * duration;

    Object.values(videoRefs).map(ref => ref.current.seek(seekTime));
  };

  const handleRateTouch = () =>
    setRate(
      RATES[
        (RATES.findIndex(listRate => listRate === rate) + 1) % RATES.length
      ],
    );

  return (
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
  );
};

const styles = StyleSheet.create({
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
});

export default Controls;
