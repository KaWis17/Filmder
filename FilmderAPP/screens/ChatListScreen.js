import {View, Text, FlatList, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'

import { collection, query, where, getDocs, or } from "firebase/firestore"; 
import { db } from "../FirebaseConnection"

import useAuth from '../AuthProvider'
import { useNavigation } from '@react-navigation/core';



const ChatListScreen = () => {

    const { user } = useAuth();

    const navigation = useNavigation();

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getFriendsList()
        });
        return unsubscribe;
      }, [navigation]);


    const getFriendsList = async () =>{
        const q = query(collection(db, "friends"), or(where("uid1", "==", user.uid), (where("uid2", "==", user.uid))))

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (doc) => {
                
                var friendID = doc.data().uid1
                if(doc.data().uid1 == user.uid){ friendID = doc.data().uid2 }

                var friendName = await getFriendNameByID(friendID)
                setFriends(friends.concat({id: friendID, name: friendName}))
            });
        } catch (e) {
            alert(e);
        }
    }

    const getFriendNameByID = async (userID) => {
        const q = query(collection(db, "users"), where("uid", "==", userID));

        const querySnapshot = await getDocs(q);
        return await querySnapshot.docs[0].data().first.toString()
    }

    const [friends, setFriends] = useState([]);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            className="bg-white"
            onPress={() => navigation.navigate("conversation")}
        >
            <Text className="p-3 text-lg">{item.name}</Text>
        </TouchableOpacity>
    );
        
    return (
        <View className="flex pt-20 h-screen bg-slate-300">
            <FlatList
                data={friends}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
  )
}

export default ChatListScreen