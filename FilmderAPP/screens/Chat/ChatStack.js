import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatListScreen from "./ChatListScreen";
import ChatConversationScreen from "./ChatConversationScreen";
import OtherUserScreen from './OtherUserScreen';
import UserWatchList from './UserWatchList';
import ModalScreen from "../Main/ModalScreen";


const ChatStack = ({ navigation, route }) => {

    const StackInChat = createNativeStackNavigator();

    return (

        <StackInChat.Navigator screenOptions={{headerShown: false}} initialRouteName="chatList">
            <StackInChat.Screen name="chatList" component={ChatListScreen}/>
            <StackInChat.Screen name="chatConversation" component={ChatConversationScreen}/>
            <StackInChat.Screen name="otherUserScreen" component={OtherUserScreen}/>
            <StackInChat.Screen name="otherUserWatchList" component={UserWatchList}/>
            <StackInChat.Screen name="modalScreen" component={ModalScreen}/>

        </StackInChat.Navigator>

    )
}

export default ChatStack
