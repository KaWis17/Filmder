import { View, Button, TextInput, Text } from 'react-native'
import React from 'react'

import useAuth from '../AuthProvider'


const ProfileScreen = () => {

    const { profileUpdate, logout } = useAuth();
    const { name, setName, user } = useAuth();

    return (
        <View className="flex-1 items-center justify-center bg-slate-300">
        <Text className="text-red-500 text-4xl mb-20">Witaj {user.displayName}!</Text>
        <TextInput 
            placeholder="New Name"
            value={name} 
            onChangeText={(Text) => {setName(Text)}}
            className="w-3/5 h-12 mb-4 border-solid rounded-md border-sky-500 bg-white text-center"/>
        <Button 
            title="Change name"
            onPress={profileUpdate}/>
        <Button 
            title="Logout"
            onPress={logout}/>
    </View>
    )
}

export default ProfileScreen