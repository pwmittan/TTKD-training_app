import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';

import store from './src/redux/store';
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

const Navigation = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
