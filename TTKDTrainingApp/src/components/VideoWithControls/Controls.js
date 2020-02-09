import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';

import {RATES} from './constants';
import {TouchableOpacity} from 'react-native-gesture-handler';

const BUTTON_SLOP = {top: 10, left: 10, bottom: 10, right: 10};

const secondsToTime = time => {
  return `${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`;
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
    maxWidth,
  } = props;

  const onSeek = data => {
    const seekTime = data * duration;
    Object.values(videoRefs).map(ref => ref.current.seek(seekTime));
  };

  const onFastBackward = () => {
    const curRateIndex = RATES.findIndex(listRate => listRate === rate);
    setRate(curRateIndex <= 0 ? RATES[curRateIndex] : RATES[curRateIndex - 1]);
  };

  const onFastForward = () => {
    const curRateIndex = RATES.findIndex(listRate => listRate === rate);
    setRate(
      curRateIndex + 1 >= RATES.length
        ? RATES[curRateIndex]
        : RATES[curRateIndex + 1],
    );
  };

  return (
    <View
      style={{
        ...styles.controls,
        maxWidth: maxWidth,
      }}>
      <TouchableOpacity onPress={handlePlayPausePress} hitSlop={BUTTON_SLOP}>
        <Icon
          name={!paused ? 'pause' : 'play'}
          size={20}
          color="rgb(255,255,255)"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onFastBackward} hitSlop={BUTTON_SLOP}>
        <Icon name="fast-backward" size={20} color="rgb(255,255,255)" />
      </TouchableOpacity>
      <Slider
        style={styles.controlsSlider}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={onSeek}
        value={progress}
      />
      <Text style={styles.controlsText}>
        {secondsToTime(Math.floor(progress * duration))}
      </Text>
      <TouchableOpacity onPress={onFastForward} hitSlop={BUTTON_SLOP}>
        <Icon name="fast-forward" size={20} color="rgb(255,255,255)" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  controlsSlider: {
    width: '60%',
  },
  controlsText: {
    color: 'rgb(255,255,255)',
  },
});

export default Controls;
