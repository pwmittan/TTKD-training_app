import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {View} from 'react-native';

import {getStudio} from '../asyncStorage/asyncStorage';
import {setAppData} from '../redux/actions';

const InitialScreen = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getStudio().then(studio => {
      if (studio) {
        dispatch(setAppData(studio));
        navigation.replace('Category');
      } else {
        navigation.replace('Studio');
      }
    });
    // dispatch(setAppData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <View />;
};

export default InitialScreen;
