import React, { useEffect, useState } from 'react'
import { View, TextInput, Text, Image, ScrollView, TouchableOpacity } from 'react-native'

import useAuth from '../../backend/AuthProvider'
import { setUserData, updateUserData } from '../../backend/UserQueries'


const ProfileScreen = () => {

    const { logout } = useAuth();
    const { user } = useAuth();

    const[first, setFirst] = useState('');
    const[last, setLast] = useState('');
    const[age, setAge] = useState('');
    const[timestamp, setTimestamp] = useState('')

     /**
     * React hook to synchronize userProfile depending on currently logged user
     */
    useEffect(
        () => setUserData(user.uid, setFirst, setLast, setAge, setTimestamp),
        [user]
    );

    return (

        <View className="h-full">
            <ScrollView>
                <View className="justify-center">
                    <Image 
                        className="= mt-20 mx-auto mb-5 aspect-square rounded-full"
                        source={{ uri: "https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg" }}
                    />

                    <View className="items-center">
                        <TextInput 
                            placeholder="Name" 
                            value={first} 
                            onChangeText={(Text) => {setFirst(Text)}}
                        className="w-4/5 h-12 mb-4 border-solid rounded-md border-sky-500 bg-white text-center"/>

                        <TextInput 
                            placeholder="Surname" 
                            value={last} 
                            onChangeText={(Text) => {setLast(Text)}}
                        className="w-4/5 h-12 mb-4 border-solid rounded-md border-sky-500 bg-white text-center"/>

                        <TextInput 
                            placeholder="Age" 
                            value={age} 
                            onChangeText={(Text) => {setAge(Text)}}
                            keyboardType='numeric'
                            maxLength={2}
                        className="w-4/5 h-12 mb-4 border-solid rounded-md border-sky-500 bg-white text-center"/>
                    </View>

                    <TouchableOpacity 
                        onPress={() => updateUserData(user.uid, user.email, first, last, age, timestamp)}
                        className="mx-auto w-3/5 h-12 mb-4 border-solid rounded-md bg-blue-500">
                        <Text className=" text-lg my-auto text-center color-white">UPDATE PROFILE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={logout}
                        className="mx-auto w-3/5 h-12 mb-4 border-solid rounded-md bg-red-500">
                        <Text className=" text-lg my-auto text-center color-white">LOGOUT</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    )
}

export default ProfileScreen