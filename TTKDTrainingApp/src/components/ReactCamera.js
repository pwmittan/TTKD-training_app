import React, {useState, useRef, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {withNavigationFocus} from 'react-navigation';

import {addRecordedVideo} from './../redux/actions';

const ReactCamera = props => {
  const {isFocused, navigation} = props;
  const contentId = navigation.getParam('contentId');
  const maxLength = navigation.getParam('maxLength');

  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (recording === true) {
      startRecording();
    }
  });

  const dispatch = useDispatch();
  const dispatchAddRecordedVideo = recordedvideo =>
    dispatch(addRecordedVideo({...recordedvideo, contentId}));

  const startRecording = async () => {
    // default to mp4 for android as codec is not set
    const recordedvideo = await cameraRef.current.recordAsync({
      mute: true,
      maxDuration: maxLength,
    });

    dispatchAddRecordedVideo(recordedvideo);
    setRecording(false);
  };

  // Simply commenting this code out in case we need to explicitly call stopRecording at any point
  // const stopRecording = () => {
  //   cameraRef.current.stopRecording();
  // };

  const button = (
    <TouchableOpacity onPress={() => setRecording(true)} style={styles.capture}>
      <Text style={styles.text}> RECORD </Text>
    </TouchableOpacity>
  );

  const cameraRef = useRef(null);

  return (
    isFocused && (
      <View style={styles.container}>
        <RNCamera
          ref={cameraRef}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'TTKD would like to access the Camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          // androidRecordAudioPermissionOptions={{
          //   title: 'Permission to use audio recording',
          //   message: 'We need your permission to use your audio',
          //   buttonPositive: 'Ok',
          //   buttonNegative: 'Cancel',
          // }}
        />
        {!recording && <View style={styles.button}>{button}</View>}
      </View>
    )
  );
};

ReactCamera.navigationOptions = {
  title: 'Recording',
};

export default withNavigationFocus(ReactCamera);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  button: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
  },
});
