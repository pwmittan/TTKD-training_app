import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import Category from './Category';
import {setAppData} from '../redux/actions';

const InitialScreen = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAppData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Category navigation={navigation} />;
};

export default InitialScreen;
