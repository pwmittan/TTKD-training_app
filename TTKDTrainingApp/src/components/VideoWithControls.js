import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import Video from 'react-native-video';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/FontAwesome';

function secondsToTime(time) {
  return `${Math.floor(time / 60)} : ${time % 60 < 10 ? '0' : ''} ${time % 60}`;
}
const RATES = [0.25, 0.5, 1.0, 1.25, 1.5, 2.0];
const DEFAULT_SPEED = 1.0;

export default class VideoWithControls extends Component {
  state = {
    paused: true,
    progress: 0,
    duration: 0,
    rate: DEFAULT_SPEED,
  };

  handlePlayPausePress = () => {
    if (this.state.progress >= 1) {
      this.player.seek(0);
    }
    this.setState(state => {
      return {paused: !state.paused};
    });
  };
  handleProgressPress = e => {
    const position = e.nativeEvent.locationX;
    const progress = (position / 250) * this.state.duration;
    this.player.seek(progress);
  };
  handleRateTouch = () => {
    this.setState({
      rate:
        RATES[
          (RATES.findIndex(rate => rate === this.state.rate) + 1) % RATES.length
        ],
    });
  };
  handleEnd = () => {
    this.setState({paused: true, progress: 1});
  };
  handleProgress = progress => {
    this.setState({
      progress: progress.currentTime / this.state.duration,
    });
  };
  handleLoad = meta => {
    this.setState({
      duration: meta.duration,
    });
  };

  render() {
    const {width} = Dimensions.get('window');
    const height = width * 0.5265;
    const {navigation} = this.props;
    const video = navigation ? navigation.getParam('video') : this.props.video;

    return (
      <View style={styles.container}>
        <View style={{height: height + 48, width: '100%'}}>
          <TouchableWithoutFeedback onPress={this.handlePlayPausePress}>
            <Video
              source={
                video.uri
                  ? {
                      uri: video.uri,
                    }
                  : video
              }
              paused={this.state.paused}
              rate={this.state.rate}
              resizeMode="contain"
              onLoad={this.handleLoad}
              onProgress={this.handleProgress}
              onEnd={this.handleEnd}
              ref={ref => (this.player = ref)}
              style={{height, width: '100%'}}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.controls}>
          <TouchableWithoutFeedback onPress={this.handlePlayPausePress}>
            <Icon
              name={!this.state.paused ? 'pause' : 'play'}
              size={30}
              color={Colors.white}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.handleProgressPress}>
            <View>
              <ProgressBar
                progress={this.state.progress}
                color={Colors.white}
                unfilledColor="rgba(255,255,255,0.5)"
                borderColor={Colors.white}
                width={250}
                height={20}
              />
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.duration}>
            {secondsToTime(
              Math.floor(this.state.progress * this.state.duration),
            )}
          </Text>
          <TouchableWithoutFeedback onPress={this.handleRateTouch}>
            <Text style={styles.rate}>{`${this.state.rate}x`}</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {width: '100%', alignItems: 'center', justifyContent: 'center'},
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
