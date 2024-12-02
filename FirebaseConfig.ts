import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP7bXtH6H5dlPqKSMNHn9gOeQJ8HBGcsw",
  authDomain: "t-max-app.firebaseapp.com",
  projectId: "t-max-app",
  storageBucket: "t-max-app.firebasestorage.app",
  messagingSenderId: "930237464667",
  appId: "1:930237464667:web:0117e012c0625fe31c7f7e",
  measurementId: "G-EL89HK13RX"
};

// Initialize Firebase App
export const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Firebase Authentication for React Native
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
