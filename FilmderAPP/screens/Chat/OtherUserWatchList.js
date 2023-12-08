import React, { useEffect, useState } from 'react';
import {View, TextInput, Image, ScrollView, TouchableOpacity, Text, FlatList} from 'react-native'

import useAuth from '../../backend/AuthProvider'
import {deleteFromFriendList, getToWatchById, setUserData} from '../../backend/UserQueries';

const tempURL = "https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"

const OtherUserWatchList = ({route, navigation}) => {

    const filmIDs = route.params.filmIds;
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

    const renderItem = ({ item }) => (
        <View>
            <TouchableOpacity>
                <Text>{item}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View>
            <Text>Friends Watch List</Text>
            <FlatList
                data={filmIDs}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

export default OtherUserWatchList