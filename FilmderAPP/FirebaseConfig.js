import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVJISFJASvRrGNyuNGOcW6jF5QhgZwsOM",
  authDomain: "filmderapp-621aa.firebaseapp.com",
  projectId: "filmderapp-621aa",
  storageBucket: "filmderapp-621aa.appspot.com",
  messagingSenderId: "141226414501",
  appId: "1:141226414501:web:0bfac36ca8590e8333d84c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);