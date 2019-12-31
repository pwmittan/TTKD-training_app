import React, {PureComponent} from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';

class VideoThumbnail extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        {this.props.recordedVideos.map(recordedVideo => (
          <TouchableOpacity
            key={recordedVideo.uri}
            onPress={() => {
              this.props.navigation.navigate('VideoWithControls', {
                recordedVideo: recordedVideo,
                contentId: this.props.contentId,
              });
            }}>
            <View>
              <Image
                source={{uri: recordedVideo.uri}}
                style={styles.thumbnail}
              />
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
