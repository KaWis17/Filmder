import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ChatScreen from './screens/ChatScreen';
import MainScreen from './screens/MainScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import useAuth from './AuthProvider';

const Tab = createBottomTabNavigator();

const Navigation = () => {

    const { user } =  useAuth()

    return (
        <>
            {user ? (
            <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName="Main">
                <Tab.Screen name='Chat' 
                            component={ChatScreen} 
                            options={{tabBarBadge: 3, tabBarIcon: ({ color, size }) => (<Ionicons name="chatbubbles-outline" color={color} size={size} />),}}
                />
                <Tab.Screen name='Main' 
                            component={MainScreen} 
                            options={{tabBarIcon: ({ color, size }) => (<Ionicons name="home-outline" color={color} size={size} />),}}
                />
                <Tab.Screen name='Profile' 
                            component={ProfileScreen} 
                            options={{tabBarIcon: ({ color, size }) => (<Ionicons name="person-outline" color={color} size={size} />),}}
                />
            </Tab.Navigator>
            ) : (
                LoginScreen(user)
            )}
        </>
    )
}

export default Navigation