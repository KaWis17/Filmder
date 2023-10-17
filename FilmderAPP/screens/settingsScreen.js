import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const settingsScreen = () => {
    const navigation = useNavigation();

    return (
        <View>
        <Text className="text-red-500">settingsScreen</Text>
        <Button title='go to Home!' onPress={() => navigation.navigate('Home')} />
        </View>
    )
}

export default settingsScreen