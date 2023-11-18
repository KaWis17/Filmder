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

    const days = ["Sun.", "Mon.", "Tue.", "Wed.","Thu.", "Fri.","Sat."]

    /**
     * React hook to synchronize friendList depending on user variable
     */
    useEffect(
        () => { setUsersFriendList(user.uid, setFriends) },
        [user]
    );

    const renderFriend = ({ item }) => (
        <TouchableOpacity
            className="h-20"
            onPress={() => {
                navigation.navigate("chatConversation", 
                    {   friendshipID: item.id, 
                        friendProfile: getFriendFromFriendsList(item.users, user.uid),
                    }
                )
                }}
        >

            <View className="flex flex-row my-auto mx-5">
                <Image 
                    className="bg-red-500 h-16 aspect-square rounded-full"
                    source={getFriendFromFriendsList(item.users, user.uid).imageUrl !== undefined ? {uri: getFriendFromFriendsList(item.users, user.uid).imageUrl } : {uri: tempURL}}
                />

                <View className="flex-auto ml-5 my-auto">
                    <Text numberOfLines={1} className="text-xl font-medium">
                        {   getFriendFromFriendsList(item.users, user.uid).first +" "+ 
                            getFriendFromFriendsList(item.users, user.uid).last}
                    </Text>
                    <View className="flex-row">
                        <Text numberOfLines={1} className="flex-1 text-base">
                            {(item.lastMessage !== undefined) ? 
                                (item.lastMessage.sendBy == user.uid ? 
                                        ("You: " + item.lastMessage.text) : 
                                        (getFriendFromFriendsList(item.users, user.uid).first + ": " + item.lastMessage.text)) :
                                ("Say hi to " + getFriendFromFriendsList(item.users, user.uid).first + "!")
                            }
                        </Text>
                        
                        <Text className="text-base pl-5">{

                            (item.lastMessage === undefined) ? 
                                (
                                    " "
                                ) : (
                                    (new Date(item.lastMessage.time.seconds*1000).isSameDateAs(new Date())) ? 
                                    (
                                        new Date(item.lastMessage.time.seconds*1000).getHours() + ":" + new Date(item.lastMessage.time.seconds*1000).getMinutes()
                                    ) : (
                                        days[new Date(item.lastMessage.time.seconds*1000).getDay(({ weekday:"short" }))]
                                    )
                                )
                        }</Text>

                    </View>
                    
                </View>
            
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

};

Date.prototype.isSameDateAs = function(otherDate) {
    return (
      this.getFullYear() === otherDate.getFullYear() &&
      this.getMonth() === otherDate.getMonth() &&
      this.getDate() === otherDate.getDate()
    );
}

export default ChatListScreen
