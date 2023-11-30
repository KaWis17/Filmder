import {View, Text, TouchableOpacity, FlatList, SafeAreaView, Image} from 'react-native'
import React, {useState, useEffect} from 'react'
import { GiftedChat } from 'react-native-gifted-chat';

import useAuth from '../../backend/AuthProvider'
import { setUsersFriendList, getFriendFromFriendsList, sendAMessage } from '../../backend/UserQueries';
import { image500, fallbackMoviePoster } from '../../api/moviedb';
const SendToFriend = ({route, navigation}) => {

    const[ friends, setFriends ] = useState([]);
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);

    /**
     * React hook to synchronize friendList depending on user variable
     */
    useEffect(
        () => { setUsersFriendList(user.uid, setFriends)},
        [user]
    );

    const onSend = (newMessages, friendshipID)  => {
        sendAMessage(GiftedChat, newMessages, setMessages, friendshipID, user.uid);
    };

    const renderFriend = ({ item }) => (
        <TouchableOpacity
            className="h-20"
            onPress={() => {
                alert(item.id+" "+getFriendFromFriendsList(item.users, user.uid)+" "+film.title)
                const newMessage = {
                    _id: messages.length + 1,
                    text: "Hey lets watch " +film.title+ " together sometime!",
                    createdAt: new Date(),
                    user: {
                        _id: user.uid,
                        name: "Your Name",
                    },
                    image: image500(film.poster_path) || fallbackMoviePoster,
                    proposal: film
                };
                onSend( [newMessage],item.id);
                navigation.goBack();
            }}
        >

            <View className="flex flex-row my-auto mx-5">
                <Image
                    className="bg-red-500 h-16 aspect-square rounded-full"
                    source={getFriendFromFriendsList(item.users, user.uid).imageUrl !== undefined ? {uri: getFriendFromFriendsList(item.users, user.uid).imageUrl } : {uri: tempURL}}
                />

                <View className="flex-auto ml-5 my-auto">
                    <Text numberOfLines={1} className="text-xl font-medium">
                        {   getFriendFromFriendsList(item.users, user.uid).first +" "+
                            getFriendFromFriendsList(item.users, user.uid).last}
                    </Text>
                </View>

            </View>

        </TouchableOpacity>
    );


    const film = route.params.film;
    return (
        <View style={{marginTop: 30}}>
            <Text> Invite to watch together: {film.title}</Text>
            <SafeAreaView>
                <FlatList
                    data={friends}
                    renderItem={renderFriend}
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
        </View>
  )
}

Date.prototype.isSameDateAs = function(otherDate) {
    return (
        this.getFullYear() === otherDate.getFullYear() &&
        this.getMonth() === otherDate.getMonth() &&
        this.getDate() === otherDate.getDate()
    );
}

export default SendToFriend;