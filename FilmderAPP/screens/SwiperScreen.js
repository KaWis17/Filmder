import { View, Text, Image } from 'react-native'
import React from 'react'
import Swiper from 'react-native-deck-swiper';
import { useNavigation } from '@react-navigation/core';
import { DummyData } from '../temporary/cards';

const SwiperScreen = () => {

    const navigation = useNavigation();

  return (
    <View className="flex h-screen bg-slate-300">

        <Swiper 
            containerStyle={{backgroundColor: "transparent" }}
            cards={DummyData}
            stackSize={10}
            stackSeparation={15}
            animateCardOpacity

            onSwipedTop={(id) => {
                //alert("swipedTOP")
            }}

            onSwipedRight={() => {
                //alert("swipedRIGHT")
            }}

            onSwipedBottom={() => {
                //alert("swipedBOTTOM")
            }}

            onSwipedLeft={() => {
                //alert("swipedLEFT")
            }}

            onTapCard={(id) => {
                navigation.navigate("modal", {id: id})
            }}

            renderCard={(card) => {
                return (
                    <View className="my-auto relative bg-black h-4/5 rounded-xl">
                        <Image 
                        className="absolute top-0 h-full w-full rounded-xl"
                        source={{ uri: card.posterUrl }}/>

                        <View className="flex flex-col absolute bottom-0 bg-white/100 rounded-b-xl w-full h-20 justify-between items-between px-6 py-2">
                    
                            <Text className="relative text-2xl font-bold w-full text-center truncate max-h-10 whitespace-nowrap">{card.title}</Text>
                            
                            <View className="flex flex-row w-full">
                                <Text className="text-xl text-left grow truncate max-h-9 whitespace-nowrap">{card.director}</Text>
                                <Text className="text-xl text-right">{card.id}</Text>
                            </View>

                        </View>

                    </View>
                )
            }}
            cardIndex={0}

        />
    </View>
  )
}

export default SwiperScreen