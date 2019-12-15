import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import VideoWithControls from './VideoWithControls';

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

  return (
    <View>
      {renderTitle}
      {renderDesc}
      <VideoWithControls video={content.video} />
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
