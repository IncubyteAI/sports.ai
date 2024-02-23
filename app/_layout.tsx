import { useFonts } from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import AppNavigation from "./navigation/appNavigation";
import React, { useState, useEffect } from "react";
import { AuthProvider } from "./hooks/useAuth";
import { Stack } from "expo-router";
export default function App() {
  const [loaded, error] = useFonts({
    "Kamerik-105-Light": require("@assets/fonts/Kamerik-105-Normal.ttf"),
    "Kamerik-105-Normal": require("@assets/fonts/Kamerik-105-Normal.ttf"),
    "Kamerik-105-Bold": require("@assets/fonts/Kamerik-105-W00-Bold.ttf"),
  });

  // return (
  //   <AuthProvider>
  //     <AppNavigation />
  //   </AuthProvider>
  // );
  // return <Stack />;
  return loaded && <Stack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
