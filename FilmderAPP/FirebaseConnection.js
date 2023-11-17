import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"


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
export const auth = getAuth(app);
export const db = getFirestore(app)