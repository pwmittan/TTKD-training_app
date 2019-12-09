import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';

import HomeScreen from './src/components/HomeScreen';
import RecordVideo from './src/components/RecordVideo';

const App: () => React$Node = () => {
  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <HomeScreen />
        <RecordVideo />
      </SafeAreaView>
    </React.Fragment>
  );
};

export default App;
