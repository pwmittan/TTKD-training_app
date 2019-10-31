/*
    Placeholder screen to allow for creation of components directory
    Will be either repurposed or deleted as development starts
*/

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Categories from './Categories';

const HomeScreen = () => {
  return (
    <View>
      <View style={styles.title}>
        <Text style={styles.titleText}>TTKD Home</Text>
      </View>
      <Categories />
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
