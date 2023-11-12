import React from 'react'
import { View, Button, TextInput, Text } from 'react-native'

import useAuth from '../AuthProvider'


const LoginScreen = () => {

    const { signIn, signUp } = useAuth();
    const { email, setEmail, password, setPassword } = useAuth();


    return (
        <View className="flex-1 items-center justify-center bg-slate-300">
            <Text className="text-4xl mb-20">Filmder</Text>
            <TextInput 
                placeholder="e-mail" 
                value={email} 
                onChangeText={(Text) => {setEmail(Text)}}
                autoCapitalize='none'
                className="w-3/5 h-12 mb-4 border-solid rounded-md border-sky-500 bg-white text-center"/>
            <TextInput 
                placeholder="password" 
                value={password} 
                onChangeText={(Text) => {setPassword(Text)}}
                secureTextEntry={true} 
                className="w-3/5 h-12 mb-4 border-solid rounded-md border-sky-500 bg-white text-center"/>
            <Button 
                title="Sign in"
                onPress={signIn}/>
            <Button 
                title="Sign up"
                onPress={signUp}/>
        </View>
    )
}

export default LoginScreen