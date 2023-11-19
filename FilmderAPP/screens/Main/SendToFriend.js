import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'

import useAuth from '../../backend/AuthProvider'
import { setUsersFriendList, getFriendFromFriendsList } from '../../backend/UserQueries';

const SendToFriend = ({route, navigation}) => {

    const[ friends, setFriends ] = useState([]);
    const { user } = useAuth();

    /**
     * React hook to synchronize friendList depending on user variable
     */
    useEffect(
        () => { setUsersFriendList(user.uid, setFriends)},
        [user]
    );

    console.log(friends)
    const film = route.params.film;
    return (
        <View className="mt-5">
            <Text className="m-auto text-4xl font-semibold">{film.title}</Text>
            <Text className="m-auto text-xl font-semibold">Send to friend:</Text>

            <Text>TEST</Text>
        </View>
  )
}

export default SendToFriend