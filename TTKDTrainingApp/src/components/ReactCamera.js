import React, {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {withNavigationFocus} from 'react-navigation';

import {addRecordedVideo} from './../redux/actions';

const ReactCamera = props => {
  const [recording, setRecording] = useState(false);

  const {isFocused, navigation} = props;
  const contentId = navigation.getParam('contentId');
  const maxLength = navigation.getParam('maxLength');
  const dispatch = useDispatch();

  const dispatchAddRecordedVideo = recordedvideo =>
    dispatch(addRecordedVideo({...recordedvideo, contentId}));

  const startRecording = async () => {
    setRecording(true);
    // default to mp4 for android as codec is not set
    const recordedvideo = await cameraRef.current.recordAsync({
      mute: true,
      maxDuration: maxLength,
    });

    setRecording(false);
    dispatchAddRecordedVideo(recordedvideo);
  };
  const stopRecording = () => {
    cameraRef.current.stopRecording();
  };

  const buttonText = recording ? 'STOP' : 'RECORD';

  const button = (
    <View style={{opacity: recording ? 0 : 100}}>
      <TouchableOpacity
        onPress={recording ? stopRecording : startRecording}
        style={styles.capture}>
        <Text style={styles.text}> {buttonText} </Text>
      </TouchableOpacity>
    </View>
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
        <View style={styles.button}>{button}</View>
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
