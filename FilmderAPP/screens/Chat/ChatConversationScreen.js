import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView } from 'react-native'

import { GiftedChat } from 'react-native-gifted-chat';

import { getDoc, doc } from "firebase/firestore";
import { db } from '../../backend/FirebaseConnection';

import useAuth from '../../backend/AuthProvider';
import { setMessagesFromChat, sendAMessage } from '../../backend/UserQueries';
import { addToFriendList } from '../../backend/UserQueries';
import { rejectInvitation } from '../../backend/UserQueries';


const ChatConversationScreen = ({route, navigation}) => {

    const friendshipID = route.params.friendshipID;
    const friendProfile = route.params.friendProfile;

    const [ messages, setMessages ] = useState([])
    const { user } = useAuth();
    const docRef = doc(db, "friends", friendshipID);
    // let invitationByFriend = false;
    // let invitationByUser = false;
    const [invitationByFriend, setInvitationByFriend] = useState(false);
    const [invitationByUser, setInvitationByUser] = useState(false);


    /**
     * React hook to synchronize messages from chat depending on user variable
     */
    useEffect(
        () => {
            setMessagesFromChat(friendshipID, setMessages, friendProfile.imageUrl)
            console.log(messages)

            const fetchData = async () => {
                try {
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();

                        // if(!data.sentInvitation) {
                        //     setInvitationByFriend(false);
                        //     setInvitationByUser(false);
                        // }
                        // else {
                        //     // invitationByFriend = data.sentInvitation.includes(friendProfile.uid);
                        //     // invitationByUser = data.sentInvitation.includes(user.uid);
                        //     setInvitationByFriend(data.sentInvitation.includes(friendProfile.uid));
                        //     setInvitationByUser(data.sentInvitation.includes(user.uid));
                        // }
                        if(data.sentInvitation && Array.isArray(data.sentInvitation)) {
                            setInvitationByFriend(data.sentInvitation.includes(friendProfile.uid));
                            setInvitationByUser(data.sentInvitation.includes(user.uid));
                        }
                        else {
                            setInvitationByFriend(false);
                            setInvitationByUser(false);
                        }
                    }
                } catch (error) {
                    console.error("Błąd podczas pobierania dokumentu:", error);
                }
            };
    
            fetchData();
        },        
        [user]
    );

    /**
     * Sending a message to the database 
     */
    const onSend = useCallback(
        (messages = []) => 
        sendAMessage(GiftedChat, messages, setMessages, friendshipID, user.uid), 
        []
    )


    if(invitationByFriend) {
        return (
            <View style={{flex: 1}}>
                <View className="w-full bg-blue-500">
                    <SafeAreaView>
                        <TouchableOpacity 
                            // onPress={() => navigation.navigate("otherUserScreen", {friendID: friendProfile.uid})}
                            className="w-full h-12 bg-blue-500">
                            <Text className=" text-lg my-auto text-center color-white">{friendProfile.first + " " + friendProfile.last}</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>
                <View className="w-full bg-green-500">
                    <SafeAreaView>
                        <TouchableOpacity 
                            onPress={() => {
                                addToFriendList(friendshipID)
                                navigation.navigate("ChatListScreen")
                            }}
                            className="w-full h-12 bg-blue-500">
                            <Text className=" text-lg my-auto text-center color-white">ACCEPT INVITATION</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>
                <View className="w-full bg-red-500">
                    <SafeAreaView>
                        <TouchableOpacity 
                            onPress={() => {
                                rejectInvitation(friendshipID)
                                navigation.navigate("ChatListScreen")
                            }}
                            className="w-full h-12 bg-blue-500">
                            <Text className=" text-lg my-auto text-center color-white">REJECT INVITATION</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>
            </View>
        )
    }
    else if(invitationByUser) {
        return (
            <View style={{flex: 1}}>
                <View className="w-full bg-blue-500">
                    <SafeAreaView>
                        {/* <TouchableOpacity 
                            // onPress={() => navigation.navigate("otherUserScreen", {friendID: friendProfile.uid})}
                            className="w-full h-12 bg-blue-500">
                            <Text className=" text-lg my-auto text-center color-white">Waiting for response...</Text>
                        </TouchableOpacity> */}
                        <Text className=" text-lg my-auto text-center color-white">
                            Waiting for response...
                        </Text>
                    </SafeAreaView>
                </View>
            </View>
        )
    }
    else {
        return (
            <View style={{flex: 1}}>
                <View className="w-full bg-blue-500">
                    <SafeAreaView>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate("otherUserScreen", {friendID: friendProfile.uid})}
                            className="w-full h-12 bg-blue-500">
                            <Text className=" text-lg my-auto text-center color-white">{friendProfile.first + " " + friendProfile.last}</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: user.uid,
                    }} 
                    showUserAvatar={false}
                    showAvatarForEveryMessage={false}
                    scrollToBottom={true}
                    onPressAvatar={() => navigation.navigate("otherUserScreen", {friendID: friendProfile.uid})}
                />
            </View>
        )
    }

}

export default ChatConversationScreen;