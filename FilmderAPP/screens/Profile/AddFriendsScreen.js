import React, { useState } from 'react'
import { View, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native'

import { sendInvitation } from '../../backend/UserQueries';
import { deleteFromFriendList2 } from '../../backend/UserQueries';

const AddFriendsScreen = ({route, navigation}) => {

    const userID = route.params.userID;

    const[friendsEmail, setFriendsEmail] = useState('');

    return (
        <ScrollView>
            <View className="pt-20 h-96 bg-green-500 rounded-md">
                <Text className="text-xl mx-auto w-4/5 h-12 my-4 border-solid rounded-md border-sky-500 text-center">
                    Add a friend to your list:
                </Text>

                <TextInput 
                    placeholder="Your friends email" 
                    value={friendsEmail} 
                    onChangeText={(Text) => {setFriendsEmail(Text)}}
                    className="mx-auto w-4/5 h-12 mb-4 border-solid rounded-md border-sky-500 bg-white text-center"
                />

                <TouchableOpacity 
                    onPress={() => {
                        sendInvitation(userID, friendsEmail, setFriendsEmail)
                        navigation.navigate("profileScreen")
                    }}
                    className="mx-auto w-3/5 h-12 mb-4 border-solid rounded-md bg-blue-500">
                    <Text className=" text-lg my-auto text-center color-white">SEND INVITATION</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default AddFriendsScreen