import { useFonts } from "expo-font";
import React from "react";
import useAuth, { AuthProvider } from "./hooks/useAuth";
import { Slot, Stack, Tabs, router } from "expo-router";

export default function App() {
  // TODO: https://docs.expo.dev/develop/user-interface/fonts/#embed-font-in-a-native-project
  const [loaded, error] = useFonts({
    "Kamerik-105-Light": require("@assets/fonts/Kamerik-105-Normal.ttf"),
    "Kamerik-105-Normal": require("@assets/fonts/Kamerik-105-Normal.ttf"),
    "Kamerik-105-Bold": require("@assets/fonts/Kamerik-105-W00-Bold.ttf"),
  });
  return (
    loaded && (
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    )
  );
}
