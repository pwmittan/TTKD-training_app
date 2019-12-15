import React from 'react';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';

import store from './src/redux/store';
import HomeScreenConnector from './src/components/HomeScreen';
import ReactCameraConnector from './src/components/ReactCamera';
import VideoWithControls from './src/components/VideoWithControls';
import Content from './src/components/Content';

const AppNavigator = createStackNavigator(
  {
    HomeScreen: HomeScreenConnector,
    ReactCamera: ReactCameraConnector,
    VideoWithControls: VideoWithControls,
    Content: Content,
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
