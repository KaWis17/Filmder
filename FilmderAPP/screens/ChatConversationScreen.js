import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { db } from '../FirebaseConnection';
import useAuth from '../AuthProvider';

const ChatConversationScreen = ({route, navigation}) => {
    const info = route.params.info;

    const [messages, setMessages] = useState([])
    const { user } = useAuth();


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
        },
        createdAt: new Date(),
    })
    
  }, [])

  return (
    <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
            _id: user.uid,
        }}
    />
  )

}

export default ChatConversationScreen;