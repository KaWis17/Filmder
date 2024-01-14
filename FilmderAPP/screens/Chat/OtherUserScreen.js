import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, ScrollView, TouchableOpacity, Text } from 'react-native'

import useAuth from '../../backend/AuthProvider'
import {deleteFromFriendList, getFriendFromFriendsList, getToWatchById, setUserData} from '../../backend/UserQueries';
import {fetchMovieDetails, fetchMovies} from "../../api/moviedb";

const tempURL = "https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"

const OtherUserScreen = ({route, navigation}) => {

    const friendID = route.params.friendID;

    const { user } = useAuth();

    const[first, setFirst] = useState('');
    const[last, setLast] = useState('');
    const[age, setAge] = useState('');
    const[imageUrl, setImageUrl] = useState(tempURL);
    const[timestamp, setTimestamp] = useState('')

    /**
     * React hook to synchronize friendProfile depending on currently viewed friend
     */
    useEffect(
        () =>
        setUserData(friendID, setFirst, setLast, setAge, setImageUrl, setTimestamp),
        [friendID]
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
                            editable={false} selectTextOnFocus={false}
                        className="w-4/5 h-12 mb-4 border-solid rounded-md border-sky-500 bg-white text-center"/>

                        <TextInput 
                            placeholder="Surname" 
                            value={last} 
                            editable={false} selectTextOnFocus={false}
                        className="w-4/5 h-12 mb-4 border-solid rounded-md border-sky-500 bg-white text-center"/>

                        <TextInput 
                            placeholder="Age" 
                            value={age} 
                            editable={false} selectTextOnFocus={false}
                        className="w-4/5 h-12 mb-4 border-solid rounded-md border-sky-500 bg-white text-center"/>
                    </View>

                    <TouchableOpacity
                        onPress={async () => {
                            try {
                                navigation.navigate("otherUserWatchList",{friendID:friendID});
                            } catch (error) {
                                console.error('Error fetching film IDs:', error);
                            }
                        }}
                        className="mx-auto w-3/5 h-12 mb-4 border-solid rounded-md bg-purple-400">
                        <Text className=" text-lg my-auto text-center color-white">🎬 Watchlist 🎬</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={async () => {
                            try {
                                navigation.navigate("userCommonWatchList",{friendID:friendID});
                            } catch (error) {
                                console.error('Error fetching film IDs:', error);
                            }
                        }}
                        className="mx-auto w-3/5 h-12 mb-4 border-solid rounded-md bg-purple-400">
                        <Text className=" text-lg my-auto text-center color-white">🎬 Common watchlist 🎬</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {
                            deleteFromFriendList(user.uid, friendID);
                            navigation.navigate("chatList");
                        }}
                        className="mx-auto w-3/5 h-12 mb-4 border-solid rounded-md bg-red-500">
                        <Text className=" text-lg my-auto text-center color-white">DELETE FROM FRIENDS</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
  )
}

export default OtherUserScreen