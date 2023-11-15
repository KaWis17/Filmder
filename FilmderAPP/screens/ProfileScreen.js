import { View, Button, TextInput, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import {useEffect, useState } from 'react'

import useAuth from '../AuthProvider'
import { collection, query, where, getDocs, setDoc, doc, serverTimestamp, addDoc, onSnapshot, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore"; 
import { db } from "../FirebaseConnection"


const ProfileScreen = () => {

    const { logout } = useAuth();
    const { user } = useAuth();

    const[first, setFirst] = useState('');
    const[last, setLast] = useState('');
    const[age, setAge] = useState('');
    const[timestamp, setTimestamp] = useState('')

    const[friends, setFriends] = useState([]);


    //const [friendToAdd, setFriendToAdd] = useState('dIfd2szWxJf74dbaZr8MI8JjA7b2')

    useEffect(
        () =>     
        onSnapshot(
            query(
                collection(db, "users"), 
                where('uid', '==', user.uid)
            ), 
            (snapshot) => {
                setFirst(snapshot.docs[0].data().first)
                setLast(snapshot.docs[0].data().last)
                setAge(snapshot.docs[0].data().born)
                setTimestamp(snapshot.docs[0].data().timestamp)
            }
            ),
        [user]
    );


    /*
    const getUserData = async () => {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setFirst(doc.data().first)
            setLast(doc.data().last)
            setAge(doc.data().age)
            console.log(first);
        });
    }
    getUserData;
    */


    const updateUserData = async() =>{
       
        setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            first: first,
            last: last,
            born: age,
            timestamp: timestamp
        });

        var loggedInProfile = await getProfileById(user.uid)

        const q = query(
            collection(db, "friends"), 
            where('usersMatched', 'array-contains', user.uid)
        )
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (document) => {

            var friendID = Object.keys(document.data().users).at(0)
        
            if(friendID == user.uid){
                friendID = Object.keys(document.data().users).at(1)
            } 
                    
            var friendUser = await getProfileById(friendID)
        
            const friendshipID =  (user.uid > friendID ? user.uid + friendID : friendID + user.uid)

            setDoc(doc(db, "friends", friendshipID), {
                users: {
                    [user.uid]: loggedInProfile,
                    [friendUser.uid]: friendUser,
                },
                usersMatched: [user.uid, friendID],
                timestamp: document.data().timestamp
            });
            
        });
    
    }
    /*

    const addToFriendList = async () =>{

        var loggedInProfile = await getProfileById(user.uid)
        var friendUser = await getProfileById(friendToAdd)
       
        const friendshipID =  (user.uid > friendToAdd ? user.uid + friendToAdd : friendToAdd + user.uid)
        setDoc(doc(db, "friends", friendshipID), {
            users: {
                [user.uid]: loggedInProfile,
                [friendUser.uid]: friendUser,
            },
            usersMatched: [user.uid, friendToAdd],
            timestamp: serverTimestamp()
        });
    
    }
    */
    const getProfileById = async (userID) => {
        const q = query(collection(db, "users"), where("uid", "==", userID));

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs[0].data()
    }  


    return (

        <View className="h-full">
            <ScrollView>
                <View className="justify-center">
                    <Image 
                        className="= mt-20 mx-auto mb-5 aspect-square rounded-full"
                        source={{ uri: "https://scontent-mad2-1.xx.fbcdn.net/v/t39.30808-6/360086319_3683278515233971_4867496317066971572_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=vIWOnABbkkUAX-kos10&_nc_ht=scontent-mad2-1.xx&oh=00_AfAn11h_1Qi89l_fPDNcdJz4r9lUtDrty3xbQbC79OGwAw&oe=65566129" }}
                    />

                    <View className="items-center">
                        <TextInput 
                            placeholder="Name" 
                            value={first} 
                            onChangeText={(Text) => {setFirst(Text)}}
                        className="w-4/5 h-12 mb-4 border-solid rounded-md border-sky-500 bg-white text-center"/>

                        <TextInput 
                            placeholder="Surname" 
                            value={last} 
                            onChangeText={(Text) => {setLast(Text)}}
                        className="w-4/5 h-12 mb-4 border-solid rounded-md border-sky-500 bg-white text-center"/>

                        <TextInput 
                            placeholder="Age" 
                            value={age} 
                            onChangeText={(Text) => {setAge(Text)}}
                            keyboardType='numeric'
                            maxLength={2}
                        className="w-4/5 h-12 mb-4 border-solid rounded-md border-sky-500 bg-white text-center"/>
                    </View>

                    <TouchableOpacity 
                        onPress={updateUserData}
                        className="mx-auto w-3/5 h-12 mb-4 border-solid rounded-md bg-blue-500">
                        <Text className=" text-lg my-auto text-center color-white">UPDATE PROFILE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={logout}
                        className="mx-auto w-3/5 h-12 mb-4 border-solid rounded-md bg-red-500">
                        <Text className=" text-lg my-auto text-center color-white">LOGOUT</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    )
}

export default ProfileScreen