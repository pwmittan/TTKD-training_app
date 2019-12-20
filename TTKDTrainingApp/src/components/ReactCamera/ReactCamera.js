import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {withNavigationFocus} from 'react-navigation';

class ReactCamera extends PureComponent {
  state = {
    recording: false,
    processing: false,
  };
  render() {
    const {recording, processing} = this.state;
    const {isFocused} = this.props;

    let button = (
      <TouchableOpacity
        onPress={this.startRecording.bind(this)}
        style={styles.capture}>
        <Text style={styles.text}> RECORD </Text>
      </TouchableOpacity>
    );

    if (recording) {
      button = (
        <TouchableOpacity
          onPress={this.stopRecording.bind(this)}
          style={styles.capture}>
          <Text style={styles.text}> STOP </Text>
        </TouchableOpacity>
      );
    }

    if (processing) {
      button = (
        <View style={styles.capture}>
          <ActivityIndicator animating size={18} />
        </View>
      );
    }
    return (
      isFocused && (
        <View style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
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
  }

  async startRecording() {
    this.setState({recording: true});
    // default to mp4 for android as codec is not set
    const video = await this.camera.recordAsync({
      mute: true,
    });
    this.setState({recording: false, processing: true});
    this.props.addRecordedVideo({
      ...video,
      contentId: this.props.navigation.getParam('contentId'),
    });

    this.setState({processing: false});
  }
  stopRecording() {
    this.camera.stopRecording();
  }
}

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
