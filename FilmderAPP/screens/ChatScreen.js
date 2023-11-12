import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatListScreen from "./ChatListScreen";
import ChatConversationScreen from "./ChatConversationScreen";

const Stack = createNativeStackNavigator();

const ChatScreen = () => {

    return (

        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="chatList" component={ChatListScreen} />
            <Stack.Screen name="conversation" component={ChatConversationScreen}r/>
        </Stack.Navigator>

    )
}

export default ChatScreen
