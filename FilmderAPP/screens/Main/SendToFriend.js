import {View, Text, TouchableOpacity, FlatList, SafeAreaView, Image} from 'react-native'
import React, {useState, useEffect} from 'react'
import { GiftedChat } from 'react-native-gifted-chat';

import useAuth from '../../backend/AuthProvider'
import { setUsersFriendList, getFriendFromFriendsList, sendAMessage } from '../../backend/UserQueries';

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

    const handleSendMessage = (friendshipID) => {
        // You can customize this function further if needed
        const newMessage = {
            _id: messages.length + 1,
            text: "Hello, this is a new message!",
            createdAt: new Date(),
            user: {
                _id: user.uid,
                name: "Your Name", // Replace with the actual user's name
            },
        };

        onSend([newMessage],friendshipID);
    };

    const renderFriend = ({ item }) => (
        <TouchableOpacity
            className="h-20"
            onPress={() => {
                alert(item.id+" "+getFriendFromFriendsList(item.users, user.uid)+" "+film.title)
                handleSendMessage(item.id);

                const newMessage = {
                    _id: messages.length + 1,
                    text: "Hello, it's a film proposal for somebody! "+film.title,
                    createdAt: new Date(),
                    user: {
                        _id: user.uid,
                        name: "Your Name",
                    },
                };
                sendAMessage(GiftedChat, [newMessage], setMessages, item.id, user.uid);
                navigation.navigate("chatConversation",
                    {   friendshipID: item.id,
                        friendProfile: getFriendFromFriendsList(item.users, user.uid),
                    }
                )
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
                    <View className="flex-row">
                        <Text numberOfLines={1} className="flex-1 text-base">
                            {(item.lastMessage !== undefined) ?
                                (item.lastMessage.sendBy == user.uid ?
                                    ("You: " + item.lastMessage.text) :
                                    (getFriendFromFriendsList(item.users, user.uid).first + ": " + item.lastMessage.text)) :
                                ("Say hi to " + getFriendFromFriendsList(item.users, user.uid).first + "!")
                            }
                        </Text>

                        <Text className="text-base pl-5">{

                            (item.lastMessage === undefined) ?
                                (
                                    " "
                                ) : (
                                    (new Date(item.lastMessage.time.seconds*1000).isSameDateAs(new Date())) ?
                                        (
                                            new Date(item.lastMessage.time.seconds*1000).getHours().toLocaleString('en-US', {
                                                minimumIntegerDigits: 2,
                                                useGrouping: false
                                            }) + ":" + new Date(item.lastMessage.time.seconds*1000).getMinutes().toLocaleString('en-US', {
                                                minimumIntegerDigits: 2,
                                                useGrouping: false
                                            })
                                        ) : (
                                            days[new Date(item.lastMessage.time.seconds*1000).getDay(({ weekday:"short" }))]
                                        )
                                )
                        }</Text>

                    </View>

                </View>

            </View>

        </TouchableOpacity>
    );

    const film = route.params.film;
    return (
        <View className="mt-5">
            <Text className="m-auto text-4xl font-semibold">{film.title}</Text>
            <Text className="m-auto text-xl font-semibold">Send to friend:</Text>

            <Text>TEST</Text>
            <SafeAreaView className="flex h-screen bg-slate-300">
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