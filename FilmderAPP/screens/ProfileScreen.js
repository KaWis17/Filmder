import { View, Button, TextInput, Text, Image, ScrollView, Touchable, TouchableOpacity } from 'react-native'
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

        profileUpdate()
       
        setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            first: name,
            last: surname,
            born: age,
            timestamp: serverTimestamp()
        });

    }

    const addToFriendList = async () =>{

        var loggedInProfile = await getFriendNameByID(user.uid)
        var friendUser = await getFriendNameByID(friendToAdd)
       
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

    const getFriendNameByID = async (userID) => {
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

                    <Text className="text-2xl mb-5 text-center ">{user.displayName}</Text>

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