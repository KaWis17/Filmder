import {View, Modal, Text, TouchableOpacity, FlatList, SafeAreaView, Image} from 'react-native'
import React, {useState, useEffect} from 'react'
import { GiftedChat } from 'react-native-gifted-chat';

import useAuth from '../../backend/AuthProvider'
import { setUsersFriendList, getFriendFromFriendsList, sendAMessage } from '../../backend/UserQueries';
import { image500, fallbackMoviePoster } from '../../api/moviedb';
const SendFilmToFriendScreen = ({route, navigation}) => {

    const[ friends, setFriends ] = useState([]);
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);

    const film = route.params.film;

    /**
     * React hook to synchronize friendList depending on user variable
     */
    useEffect(
        () => { setUsersFriendList(user.uid, setFriends)},
        [user]
    );

    /**
     * sends movie invitation to picked friend and goes back to swiper screen
     * @param newMessages new message with movie invitation
     * @param friendshipID id of connection between user and friend
     */
    const onSend = (newMessages, friendshipID)  => {
        sendAMessage(GiftedChat, newMessages, setMessages, friendshipID, user.uid).then(r => navigation.goBack());
    };

    /**
     * Creates button witch represents friend to pick in invitation menu,
     * After clicking button sends a message to picked friend with
     * special field 'invitation' containing data of film proposal
     * @param item key to friends data
     * @returns {JSX.Element} button
     */
    const renderFriend = ({ item }) => (
        <TouchableOpacity
            className="h-20"
            onPress={() => {
                const newMessage = {
                    _id: messages.length + 1,
                    text: "Hey lets watch " +film.title+ " together sometime!",
                    createdAt: new Date(),
                    user: {
                        _id: user.uid,
                        name: "Your Name",
                    },
                    image: image500(film.poster_path) || fallbackMoviePoster,
                    invitation: film
                };
                onSend( [newMessage],item.id);
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

    return (
        <View style={{marginTop: 30}}>
            <Text style={{ fontSize: 30 }}> Invite to watch together!  {film.title}</Text>
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

export default SendFilmToFriendScreen;