import {View, Text, FlatList, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'

import { collection, query, where, onSnapshot } from "firebase/firestore"; 
import { db } from "../FirebaseConnection"

import useAuth from '../AuthProvider'
import { useNavigation } from '@react-navigation/core';

const ChatListScreen = () => {

    const[friends, setFriends] = useState([]);
    const { user } = useAuth();
    const navigation = useNavigation();

    useEffect(
        () =>     
        onSnapshot(
            query(
                collection(db, "friends"), 
                where('usersMatched', 'array-contains', user.uid)
            ), 
            (snapshot) =>  
                setFriends(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                )
            ),
        [user]
    );

    const getFriend = (item, userID) => {
        delete item[userID]
        return item[Object.keys(item)[0]]
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            className="bg-white border-b-2"
            onPress={() => navigation.navigate("conversation", {info: item})}
        >
            <Text className="p-3 text-lg">{getFriend(item.users, user.uid).first +" "+ getFriend(item.users, user.uid).last}</Text>
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