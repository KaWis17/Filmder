import React, { useEffect, useCallback, useState } from 'react';
import { View, Button, TextInput, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { collection, query, where, onSnapshot } from "firebase/firestore"; 
import { db } from "../FirebaseConnection"



const OtherUserScreen = ({route, navigation}) => {

    const friendID = route.params.friendID;

    const[first, setFirst] = useState('');
    const[last, setLast] = useState('');
    const[age, setAge] = useState('');

    useEffect(
        () =>     
        onSnapshot(
            query(
                collection(db, "users"), 
                where('uid', '==', friendID)
            ), 
            (snapshot) => {
                setFirst(snapshot.docs[0].data().first)
                setLast(snapshot.docs[0].data().last)
                setAge(snapshot.docs[0].data().born)
            }
            ),
        []
    );



  return (
    <View className="h-full">
            <ScrollView>
                <View className="justify-center">
                    <Image 
                        className="= mt-20 mx-auto mb-5 aspect-square rounded-full"
                        source={{ uri: "https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg" }}
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

                </View>
            </ScrollView>
        </View>
  )
}

export default OtherUserScreen