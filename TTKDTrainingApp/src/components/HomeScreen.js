/*
    Placeholder screen to allow for creation of components directory
    Will be either repurposed or deleted as development starts
*/

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>This is the placeholder HomeScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
  },
});

export default HomeScreen;
