import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider, useDispatch} from 'react-redux';

import store from './src/redux/store';
import Category from './src/components/Category';
import ReactCamera from './src/components/ReactCamera';
import VideoWithControls from './src/components/VideoWithControls';
import Content from './src/components/Content';
import {setAppData} from './src/redux/actions';

const AppNavigator = createStackNavigator(
  {
    Category: Category,
    ReactCamera: ReactCamera,
    VideoWithControls: VideoWithControls,
    Content: Content,
  },
  {
    initialRouteName: 'Category',
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

const ConnectedApp = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAppData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Navigation />;
};

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    );
  }
}
