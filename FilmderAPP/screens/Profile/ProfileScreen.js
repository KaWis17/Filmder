import React, { useEffect, useState } from 'react'
import { View, TextInput, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import {Alert} from 'react-native'

import { useNavigation } from '@react-navigation/core'

import useAuth from '../../backend/AuthProvider'
import { setUserData, updateUserData, uploadProfilePhoto } from '../../backend/UserQueries'
import { setUsersSentInvitationList } from '../../backend/UserQueries';
import { setUsersReceivedInvitationList } from '../../backend/UserQueries';
import { addToFriendList2 } from '../../backend/UserQueries';
import { rejectInvitation } from '../../backend/UserQueries';

const tempURL = "https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"

const ProfileScreen = ({}) => {

    const navigation = useNavigation();

    const { logout } = useAuth();
    const { user } = useAuth();

    const[ sentInvitations, setSentInvitations ] = useState([]);
    const[ receivedInvitations, setReceivedInvitations ] = useState([]);
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
            setUsersSentInvitationList(user.uid, setSentInvitations)
            setUsersReceivedInvitationList(user.uid, setReceivedInvitations)
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
                        <Text className=" text-lg my-auto text-center color-white">🎅 CHANGE IMAGE 🎅🏿</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={async () => {
                            try {
                                navigation.navigate("userWatchList",{friendID: user.uid});
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

                    {sentInvitations.length > 0 && (
                        <Text className="mx-auto w-4/5 h-12 my-4 mb-0 border-solid rounded-md border-sky-500 text-center text-xl">
                            Sent invitations:
                        </Text>
                    )}

                    {sentInvitations.map(item => (
                            <View key={item.id}>
                                <View className="flex flex-row my-auto mx-5 mb-1">
                                    <Image 
                                        className="bg-red-500 h-16 aspect-square rounded-full"
                                        source={item.receivingImageUrl !== undefined ? {uri: item.receivingImageUrl } : {uri: tempURL}}
                                    />

                                    <View className="flex-auto ml-5 my-auto">
                                        <Text numberOfLines={1} className="text-xl font-medium">
                                            {
                                                item.receivingFirst +" "+ 
                                                item.receivingLast}
                                        </Text>
                                    </View>
                                
                                </View>
                            </View>
                        ))}
                
                    {receivedInvitations.length > 0 && (
                        <Text className="mx-auto w-4/5 h-12 my-4 mt-8 mb-0 border-solid rounded-md border-sky-500 text-center text-xl">
                            Received invitations:
                        </Text>
                    )}

                    {receivedInvitations.map(item => (
                            <TouchableOpacity
                            key={item.id}
                            onPress={ async () => {
                                var friendshipID = item.id
                
                                Alert.alert('Do you want to accept this account?', 'You cannot undo this action', [
                                    {
                                        text: 'accept',
                                        onPress: async () => {
                                            await addToFriendList2(user.uid, item.sending)
                                        },
                                    },
                                    {
                                        text: 'reject', 
                                        onPress: async () => await rejectInvitation(friendshipID)
                                    },
                                ]);
                
                            }}
                            >

                                <View className="flex flex-row my-auto mx-5 mb-1">
                                    <Image 
                                        className="bg-red-500 h-16 aspect-square rounded-full"
                                        source={item.sendingImageUrl !== undefined ? {uri: item.sendingImageUrl } : {uri: tempURL}}
                                    />

                                    <View className="flex-auto ml-5 my-auto">
                                        <Text numberOfLines={1} className="text-xl font-medium">
                                            {
                                                item.sendingFirst +" "+ 
                                                item.sendingLast}
                                        </Text>
                                    </View>
                                
                                </View>

                            </TouchableOpacity>
                        ))}


                    <Text className="mx-auto w-4/5 h-12 my-4 mt-12 border-solid rounded-md border-sky-500 text-center">
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