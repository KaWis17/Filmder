import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';


const ProfileStack = ({ navigation, route }) => {

    const StackInProfile = createNativeStackNavigator();

    return (

        <StackInProfile.Navigator screenOptions={{headerShown: false}} initialRouteName="profileScreen">
            <StackInProfile.Screen name="profileScreen" component={ProfileScreen} />
        </StackInProfile.Navigator>
        
    )
}

export default ProfileStack