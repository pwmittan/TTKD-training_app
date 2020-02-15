import AsyncStorage from '@react-native-community/async-storage';

export const setStudio = studio => AsyncStorage.setItem('STUDIO', studio);

export const getStudio = async () =>
  await AsyncStorage.getItem('STUDIO')
    .then(studio => studio)
    .catch(err => console.info('Error getting studio from async storage', err));
