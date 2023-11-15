import React, { createContext, useContext, useMemo } from 'react'
import { useState } from "react/cjs/react.development"


import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendEmailVerification, 
    signOut,
    getAuth } from "firebase/auth";

import { auth } from './FirebaseConnection';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            if(userCredential.user.emailVerified){
                setUser(userCredential.user)
            } else {
                alert("Email not yet verified!")
            }
            })
            .catch((error) => {
            const errorMessage = error.message;
            currentUser = false;
            alert(errorMessage)
        });
    }

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            sendVerificationEmail();
            console.log(auth.currentUser.uid)
            auth.signOut();
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage)
      });
    }

    function sendVerificationEmail() {
        sendEmailVerification(auth.currentUser)
        .then(() => {
            alert("Account created. Email verification sent!")
        });
    }

    const logout = () => {
        signOut(auth).then(() => {
            setUser(null);
            setEmail('');
            setPassword('');
            alert("Successfully logged out!")
          }).catch((error) => {
            alert(error)
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

