import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SwiperScreen from './SwiperScreen';
import ModalScreen from './ModalScreen';

const Stack = createNativeStackNavigator();

const MainScreen = () => {

    return (

         <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="swiper" component={SwiperScreen} />
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="modal" component={ModalScreen}r/>
            </Stack.Group>
        </Stack.Navigator>
        
    )
}

export default MainScreen