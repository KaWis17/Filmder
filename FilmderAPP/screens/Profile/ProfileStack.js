import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from './ProfileScreen';
import AddFriendsScreen from './AddFriendsScreen';


const ProfileStack = ({ navigation, route }) => {

    const StackInProfile = createNativeStackNavigator();

    return (

        <StackInProfile.Navigator screenOptions={{headerShown: false}} initialRouteName="profileScreen">
            <StackInProfile.Screen name="profileScreen" component={ProfileScreen} />
            <StackInProfile.Group screenOptions={{presentation: 'modal'}} >
                <StackInProfile.Screen name="addFriendsScreen" component={AddFriendsScreen}/>
            </StackInProfile.Group>
        </StackInProfile.Navigator>
        
    )
}

export default ProfileStack