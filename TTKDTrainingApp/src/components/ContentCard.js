import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ContentCard = props => {
  const {navigation, content} = props;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Content', {content: content})}>
      <View style={styles.content}>
        <Text style={styles.contentText}>{content.title}</Text>
        <Image
          source={Image.resolveAssetSource(content.video)}
          style={styles.contentImage}
        />
        <Icon name="angle-right" size={24} />
      </View>
    </TouchableOpacity>
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
