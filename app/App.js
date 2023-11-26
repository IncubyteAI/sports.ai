import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './navigation/appNavigation';
import React, { useState, useEffect } from 'react';
import { AuthProvider } from './hooks/useAuth';

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Kamerik-105-Light': require('../app/assets/fonts/Kamerik-105-Normal.ttf'),
        'Kamerik-105-Normal': require('../app/assets/fonts/Kamerik-105-Normal.ttf'),
        'Kamerik-105-Bold': require('../app/assets/fonts/Kamerik-105-W00-Bold.ttf'),
      });
      setFontLoaded(true);
    }
  
    loadFonts();
  }, []);
  if (!fontLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
