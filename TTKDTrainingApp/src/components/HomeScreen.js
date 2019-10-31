/*
    Placeholder screen to allow for creation of components directory
    Will be either repurposed or deleted as development starts
*/

import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Categories from './Categories';
import {getCategory, getCategories} from '../utilities/categories.js';

const HomeScreen = () => {
  const [categoryId] = useState(null);

  const renderTitle = (
    <View style={styles.title}>
      <Text style={styles.titleText}>
        {categoryId ? getCategory.category_name : 'TTKD Home'}
      </Text>
    </View>
  );

  return (
    <View>
      {renderTitle}
      <Categories categories={getCategories(categoryId)} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: 32,
  },
});

export default HomeScreen;
