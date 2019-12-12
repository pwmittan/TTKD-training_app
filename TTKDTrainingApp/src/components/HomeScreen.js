/*
    Placeholder screen to allow for creation of components directory
    Will be either repurposed or deleted as development starts
*/

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Categories from './Categories';
import VideoThumbnailConnector from './VideoThumbnail';
import {getCategory, getCategories} from '../utilities/categories.js';

const HomeScreen = props => {
  const [categoryId, setCategoryId] = useState(null);
  const category = getCategory(categoryId);

  const renderBackButton = (
    <View style={styles.backButtonContainer}>
      {category && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCategoryId(category.parent_id)}>
          <Icon
            name="angle-left"
            size={20}
            style={styles.backButtonIcon}
            backgroundColor={null}
            onPress={() => setCategoryId(category.parent_id)}
          />
          <Text style={styles.backButtonText}>{' Back'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderTitle = (
    <View style={styles.title}>
      <Text style={styles.titleText}>
        {categoryId ? category.category_name : 'TTKD Home'}
      </Text>
    </View>
  );

  return (
    <View>
      {renderBackButton}
      {renderTitle}
      <Categories
        categories={getCategories(categoryId)}
        setCategoryId={setCategoryId}
      />
      <Button
        title="Start Recording"
        onPress={() => {
          props.navigation.navigate('ReactCamera');
        }}
      />
      <VideoThumbnailConnector style={{flex: 1}} />
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    paddingLeft: 8,
    height: 20,
  },
  backButton: {
    flexDirection: 'row',
  },
  backButtonText: {
    fontSize: 16,
  },
  title: {
    paddingHorizontal: 12,
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: 32,
    textAlign: 'center',
  },
});

export default HomeScreen;
