import { View, Text, StyleSheet, TouchableOpacity, Button, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuth from '../hooks/useAuth';
import { auth } from '../config/firebase';
import React, {useState, useEffect} from 'react'
import { deleteUser, signOut } from 'firebase/auth';
import { themeColors } from '../assets/theme';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av'
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead']);
export default function HomeScreen() {
  const {user, fullName, firstName} = useAuth();

  const handleLogout = async ()=> {
    await signOut(auth);
  }
  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (user) {
      await deleteUser(user);
    }
  }

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
      <SafeAreaView style={{backgroundColor: themeColors.whitey}}>
        <Text style={styles.welcome}>Welcome, {firstName}!</Text>

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
      </SafeAreaView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.whitey,
    padding: '5%',
  },
  welcome: {
    fontFamily: "Kamerik-105-Bold",
    color: themeColors.black,
    fontSize: 25,
  },
  accbuttonrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '4%',
    justifyContent: 'space-around'
  },
  accbuttons: {
    padding: 10,
    borderColor: themeColors.black,
    borderWidth: 2,
    borderRadius: 8,
    width: 187,
    height: 47,
    alignItems: 'center',
  },
  accbuttonstext: {
    color: themeColors.black,
    fontSize: 20,
    fontFamily: "Kamerik-105-Bold",
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