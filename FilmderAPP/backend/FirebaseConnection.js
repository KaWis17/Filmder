import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Information how to connect to the Firestore,
 * TODO: move vulnerable data to .env file
 */
const firebaseConfig = {
  apiKey: "AIzaSyApuMPEZ-6FFwpgZ_-GAUvnNSLd_hiedTs",
  authDomain: "filmderapplication.firebaseapp.com",
  projectId: "filmderapplication",
  storageBucket: "filmderapplication.appspot.com",
  messagingSenderId: "82378151093",
  appId: "1:82378151093:web:114ca7e3d5dc5916b1dafc"
};

/**
 * Initiation of a connection with FirebaseAuthentication and FirestoreDatabase
 */
const app = initializeApp(firebaseConfig)
export const auth = initializeAuth(app, {persistence: getReactNativePersistence(ReactNativeAsyncStorage)});
export const db = getFirestore(app)
export const st = getStorage(app)