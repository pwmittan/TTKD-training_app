import React, {PureComponent} from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';

class VideoThumbnail extends PureComponent {
  render() {
    return (
      <View>
        {this.props.videos.map(video => (
          <TouchableOpacity
            key={video.uri}
            onPress={() => {
              this.props.navigation.navigate('VideoWithControls', {
                video: video.uri,
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
  thumbnail: {
    height: 75,
    width: 75,
  },
});

export default VideoThumbnail;