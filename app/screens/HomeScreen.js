import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuth from '../hooks/useAuth';
import { auth } from '../config/firebase';
import React from 'react'
import { deleteUser, signOut } from 'firebase/auth';
import { themeColors } from '../assets/theme';

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
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.welcome}>Welcome, {firstName}!</Text>

        <View style={{height: 1.25, backgroundColor: themeColors.black, marginTop: '10%'}} />
        <Text style={{fontFamily: 'Kamerik-105-Normal', color: themeColors.black, fontSize: 20, marginTop: '2%'}}>Account</Text>
        <View style={styles.accbuttonrow}>
          <TouchableOpacity onPress={handleLogout} style={[styles.accbuttons, {width: 180}]}>
            <Text style={styles.accbuttonstext}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteAccount} style={styles.accbuttons}>
            <Text style={styles.accbuttonstext}>Delete Account</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 1.25, backgroundColor: themeColors.black, marginTop: '4%'}} />

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
  }
})