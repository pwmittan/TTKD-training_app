import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Text, View, StyleSheet, TextInput, Button, Alert} from 'react-native';
import {setAppData} from '../redux/actions';
import {validateStudioCode} from '../api/API';

const Studio = ({navigation}) => {
  const dispatch = useDispatch();

  const [studio, setStudio] = useState('');

  const onSubmitStudio = () => {
    if (!studio.length) {
      Alert.alert('Please enter a studio code');
    } else {
      validateStudioCode(studio).then(res => {
        if (res) {
          dispatch(setAppData(res));
          navigation.replace('Category');
        } else {
          Alert.alert("Looks like that code didn't work, please try again");
        }
      });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please enter your Taekwondo Studio code</Text>
      <TextInput
        style={styles.studioInput}
        autoCapitalize="characters"
        onChangeText={text => setStudio(text)}
        onSubmitEditing={onSubmitStudio}
      />
      <Button title="Submit" onPress={onSubmitStudio} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  studioInput: {
    height: 40,
    width: '50%',
    marginVertical: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
  submitButton: {
    width: '50',
  },
});

Studio.navigationOptions = {
  title: 'Taekwondo Training App',
};

export default Studio;
