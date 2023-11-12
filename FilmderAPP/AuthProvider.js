import React, { createContext, useContext, useMemo } from 'react'
import { useState } from "react/cjs/react.development"

import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendEmailVerification, 
    updateProfile,
    signOut,
    getAuth } from "firebase/auth";

import { auth } from './FirebaseConnection';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState('Krzysztof')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            if(userCredential.user.emailVerified){
                setUser(userCredential.user)
                setName(userCredential.user.displayName)
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

    const profileUpdate = () => {
        updateProfile(auth.currentUser, {
            displayName: name, 
        }).then(() => {
            setName('')
        }).catch((error) => {
            alert(error)
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
    <AuthContext.Provider value={{  user, email, setEmail, password, setPassword, name, setName, 
                                    signIn, signUp, profileUpdate, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth(){
    return useContext(AuthContext)
}

