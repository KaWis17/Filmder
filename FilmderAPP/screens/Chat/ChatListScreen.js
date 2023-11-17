import React, {useEffect, useState} from 'react'
import {View, Text, FlatList, TouchableOpacity, Image, SafeAreaView} from 'react-native'

import { useNavigation } from '@react-navigation/core';

import useAuth from '../../backend/AuthProvider'
import { setUsersFriendList, getFriendFromFriendsList } from '../../backend/UserQueries';

const tempURL = "https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"

const ChatListScreen = () => {

    const[ friends, setFriends ] = useState([]);
    const { user } = useAuth();
    const navigation = useNavigation();

    /**
     * React hook to synchronize friendList depending on user variable
     */
    useEffect(
        () => { setUsersFriendList(user.uid, setFriends) },
        [user]
    );

    const renderFriend = ({ item }) => (
        <TouchableOpacity
            className="mb-3 bg-blue-300 border-b-4 border-blue-500 rounded  h-16"
            onPress={() => {
                navigation.navigate("chatConversation", 
                    {   friendshipID: item.id, 
                        friendProfile: getFriendFromFriendsList(item.users, user.uid),
                    }
                )
                }}
        >

            <View className="flex flex-row w-full my-auto">
                <Image 
                    className="bg-red-500 ml-5 h-11 aspect-square rounded-full"
                    source={getFriendFromFriendsList(item.users, user.uid).imageUrl !== undefined ? {uri: getFriendFromFriendsList(item.users, user.uid).imageUrl } : {uri: tempURL}}
                />

                <Text className="ml-5 my-auto text-xl ">
                    {getFriendFromFriendsList(item.users, user.uid).first +" "+ 
                     getFriendFromFriendsList(item.users, user.uid).last}
                </Text>
            </View>
            
        </TouchableOpacity>
    );
        
    return (
        <SafeAreaView className="flex h-screen bg-slate-300">
            <FlatList
                data={friends}
                renderItem={renderFriend}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    )

}

export default ChatListScreen