import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './src/components/HomeScreen';

// const App: () => React$Node = () => {
//   return (
//     <React.Fragment>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <AppContainer />
//       </SafeAreaView>
//     </React.Fragment>
//   );
// };

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
});

export default createAppContainer(AppNavigator);
