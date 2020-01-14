import React, {useState} from 'react';
import {View, Text, Button, ScrollView, StyleSheet} from 'react-native';

import VideoWithControls from './VideoWithControls';
import VideoThumbnail from './VideoThumbnail';

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
    <View>
      {renderDesc}
      <VideoWithControls
        contentId={content.id}
        setVideoLength={setVideoLength}
      />
      {recordButton}
      <ScrollView horizontal={true}>
        <VideoThumbnail navigation={navigation} contentId={content.id} />
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

Content.navigationOptions = ({navigation}) => {
  const content = navigation.getParam('content');
  return {
    title: content.title,
  };
};

export default Content;
