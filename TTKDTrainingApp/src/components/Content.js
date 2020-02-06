import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import VideoWithControls from './VideoWithControls';
import VideoThumbnail from './VideoThumbnail';
import {SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const Content = props => {
  const {navigation} = props;
  const content = navigation.getParam('content');

  const renderDesc = (
    <View style={styles.desc}>
      <Text style={styles.descText}>{content.description}</Text>
    </View>
  );

  return (
    <SafeAreaView
      style={styles.container}
      forceInset={{bottom: 'always', top: 'never'}}>
      {renderDesc}
      <VideoWithControls contentId={content.id} />
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
  headerRightContainer: {
    flexDirection: 'row',
  },
  headerRightIcon: {
    marginTop: 2,
  },
  headerRightText: {
    marginHorizontal: 8,
    color: 'rgb(255,255,255)',
    fontSize: 18,
  },
});

Content.navigationOptions = ({navigation}) => {
  const content = navigation.getParam('content');
  return {
    title: content.title,
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ReactCamera', {
            contentId: content.id,
          });
        }}>
        <View style={styles.headerRightContainer}>
          <Icon
            name="md-videocam"
            size={20}
            color="rgb(255,255,255)"
            style={styles.headerRightIcon}
          />
          <Text style={styles.headerRightText}>Record</Text>
        </View>
      </TouchableOpacity>
    ),
  };
};

export default Content;
