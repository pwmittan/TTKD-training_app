import React from 'react';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';

import store from './src/redux/store';
import InitialScreen from './src/components/InitialScreen';
import Category from './src/components/Category';
import ReactCamera from './src/components/ReactCamera';
import VideoWithControls from './src/components/VideoWithControls';
import Content from './src/components/Content';

const AppNavigator = createStackNavigator(
  {
    InitialScreen: InitialScreen,
    Category: Category,
    ReactCamera: ReactCamera,
    VideoWithControls: VideoWithControls,
    Content: Content,
  },
  {
    initialRouteName: 'InitialScreen',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'gray',
        height: 40,
      },

      headerTintColor: 'white',
    },
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
