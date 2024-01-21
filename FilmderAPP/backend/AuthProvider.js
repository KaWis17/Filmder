/**
 * @module backend
 */
import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveGenreSats, clearGenreStats } from './UserCacheQueries';

import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendEmailVerification, 
    signOut,
    getAuth } from "firebase/auth";

import { setDoc, doc, serverTimestamp } from "firebase/firestore"; 

import { db, auth } from "./FirebaseConnection"
    

/**
 * Authentication context to be passed down to BottomTabNavigation.js
 */
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    /* useState for user information */
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    /**
     * React hook to synchronize user (AsyncStorage is applied)
     */
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
        })
    })

    /**
     * Function that allows user to log in.
     * TODO: handle different error messages
     * TODO: create alternative form of authentication (GoogleAuth 2.0)
     */
    const signIn = () => {
        const auth = getAuth();
        console.log(auth)
        signInWithEmailAndPassword(auth, email, password)
            .then( async (userCredential) => {
                if(!userCredential.user.emailVerified){
                    logout()
                    alert("Email not yet verified!")
                }
                else
                {
                    console.log(auth)
                    await saveGenreSats(auth.currentUser)
                }
            })
            .catch((error) => {
                alert(error.message)
            });
    }

    /**
     * Function that allows user to create an account.
     * TODO: handle different error messages
     */
    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                sendVerificationEmail();
                setDoc(doc(db, "users", userCredential.user.uid), {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email,
                    first: "Name",
                    last: "Surname",
                    born: "18",
                    timestamp: serverTimestamp()
                });
                auth.signOut();
            })
            .catch((error) => {
                alert(error.message)
            });
    }

    /**
     * Function sends a verification link to the e-mail provided.
     */
    function sendVerificationEmail() {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert("Account created. Email verification sent!")
            });
    }

    /**
     * Function sends logs out user of their account.
     * TODO: handle different error messages
     */
    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                setEmail('');
                setPassword('');

                try {
                    AsyncStorage.clear();
                } catch (error) {
                    console.log(error);
                }

                alert("Successfully logged out!")
          })
          .catch((error) => {
                alert(error.message)
          });
    }

  return (
    <AuthContext.Provider value={{  user, 
                                    email, setEmail, 
                                    password, setPassword, 
                                    signIn, signUp, logout }}>
        {children}
    </AuthContext.Provider>
  )
}

export default function useAuth(){
    return useContext(AuthContext)
}

