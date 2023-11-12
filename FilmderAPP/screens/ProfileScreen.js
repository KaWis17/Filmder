import { View, Button, TextInput, Text } from 'react-native'
import React from 'react'
import { useState } from "react/cjs/react.development"

import useAuth from '../AuthProvider'
import { collection, query, where, getDocs, setDoc, doc, serverTimestamp, addDoc } from "firebase/firestore"; 
import { db } from "../FirebaseConnection"


const ProfileScreen = () => {


    const { profileUpdate, logout } = useAuth();
    const { name, setName, user } = useAuth();

    const [surname, setSurname] = useState('')
    const [age, setAge] = useState('')
    const [friendToAdd, setFriendToAdd] = useState('dIfd2szWxJf74dbaZr8MI8JjA7b2')


    const updateUserData = () =>{

        profileUpdate
       
        setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            first: name,
            last: surname,
            born: age,
            timestamp: serverTimestamp()
        });
    
    }

    const addToFriendList = (friendID) =>{
       
        addDoc(collection(db, "friends"), {
            uid1: user.uid,
            uid2: friendToAdd,
            timestamp: serverTimestamp()
        });
    
    }

    const getUserData = () =>{

        const q = query(collection(db, "users"), where("UID", "==", user.id));

        const querySnapshot = getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        });

    }
    

    return (
        <View className="flex-1 items-center justify-center bg-slate-300">
        <Text className="text-red-500 text-4xl mb-20">Witaj {user.displayName}!</Text>
        <TextInput 
            placeholder="New Name"
            value={name}
            onChangeText={(Text) => {setName(Text)}}
            className="w-3/5 h-12 mb-4 border-solid rounded-md border-sky-500 bg-white text-center"/>

        <TextInput 
            placeholder="New Surname"
            value={surname}
            onChangeText={(Text) => {setSurname(Text)}}
            className="w-3/5 h-12 mb-4 border-solid rounded-md border-sky-500 bg-white text-center"/>
        <TextInput 
            placeholder="New Age"
            value={age}
            keyboardType='numeric'
            maxLength={2}
            onChangeText={(Text) => {setAge(Text)}}
            className="w-3/5 h-12 mb-4 border-solid rounded-md border-sky-500 bg-white text-center"/>
        <Button 
            title="Change user data"
            onPress={updateUserData}
        />
        <Button 
            title="Add Bartek to friends"
            onPress={addToFriendList}
        />
        <Button 
            title="Logout"
            onPress={logout}/>
    </View>
    )
}

export default ProfileScreen