import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from './ProfileScreen';
import AddFriendsScreen from './AddFriendsScreen';
import UserWatchList from "../Chat/UserWatchList";


const ProfileStack = ({ navigation, route }) => {

    const StackInProfile = createNativeStackNavigator();

    return (

        <StackInProfile.Navigator screenOptions={{headerShown: false}} initialRouteName="profileScreen">
            <StackInProfile.Screen name="profileScreen" component={ProfileScreen} />
            <StackInProfile.Group screenOptions={{presentation: 'modal'}} >
                <StackInProfile.Screen name="addFriendsScreen" component={AddFriendsScreen}/>
            </StackInProfile.Group>
            <StackInProfile.Screen name="userWatchList" component={UserWatchList}/>
        </StackInProfile.Navigator>
        
    )
}

export default ProfileStack