import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SwiperScreen from './SwiperScreen';
import ModalScreen from './ModalScreen';
import SendFilmToFriendScreen from "./SendFilmToFriendScreen";


const MainStack = ({ navigation, route }) => {

    const StackInMain = createNativeStackNavigator();

    return (

        <StackInMain.Navigator screenOptions={{headerShown: false}} initialRouteName="swiperScreen">
            <StackInMain.Screen name="swiperScreen" component={SwiperScreen} />
            <StackInMain.Group screenOptions={{presentation: 'modal'}} >
                <StackInMain.Screen name="modalScreen" component={ModalScreen}/>
                <StackInMain.Screen name="sendToFriendScreen" component={SendFilmToFriendScreen} />
            </StackInMain.Group>
        </StackInMain.Navigator>
        
    )
}

export default MainStack