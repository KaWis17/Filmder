import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ChatScreen from './screens/ChatScreen';
import MainScreen from './screens/MainScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';

const Tab = createBottomTabNavigator();

import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import{
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential
} from 'firebase/auth'
import { auth } from './FirebaseConfig'
//import AsyncStorage from '@react-native-async-storage/async-storage';

const Navigation = () => {

    const [userInfo, setUserInfo] = React.useState()

    const user = false;

    return (
        <>
            {user ? (
                <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName="Main">
                <>
                <Tab.Screen name='Chat' 
                            component={ChatScreen} 
                            options={{tabBarIcon: ({ color, size }) => (<Ionicons name="chatbubbles-outline" color={color} size={size} />),}}
                />
                <Tab.Screen name='Main' 
                            component={MainScreen} 
                            options={{tabBarIcon: ({ color, size }) => (<Ionicons name="home-outline" color={color} size={size} />),}}
                />
                <Tab.Screen name='Profile' 
                            component={ProfileScreen} 
                            options={{tabBarIcon: ({ color, size }) => (<Ionicons name="person-outline" color={color} size={size} />),}}
                />
                </>
            </Tab.Navigator>
            ) : (
                LoginScreen()
            )}
        </>
    )
}

export default Navigation