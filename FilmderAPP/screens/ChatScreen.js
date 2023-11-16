import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatListScreen from "./ChatListScreen";
import ChatConversationScreen from "./ChatConversationScreen";
import OtherUserScreen from './OtherUserScreen';

const Stack = createNativeStackNavigator();

const ChatScreen = () => {

    return (

        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="chatList">
            <Stack.Screen name="chatList" component={ChatListScreen}/>
            <Stack.Screen name="conversation" component={ChatConversationScreen}/>
            <Stack.Screen name="otherUserProfile" component={OtherUserScreen}/>
        </Stack.Navigator>

    )
}

export default ChatScreen
