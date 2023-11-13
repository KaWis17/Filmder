import React from 'react'
import { View, TouchableOpacity, TextInput, Text } from 'react-native'

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
                className="w-4/5 h-12 mb-4 border-solid rounded-md border-sky-500 bg-white text-center"/>
            <TextInput 
                placeholder="password" 
                value={password} 
                onChangeText={(Text) => {setPassword(Text)}}
                secureTextEntry={true} 
                className="w-4/5 h-12 mb-4 border-solid rounded-md border-sky-500 bg-white text-center"/>

            <TouchableOpacity 
                onPress={signIn}
                className="mx-auto w-1/2 h-12 mb-4 border-solid rounded-md bg-blue-500">
                <Text className=" text-lg my-auto text-center color-white">SIGN IN</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={signUp}
                className="absolute bottom-10 mx-auto w-1/2 h-12 mb-4 border-solid rounded-md bg-red-500">
                <Text className=" text-lg my-auto text-center color-white">REGISTER</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen