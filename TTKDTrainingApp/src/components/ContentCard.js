import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getContentImageUri} from '../redux/selectors';

const ContentCard = props => {
  const {navigation, content} = props;
  const thumbnailUri = useSelector(state =>
    getContentImageUri(state, content.id),
  );

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Content', {content: content})}>
      <View style={styles.content}>
        <Text style={styles.contentText}>{content.title}</Text>
        <Image
          source={{
            uri: thumbnailUri,
          }}
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
  },
});

export default ContentCard;
