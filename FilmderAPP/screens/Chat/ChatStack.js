import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatListScreen from "./ChatListScreen";
import ChatConversationScreen from "./ChatConversationScreen";
import OtherUserScreen from './OtherUserScreen';


const ChatStack = ({ navigation, route }) => {

    const StackInChat = createNativeStackNavigator();

    return (

        <StackInChat.Navigator screenOptions={{headerShown: false}} initialRouteName="chatList">
            <StackInChat.Screen name="chatList" component={ChatListScreen}/>
            <StackInChat.Screen name="chatConversation" component={ChatConversationScreen}/>
            <StackInChat.Screen name="otherUserScreen" component={OtherUserScreen}/>

        </StackInChat.Navigator>

    )
}

export default ChatStack
