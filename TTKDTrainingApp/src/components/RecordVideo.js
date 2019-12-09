import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class RecordVideo extends React.Component {
    constructor(props){
        super(props);
     
        this.state = {
           recording: false,
           processing: false
        }
     }

     
    async startRecording() {
        this.setState({ recording: true });
        // default to mp4 for android as codec is not set
        const { uri, codec = "mp4" } = await this.camera.recordAsync();
    }

    stopRecording() {
        this.camera.stopRecording();
    }

    render() {
        const { recording, processing } = this.state;
    
        let button = (
          <TouchableOpacity
            onPress={this.startRecording.bind(this)}
            style={styles.capture}
          >
            <Text style={{ fontSize: 14 }}> RECORD </Text>
          </TouchableOpacity>
        );
    
        if (recording) {
          button = (
            <TouchableOpacity
              onPress={this.stopRecording.bind(this)}
              style={styles.capture}
            >
              <Text style={{ fontSize: 14 }}> STOP </Text>
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
          <View style={styles.container}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              permissionDialogTitle={"Permission to use camera"}
              permissionDialogMessage={
                "We need your permission to use your camera phone"
              }
            />
            <View
              style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
            >
              {button}
            </View>
          </View>
        );
      }
};

const styles = StyleSheet.create({
    backButtonContainer: {
      paddingLeft: 8,
      height: 20,
    },
    backButton: {
      flexDirection: 'row',
    },
    backButtonText: {
      fontSize: 16,
    },
    title: {
      paddingHorizontal: 12,
      borderBottomWidth: 1,
    },
    titleText: {
      fontSize: 32,
      textAlign: 'center',
    },
  });