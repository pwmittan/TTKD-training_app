import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {getRecordedVideosForContent} from './../redux/selectors';

const VideoThumbnail = props => {
  const recordedVideos = useSelector(state =>
    getRecordedVideosForContent(state, props.contentId),
  );
  return (
    <View style={styles.container}>
      {recordedVideos.map(recordedVideo => (
        <TouchableOpacity
          key={recordedVideo.uri}
          onPress={() => {
            props.navigation.navigate('VideoWithControls', {
              recordedVideo: recordedVideo,
              contentId: props.contentId,
            });
          }}>
          <View>
            <Image source={{uri: recordedVideo.uri}} style={styles.thumbnail} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  thumbnail: {
    height: 75,
    width: 75,
  },
});

export default VideoThumbnail;
