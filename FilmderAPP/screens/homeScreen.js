import { View, Text, Button, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Swiper from 'react-native-deck-swiper'
import { DummyData } from '../dummyData'

const homeScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1">

            {/*HEADER*/}
            <View className="items-center relative">
            
                <Text className="top-5 text-xl">FILMDERapp</Text>

                <TouchableOpacity className="absolute right-5 top-3" onPress={() => navigation.navigate('Settings')}>
                    <Image 
                        className="h-10 w-10 rounded-full"
                        source={{
                            uri: 'https://scontent-mad2-1.xx.fbcdn.net/v/t39.30808-6/360086319_3683278515233971_4867496317066971572_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=hrCtdg89qocAX_Wj6l4&_nc_ht=scontent-mad2-1.xx&oh=00_AfAfr46MLjC4YwpQwCdkWP2Y4gRX_vwG2AaT_FO3KCh7PA&oe=6534C2E9',
                        }}
                    />
                </TouchableOpacity>

            </View>

            {/*CARDS*/}
            <View className="flex-1 -mt-6">

                <Swiper 
                    containerStyle={{backgroundColor: "transparent" }}
                    cards={DummyData}
                    stackSize={10}
                    animateCardOpacity
                    renderCard={(card) => {
                        return (
                            <View className="relative bg-red-500 h-3/4 rounded-xl">
                                <Image 
                                className="absolute top-0 h-full w-full rounded-xl"
                                source={{ uri: card.posterUrl }}/>
                                <View className="absolute bottom-0 bg-white w-full flex-row h-20 justify-between items-between px-6 py-2">
                                    <View>
                                        <View >
                                            <Text className="text-2xl font-bold">{card.title}</Text>
                                        </View>
                                        <View>
                                            <Text>{card.director}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text className="text-2xl">{card.id}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                    cardIndex={0}
                    
                />
               
            </View>


        
        </SafeAreaView>
    )
}

export default homeScreen
