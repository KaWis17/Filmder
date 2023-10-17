import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const homeScreen = () => {
    const navigation = useNavigation();
    return (
        <View>
        <Text className="text-red-500">homeScreen</Text>
        <Button title='go to Chat!' onPress={() => navigation.navigate('Chat')}/>
        </View>
    )
}

export default homeScreen