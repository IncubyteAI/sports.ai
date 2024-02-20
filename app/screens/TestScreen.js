import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { themeColors } from '../assets/theme'
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import base64 from 'base-64';
import * as FileSystem from 'expo-file-system';

{/* tfjs target dir, http-server --cors 
    python3 server.py 
    curl -u tanay:YanatPlayz -X POST -F "file=@Tennis/RData/Stage6/Stage6_R0rf1.mp4" http://127.0.0.1:5000/predict*/}
export default function TestScreen() {
    const [model, setModel] = useState(null);
    const uriToBase64 = async (uri) => {
      let base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
      });
      return base64;
  };
  const toServer = async (mediaFile) => {
      console.log(mediaFile.uri);
      let type = mediaFile.type;
      let schema = "http://";
      let host = "127.0.0.1";
      let route = "/predict";
      let port = "5000";
      let url = "";
      let content_type = "video/mp4";
      url = schema + host + ":" + port + route;
      console.log(url);

      try {
        const response = await FileSystem.uploadAsync('http://127.0.0.1:5000/predict', mediaFile.uri, {
          fieldName: 'file',
          headers: {
            "content-type": content_type,
          },
          httpMethod: 'POST',
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        });
        console.log('Response status:', response.status);
        console.log('headers: ' + response.frames);
        console.log('stages: ' + response.stages);
      } catch (error) {
        console.log(error);
      }
  };
  
  const makePrediction = async () => {
      if (model && image) {
          console.log('Attempting to send: ' + image);
          try {
              // Convert the local file URI to a Base64 string
              const base64 = await uriToBase64(image);
              await toServer({
                  type: 'video',
                  uri: image,
              });
          } catch (error) {
              console.error('There was a problem with the fetch operation:', error);
          }
      } else {
          console.log('Model not loaded yet or no video uploaded.');
      }
  };

      useEffect(() => {
        async function loadModel() {
           console.log("Loading custom model...");
           const tfReady = await tf.ready();
           const modelJson = require('../assets/tfjs-target-directory/model.json');
           const modelWeights = require('../assets/tfjs-target-directory/group1-shard1of1.bin');
           const loadedModel = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
           setModel(loadedModel);
           console.log("Custom model loaded.");
        }
        loadModel().catch(error => console.error('Error loading the model', error));
       }, []);
    
    
    const [image, setImage] = useState(null);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        quality: 1,
        });
        if (!result.canceled){
        setImage(result.assets[0].uri);
        }
    }
  return (
    
    <View style={styles.container}>
      {image ? (
          <Video 
            source={{ uri: image}} 
            style={{
              width: 225, 
              height: 400, 
              marginTop: 30, 
              alignSelf: 'center', 
              borderWidth: 2, 
              borderColor: 'black',
            }} 
            useNativeControls
          />
        ) : (
          <TouchableOpacity
            style={{
              width: 225, 
              height: 400, 
              marginTop: 30, 
              alignSelf: 'center', 
              borderWidth: 2, 
              borderColor: 'black',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={pickImage}
          >
            <Text style={styles.uploadtext}>Upload video</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => setImage(null)}>
          <Text style={styles.cleartext}>Clear</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={makePrediction}>
        <Text>Analyze</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.whitey,
        padding: '5%',
      },
      uploadbutton: {
        height: 50,
        marginTop: 45,
        width: 200,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: themeColors.whitey,
        borderColor: themeColors.blue,
        borderWidth: 2,
        borderRadius: 15,
      },
      uploadtext: {
        fontFamily: 'Kamerik-105-Bold',
        fontSize: 20,
        alignSelf: 'center',
        justifyContent: 'center'
      },
      cleartext: {
        fontFamily: 'Kamerik-105-Bold',
        fontSize: 16,
        color: themeColors.blue,
        marginTop: 15,
        marginLeft: '21%'
      },
})