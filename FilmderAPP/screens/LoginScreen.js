import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const LoginScreen = () => {
    const navigation = useNavigation();

    return (
        <View>
        <Text className="text-red-500">chatScreen 123</Text>
        </View>
    )
}

export default LoginScreen