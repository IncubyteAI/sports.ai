import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { themeColors } from "@assets/theme";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import * as FileSystem from "expo-file-system";

{
  /* tfjs target dir, http-server --cors
    python3 server.py
    curl -u tanay:YanatPlayz -X POST -F "file=@Tennis/RData/Stage6/Stage6_R0rf1.mp4" http://127.0.0.1:5000/predict*/
}
async function toServer(uri: string) {
  console.log(uri);
  let schema = "http://";
  let host = "127.0.0.1";
  let route = "/predict";
  let port = "5000";
  let url = "";
  url = schema + host + ":" + port + route;
  console.log(url);

  try {
    const fd = new FormData();
    fd.append("file", {
      name: "video.mp4",
      uri,
      type: "video/mp4",
    });
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: fd,
    });
    console.log(response);
    console.log("getting json");
    const data = await response.json();
    console.log(data);
    console.log("Response status:", response.status);
    console.log("headers: " + response.headers);
    console.log("stages: " + data.stages);
  } catch (error) {
    console.log("error: ", error);
  }
}
async function makePrediction(model, videoURI: string) {
  console.log("received prediction request");
  if (model && videoURI) {
    console.log("Attempting to send: " + videoURI);
    try {
      await toServer(videoURI);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  } else {
    console.log("Model not loaded yet or no video uploaded.");
  }
}
export default function TestScreen() {
  const [model, setModel] = useState(null);
  const [videoURI, setVideoURI] = useState<string | null>(null);

  useEffect(() => {
    async function loadModel() {
      console.log("Loading custom model...");
      const tfReady = await tf.ready();
      const modelJson = require("@assets/tfjs-target-directory/model.json");
      const modelWeights = require("@assets/tfjs-target-directory/group1-shard1of1.bin");
      const loadedModel = await tf.loadLayersModel(
        bundleResourceIO(modelJson, modelWeights)
      );
      setModel(loadedModel);
      console.log("Custom model loaded.");
    }
    loadModel().catch((error) =>
      console.error("Error loading the model", error)
    );
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
    });
    if (!result.canceled) {
      setVideoURI(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      {videoURI ? (
        <Video
          source={{ uri: videoURI }}
          style={{
            width: 225,
            height: 400,
            marginTop: 30,
            alignSelf: "center",
            borderWidth: 2,
            borderColor: "black",
          }}
          useNativeControls
        />
      ) : (
        <TouchableOpacity
          style={{
            width: 225,
            height: 400,
            marginTop: 30,
            alignSelf: "center",
            borderWidth: 2,
            borderColor: "black",
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={pickImage}
        >
          <Text style={styles.uploadtext}>Upload video</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => setVideoURI(null)}>
        <Text style={styles.cleartext}>Clear</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => makePrediction(model, videoURI)}>
        <Text>Analyze</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.whitey,
    padding: "5%",
  },
  uploadbutton: {
    height: 50,
    marginTop: 45,
    width: 200,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: themeColors.whitey,
    borderColor: themeColors.blue,
    borderWidth: 2,
    borderRadius: 15,
  },
  uploadtext: {
    fontFamily: "Kamerik-105-Bold",
    fontSize: 20,
    alignSelf: "center",
    justifyContent: "center",
  },
  cleartext: {
    fontFamily: "Kamerik-105-Bold",
    fontSize: 16,
    color: themeColors.blue,
    marginTop: 15,
    marginLeft: "21%",
  },
});
