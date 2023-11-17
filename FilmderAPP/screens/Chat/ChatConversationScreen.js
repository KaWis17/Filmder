import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView } from 'react-native'

import { GiftedChat } from 'react-native-gifted-chat';

import useAuth from '../../backend/AuthProvider';
import { setMessagesFromChat, sendAMessage } from '../../backend/UserQueries';


const ChatConversationScreen = ({route, navigation}) => {

    const friendshipID = route.params.friendshipID;
    const friendProfile = route.params.friendProfile

    const [ messages, setMessages ] = useState([])
    const { user } = useAuth();

    /**
     * React hook to synchronize messages from chat depending on user variable
     */
    useEffect(
        () =>         
        setMessagesFromChat(friendshipID, setMessages),
        [user]
    );

    /**
     * Sending a message to the database 
     */
    const onSend = useCallback(
        (messages = []) => 
        sendAMessage(GiftedChat, messages, setMessages, friendshipID, user.uid), 
        []
    )

    return (
        <View style={{flex: 1}}>
            <View className="w-full bg-blue-500">
                <SafeAreaView>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate("otherUserScreen", {friendID: friendProfile.uid})}
                        className="w-full h-12 bg-blue-500">
                        <Text className=" text-lg my-auto text-center color-white">{friendProfile.first + " " + friendProfile.last}</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: user.uid,
                }} 
                showUserAvatar={false}
                showAvatarForEveryMessage={true}
                onPressAvatar={() => navigation.navigate("otherUserScreen", {friendID: friendProfile.uid})}
            />
        </View>
    )

}

export default ChatConversationScreen;