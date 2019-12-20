import React, {PureComponent} from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';

class VideoThumbnail extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        {this.props.recordedVideos.map(video => (
          <TouchableOpacity
            key={video.uri}
            onPress={() => {
              this.props.navigation.navigate('VideoWithControls', {
                video: video,
                contentId: this.props.contentId,
              });
            }}>
            <View>
              <Image source={{uri: video.uri}} style={styles.thumbnail} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  thumbnail: {
    height: 75,
    width: 75,
  },
});

export default VideoThumbnail;
