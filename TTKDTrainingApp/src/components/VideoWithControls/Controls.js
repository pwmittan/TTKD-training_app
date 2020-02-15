import React, {useState, useEffect} from 'react';

import {Text, StyleSheet, Animated} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';

import {RATES} from './constants';
import {TouchableOpacity} from 'react-native-gesture-handler';

const BUTTON_SLOP = {top: 20, left: 20, bottom: 20, right: 20};

const secondsToTime = time => {
  return `${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`;
};

const Controls = props => {
  const {
    show,
    videoRefs,
    paused,
    handlePlayPausePress,
    duration,
    progress,
    rate,
    setRate,
    maxWidth,
  } = props;

  const [animValue] = useState(new Animated.Value(0));

  const onSeek = data => {
    const seekTime = data * duration;
    Object.values(videoRefs).map(ref => ref.current.seek(seekTime));
  };

  const handleRatePress = () =>
    setRate(
      RATES[
        (RATES.findIndex(listRate => listRate === rate) + 1) % RATES.length
      ],
    );

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: show ? 1 : 0,
      duration: 500,
    }).start();
  }, [show, animValue]);

  return (
    <Animated.View
      style={{
        opacity: animValue,
        ...styles.controls,
        maxWidth: maxWidth,
      }}>
      <TouchableOpacity onPress={handlePlayPausePress} hitSlop={BUTTON_SLOP}>
        <Icon
          name={!paused ? 'pause' : 'play'}
          size={24}
          color="rgb(255,255,255)"
        />
      </TouchableOpacity>
      <Slider
        disabled={!show}
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
      <TouchableOpacity onPress={handleRatePress} hitSlop={BUTTON_SLOP}>
        <Text style={styles.controlsText}>{`${rate}x`}</Text>
      </TouchableOpacity>
    </Animated.View>
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
    paddingHorizontal: 12,
  },
  controlsSlider: {
    width: '70%',
  },
  controlsText: {
    paddingRight: 4,
    fontSize: 20,
    color: 'rgb(255,255,255)',
  },
});

export default Controls;
