import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ContentCard = props => {
  return (
    <View style={styles.content}>
      <Text style={styles.contentText}>{props.content.title}</Text>
      <Image
        source={Image.resolveAssetSource(props.content.video)}
        style={styles.contentImage}
      />
      <Icon name="angle-right" size={24} />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  contentText: {fontSize: 20, maxWidth: '75%'},
  contentImage: {
    height: 50,
    width: 50,
    backgroundColor: 'red',
  },
});

export default ContentCard;
