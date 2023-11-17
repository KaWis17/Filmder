import {View, Text, FlatList, TouchableOpacity, Image, SafeAreaView} from 'react-native'
import React, {useEffect, useState} from 'react'

import { collection, query, where, onSnapshot } from "firebase/firestore"; 
import { db } from "../../FirebaseConnection"

import useAuth from '../../AuthProvider'

import { useNavigation } from '@react-navigation/core';

const ChatListScreen = () => {

    const[ friends, setFriends ] = useState([]);
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
            className="mb-3 bg-blue-300 border-b-4 border-blue-500 rounded  h-16"
            onPress={() => navigation.navigate("chatConversation", {info: item})}
        >

            <View className="flex flex-row w-full my-auto">
                <Image 
                    className="ml-5 h-11 aspect-square rounded-full"
                    source={{ uri: "https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg" }}
                />

                <Text className="ml-5 my-auto text-xl ">
                    {getFriend(item.users, user.uid).first +" "+ getFriend(item.users, user.uid).last}
                </Text>
            </View>
            
        </TouchableOpacity>
    );
        
    return (
        <SafeAreaView className="flex h-screen bg-slate-300">
            <FlatList
                data={friends}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    )

}

export default ChatListScreen