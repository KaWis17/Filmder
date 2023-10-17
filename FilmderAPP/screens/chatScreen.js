import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const chatScreen = () => {
    const navigation = useNavigation();

    return (
        <View>
        <Text className="text-red-500">chatScreen</Text>
        <Button title='go to Settings!' onPress={() => navigation.navigate('Settings')} />
        </View>
    )
}

export default chatScreen