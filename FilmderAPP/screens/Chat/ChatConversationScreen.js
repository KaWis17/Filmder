import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { db } from '../../FirebaseConnection';
import useAuth from '../../AuthProvider';
import { View, TouchableOpacity, Text, SafeAreaView } from 'react-native'



const ChatConversationScreen = ({route, navigation}) => {
    const info = route.params.info;

    const [messages, setMessages] = useState([])
    const { user } = useAuth();

    const getFriend = (item, userID) => {
        delete item[userID]
        return item[Object.keys(item)[0]]
    }

    const friend = getFriend(info.users, user.uid);

    useEffect(
        () =>         
        onSnapshot(
            query(
                collection(db, "friends", info.id, "messages"), 
                orderBy('createdAt', 'desc')
            ), 
            (snapshot) =>  
                setMessages(
                    snapshot.docs.map((doc) => ({
                        _id: doc.id,
                        ...doc.data(),
                        createdAt: doc.data().createdAt.toDate(),
                    }))
                )
            ),
        [user]
    );

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
    )

    addDoc(collection(db, "friends", info.id, "messages"), {
        text: messages[0].text,
        user: {
            _id: user.uid,
            avatar: "https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg",
        },
        createdAt: new Date(),
    })
    
  }, [])

  console.log(friend.uid)

  return (
    <View style={{flex: 1}}>
        <View className="w-full bg-blue-500">
            <SafeAreaView>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("otherUserScreen", {friendID: friend.uid})}
                    className="w-full h-12 bg-blue-500">
                    <Text className=" text-lg my-auto text-center color-white">{friend.first + " " + friend.last}</Text>
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
            showAvatarForEveryMessage={true}
            onPressAvatar={() => navigation.navigate("otherUserScreen", {friendID: friend.uid})}
        />
    </View>
  )

}

export default ChatConversationScreen;