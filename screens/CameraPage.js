import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { Camera, Constants } from 'expo-camera';
import { Video } from 'expo-av';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

//For Flask API Call hosted on the same local device
const ip_add = "192.168.214.170"
const port_add = "5000"
const uri = "http://" + {ip_add} +":"+{port_add}+"/phone"

export default function CameraPage(){
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [isRecording, setIsRecording] = useState(false);
    const [video, setVideo] = useState();
  
    useEffect(() => {
      (async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
        const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
  
        setHasCameraPermission(cameraPermission.status === "granted");
        setHasMicrophonePermission(microphonePermission.status === "granted");
        setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
      })();
    }, []);
  
    if (hasCameraPermission === undefined || hasMicrophonePermission === undefined) {
      return <Text>Requestion permissions...</Text>
    } else if (!hasCameraPermission) {
      return <Text>Permission for camera not granted.</Text>
    }
    const formData = new FormData()

    const runner = () => {

      recordVideo()
      setTimeout(()=>{
        stopRecording()

        url = "http://192.168.214.170:5000/phone"

        const getArticlesFromApi = async () => {
            let response = await fetch(
              url,{
                method : 'POST',
                body : formData
              }); 
            let json = await response.json();
            console.log(json)
            return json;
        }

        getArticlesFromApi();
      
      },5000)
    }
  
    let recordVideo = () => {
      setIsRecording(true);
      let options = {
        quality: "720p",
        maxDuration: 180,
        mute: true
        };
  
      cameraRef.current.recordAsync(options).then((recordedVideo) => {
        setVideo(recordedVideo);
        
        formData.append('video', video)
        setIsRecording(false);
      });
    };
  
    let stopRecording = () => {
      setIsRecording(false);
      cameraRef.current.stopRecording();
      
    };
  
    if (video) {
      let shareVideo = () => {
        shareAsync(video.uri).then(() => {
          setVideo(undefined);
        });
      };
  

  
      return (
        <SafeAreaView style={styles.container}>
          <Video
            style={styles.video}
            source={{uri: video.uri}}
            useNativeControls
            resizeMode='contain'
            isLooping
          />
          <Button title="Share" onPress={shareVideo} />
          {hasMediaLibraryPermission ? <Button title="Save" /> : undefined}
          <Button title="Discard" onPress={() => setVideo(undefined)} />
        </SafeAreaView>
      );
    }
  
    return (
      <Camera style={styles.container} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <Button title={isRecording ? "Stop Recording" : "Record Video"} onPress={runner} />
        </View>
      </Camera>
    );
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: "#fff",
        alignSelf: "flex-end"
    },
    video: {
        flex: 1,
        alignSelf: "stretch"
    }
});