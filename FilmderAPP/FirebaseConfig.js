// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCVJISFJASvRrGNyuNGOcW6jF5QhgZwsOM",
    authDomain: "filmderapp-621aa.firebaseapp.com",
    projectId: "filmderapp-621aa",
    storageBucket: "filmderapp-621aa.appspot.com",
    messagingSenderId: "141226414501",
    appId: "1:141226414501:web:0bfac36ca8590e8333d84c"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

//IOS: 232785738503-ff7ppofaf3a05ugce4ovgaethh4e5r4u.apps.googleusercontent.com
//Android: 232785738503-br9ekjvd19tqh94hsq13cbk5q5ei1res.apps.googleusercontent.com