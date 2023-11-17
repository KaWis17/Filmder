import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, ScrollView } from 'react-native'

import { setUserData } from '../../backend/UserQueries';

const tempURL = "https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"

const OtherUserScreen = ({route, navigation}) => {

    const friendID = route.params.friendID;

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

    return (
        <View className="h-full">
            <ScrollView>
                <View className="justify-center">
                    <Image 
                        className="= mt-20 mx-auto mb-5 aspect-square rounded-full"
                        source={imageUrl ? {uri: imageUrl } : tempURL}
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