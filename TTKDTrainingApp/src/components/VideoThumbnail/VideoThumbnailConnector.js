import React, {PureComponent} from 'react';
import {StyleSheet, Image, View} from 'react-native';

class VideoThumbnail extends PureComponent {
  render() {
    return (
      <View>
        {this.props.videos.map(video => (
          <View key={video.uri}>
            <Image source={{uri: video.uri}} style={styles.thumbnail} />
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  thumbnail: {
    height: 75,
    width: 75,
  },
});

export default VideoThumbnail;
