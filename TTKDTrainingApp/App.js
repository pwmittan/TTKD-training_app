import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './src/components/HomeScreen';
import ReactCamera from './src/components/ReactCamera';

const AppNavigator = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    ReactCamera: ReactCamera,
  },
  {
    initialRouteName: 'HomeScreen',
  },
);

export default createAppContainer(AppNavigator);
