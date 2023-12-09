import React, { useEffect, useState } from 'react'
import { View, TextInput, Text, Image, ScrollView, TouchableOpacity } from 'react-native'

import { useNavigation } from '@react-navigation/core'

import useAuth from '../../backend/AuthProvider'
import { setUserData, updateUserData, uploadProfilePhoto } from '../../backend/UserQueries'

const tempURL = "https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"

const ProfileScreen = ({}) => {

    const navigation = useNavigation();

    const { logout } = useAuth();
    const { user } = useAuth();

    const[first, setFirst] = useState('');
    const[last, setLast] = useState('');
    const[age, setAge] = useState('');
    const[imageUrl, setImageUrl] = useState(tempURL)
    const[timestamp, setTimestamp] = useState('')

     /**
     * React hook to synchronize userProfile depending on currently logged user
     */
    useEffect(
        () => {
            setUserData(user.uid, setFirst, setLast, setAge, setImageUrl, setTimestamp)
         },
        [user]
    );


    return (

        <View className="h-full">
            <ScrollView>
                <View className="justify-center">
                    <Image 
                        className="= mt-20 mx-auto mb-5 aspect-square rounded-full"
                        source={imageUrl ? {uri: imageUrl } : tempURL}
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
                        onPress={() => updateUserData(user.uid, user.email, first, last, age, imageUrl, timestamp)}
                        className="mx-auto w-3/5 h-12 mb-4 border-solid rounded-md bg-pink-300">
                        <Text className=" text-lg my-auto text-center color-white">UPDATE PROFILE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => uploadProfilePhoto(user.uid, user.email, first, last, age, timestamp)}
                        className="mx-auto w-3/5 h-12 mb-4 border-solid rounded-md bg-pink-600">
                        <Text className=" text-lg my-auto text-center color-white">CHANGE IMAGE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={async () => {
                            try {
                                navigation.navigate("otherUserWatchList",{friendID: user.uid});
                            } catch (error) {
                                console.error('Error fetching film IDs:', error);
                            }
                        }}
                        className="mx-auto w-3/5 h-12 mb-4 border-solid rounded-md bg-purple-400">
                        <Text className=" text-lg my-auto text-center color-white">🎬 Watchlist 🎬</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => navigation.navigate("addFriendsScreen", {userID: user.uid})}
                        className="mx-auto w-3/5 h-12 mb-4 border-solid rounded-md bg-purple-900">
                        <Text className=" text-lg my-auto text-center color-white">💗 ADD FRIEND 💗</Text>
                    </TouchableOpacity>

                    <Text className="mx-auto w-4/5 h-12 my-4 border-solid rounded-md border-sky-500 text-center">
                        This product uses the TMDB API but is not endorsed or certified by TMDB.
                    </Text>

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