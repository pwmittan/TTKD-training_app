import React from 'react';
import {View, Text, Button, ScrollView, StyleSheet} from 'react-native';

import VideoWithControlsConnector from './VideoWithControls';
import VideoThumbnailConnector from './VideoThumbnail';

const Content = props => {
  const {navigation} = props;
  const content = navigation.getParam('content');

  const renderTitle = (
    <View style={styles.title}>
      <Text style={styles.titleText}>{content.title}</Text>
    </View>
  );

  const renderDesc = (
    <View style={styles.desc}>
      <Text style={styles.descText}>{content.description}</Text>
    </View>
  );

  const recordButton = (
    <Button
      title="Start Recording"
      onPress={() => {
        navigation.navigate('ReactCamera', {contentId: content.id});
      }}
    />
  );

  return (
    <View>
      {renderTitle}
      {renderDesc}
      <VideoWithControlsConnector contentVideo={content.video} />
      {recordButton}
      <ScrollView horizontal={true}>
        <VideoThumbnailConnector
          navigation={navigation}
          contentId={content.id}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 12,
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: 28,
    textAlign: 'center',
  },
  desc: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  descText: {
    fontSize: 14,
  },
});

export default Content;
