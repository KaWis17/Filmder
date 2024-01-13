import React, { useEffect } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useAuth from '../../backend/AuthProvider';

import ChatStack from '../Chat/ChatStack';
import MainStack from '../Main/MainStack';
import ProfileStack from '../Profile/ProfileStack';
import AuthenticationScreen from '../Authentication/AuthenticationScreen';

const Navigation = () => {

    /**
     * Creating Tab Navigation using @react-navigation library 
     */
    const Tab = createBottomTabNavigator();
    const { user } =  useAuth();

    useEffect(() => {
        if (user) {
            console.log('save films to cache');
        }
        // user 
        // ? getAllWatchedFilmsFromDbToCache()
        // : clearCache();
        return () => {
            console.log('clean cache');
        }
    }, [user])

    /**
     * If user authenticated: giving access to the user navigation.
     * If user not authenticated: redirecting to the login-register screen.
     */
    return (
        <>
            {user ? (
            <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName="Discover">
                <Tab.Screen name='Chat' 
                            component={ChatStack} 
                            options={{tabBarBadge: 3, tabBarIcon: ({ color, size }) => (<Ionicons name="chatbubbles-outline" color={color} size={size} />),}}
                />
                <Tab.Screen name='Discover' 
                            component={MainStack} 
                            options={{tabBarIcon: ({ color, size }) => (<Ionicons name="home-outline" color={color} size={size} />),}}
                />
                <Tab.Screen name='Profile' 
                            component={ProfileStack} 
                            options={{tabBarIcon: ({ color, size }) => (<Ionicons name="person-outline" color={color} size={size} />),}}
                />
            </Tab.Navigator>
            ) : (
                AuthenticationScreen()
            )}
        </>
    )
}

export default Navigation