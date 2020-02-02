import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import VideoWithControls from './VideoWithControls';
import VideoThumbnail from './VideoThumbnail';
import {SafeAreaView} from 'react-navigation';

const Content = props => {
  const [videoLength, setVideoLength] = useState(0);
  const {navigation} = props;
  const content = navigation.getParam('content');

  const renderDesc = (
    <View style={styles.desc}>
      <Text style={styles.descText}>{content.description}</Text>
    </View>
  );

  const recordButton = (
    <Button
      title="Start Recording"
      onPress={() => {
        navigation.navigate('ReactCamera', {
          contentId: content.id,
          maxLength: videoLength,
        });
      }}
    />
  );

  return (
    <SafeAreaView
      style={styles.container}
      forceInset={{bottom: 'always', top: 'never'}}>
      {renderDesc}
      <VideoWithControls
        contentId={content.id}
        setVideoLength={setVideoLength}
      />
      {recordButton}
      <VideoThumbnail navigation={navigation} contentId={content.id} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  desc: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  descText: {
    fontSize: 14,
  },
});

Content.navigationOptions = ({navigation}) => {
  const content = navigation.getParam('content');
  return {
    title: content.title,
  };
};

export default Content;
