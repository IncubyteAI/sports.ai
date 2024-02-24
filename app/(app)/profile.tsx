import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { signOut, deleteUser } from "firebase/auth";
import { auth } from "../config/firebase";
import { themeColors } from "@assets/theme";
import useAuth from "../hooks/useAuth";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { fullName } = useAuth();
  const navigator = useRouter();
  const handleLogout = async () => {
    await signOut(auth);
  };
  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (user) {
      await deleteUser(user);
    }
  };

  return (
    <View
      style={[styles.dios, { backgroundColor: themeColors.whitey, flex: 1 }]}
    >
      <View style={styles.quickinfo}>
        <Text style={styles.username}>{fullName}</Text>
      </View>

      <View
        style={{
          height: 1.25,
          backgroundColor: themeColors.black,
          marginTop: "10%",
        }}
      />
      <Text
        style={{
          fontFamily: "Kamerik-105-Normal",
          color: themeColors.black,
          fontSize: 20,
          marginTop: "2%",
        }}
      >
        Account
      </Text>
      <View style={styles.accbuttonrow}>
        <TouchableOpacity
          onPress={handleLogout}
          style={[styles.accbuttons, { width: 180 }]}
        >
          <Text style={styles.accbuttonstext}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDeleteAccount}
          style={styles.accbuttons}
        >
          <Text style={styles.accbuttonstext}>Delete Account</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 1.25,
          backgroundColor: themeColors.black,
          marginTop: "4%",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dios: {
    padding: "5%",
  },
  quickinfo: {
    paddingTop: "20%",
  },
  username: {
    fontFamily: "Kamerik-105-Bold",
    fontSize: 25,
    textAlign: "center",
  },
  accbuttonrow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "4%",
    justifyContent: "space-around",
  },
  accbuttons: {
    padding: 10,
    borderColor: themeColors.black,
    borderWidth: 2,
    borderRadius: 8,
    width: 187,
    height: 47,
    alignItems: "center",
  },
  accbuttonstext: {
    color: themeColors.black,
    fontSize: 20,
    fontFamily: "Kamerik-105-Bold",
  },
});
