// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj4nRzyIl6yoCrjhM-jCdbA1j8stsFwKw",
  authDomain: "sports-ai-9e77e.firebaseapp.com",
  projectId: "sports-ai-9e77e",
  storageBucket: "sports-ai-9e77e.appspot.com",
  messagingSenderId: "65687642504",
  appId: "1:65687642504:web:3a6b56104d46dd446dda3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage as the persistence layer
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
