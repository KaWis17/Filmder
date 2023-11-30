import React, { useState, useEffect, useCallback } from 'react';
import {View, TouchableOpacity, Text, SafeAreaView, Alert} from 'react-native'

import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import useAuth from '../../backend/AuthProvider';
import { setMessagesFromChat, sendAMessage } from '../../backend/UserQueries';


const ChatConversationScreen = ({route, navigation}) => {

    const friendshipID = route.params.friendshipID;
    const friendProfile = route.params.friendProfile;

    const [ messages, setMessages ] = useState([])
    const { user } = useAuth();

    /**
     * React hook to synchronize messages from chat depending on user variable
     */
    useEffect(
        () => {
            setMessagesFromChat(friendshipID, setMessages, friendProfile.imageUrl)
            console.log(messages)
        },        
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

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#e0e0e0', // Background color for received messages
                    },
                    right: {
                        backgroundColor: '#333333', // Background color for sent messages
                    },
                }}
                textStyle={{
                    left: {
                        color: '#000', // Text color for received messages
                    },
                    right: {
                        color: '#fff', // Text color for sent messages
                    },
                }}
                onPress={() => handleBubblePress(props.currentMessage)}
            />
        );
    };

    const handleBubblePress = (message) => {
        if(message.invitation){
            navigation.navigate("modalScreen", {film: message.invitation})
        }
    };

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
                showAvatarForEveryMessage={false}
                scrollToBottom={true}
                onPressAvatar={() => navigation.navigate("otherUserScreen", {friendID: friendProfile.uid})}
                renderBubble={renderBubble}
            />
        </View>
    )

}

export default ChatConversationScreen;