import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import homeScreen from './screens/homeScreen';
import chatScreen from './screens/chatScreen';
import settingsScreen from './screens/settingsScreen';
import LoginScreen from './screens/LoginScreen';


const Stack = createNativeStackNavigator();

const user = true;

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>

        {user ? (
            <>
                <Stack.Screen name='Home' component={homeScreen}></Stack.Screen>
                <Stack.Screen name='Chat' component={chatScreen}></Stack.Screen>
                <Stack.Screen name='Settings' component={settingsScreen}></Stack.Screen>
            </>
        ) : (
            <>
                <Stack.Screen name='Login' component={LoginScreen}></Stack.Screen>
            </>
        )}
        
    </Stack.Navigator>
  )
}

export default StackNavigator