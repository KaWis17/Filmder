/**
 * @module screens
 */
import React, { useEffect, useState } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SwiperScreen from './SwiperScreen';
import ModalScreen from './ModalScreen';
import SendFilmToFriendScreen from "./SendFilmToFriendScreen";
import FilmCache from "./UserCache"


const MainStack = ({ navigation, route }) => {
    const [savedCards, setSavedCards] = useState(false);

    const StackInMain = createNativeStackNavigator();
    
    useEffect(() => 
    {}, [savedCards])

    return (
        <>
            <FilmCache setSavedCards={setSavedCards}></FilmCache>
            {savedCards
            ?
            <StackInMain.Navigator screenOptions={{headerShown: false}} initialRouteName="swiperScreen">
                <StackInMain.Screen name="swiperScreen" component={SwiperScreen} />
                <StackInMain.Group screenOptions={{presentation: 'modal'}} >
                    <StackInMain.Screen name="modalScreen" component={ModalScreen}/>
                    <StackInMain.Screen name="sendToFriendScreen" component={SendFilmToFriendScreen} />
                </StackInMain.Group>
            </StackInMain.Navigator>
            : <></>}
        </>
    )
}

export default MainStack