import { View, Text, Image } from 'react-native'
import React, { useEffect, useState} from 'react'
import Swiper from 'react-native-deck-swiper';
import { useNavigation } from '@react-navigation/core';
// import { DummyData } from '../temporary/cards'; 
import {fetchMovies, image500, fallbackMoviePoster } from '../api/moviedb';
import { basicMovie } from '../constants/index'

const SwiperScreen = () => {

    const navigation = useNavigation();
    
    // this is the default film on the screen, you can see it for a sec while loading <-- would be managed later 
    const [trending, setMovies] = useState([ basicMovie ]);

    useEffect(()=>{
        getMovies();           
    }, [])

    const getMovies = async ()=>{
        const data = await fetchMovies();
        if (data && data.results) setMovies(data.results);
    }

  return (
    <View className="flex h-screen bg-slate-300">

        <Swiper 
            containerStyle={{backgroundColor: "transparent" }}
            cards={trending}
            stackSize={1}
            // stackSeparation={10}
            animateCardOpacity
            infinite={true}

            // onSwipedAll={} <-- todo: write this function

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

            onTapCard={() => {
                navigation.navigate("modal", {id})
            }}

            renderCard={(card) => {
                id = card.id;
                console.log('\nCARD: ', card.title); 
                return (
                    <View className="my-auto relative bg-black h-4/5 rounded-xl">
                        <Image 
                        className="absolute top-0 h-full w-full rounded-xl"
                        source={{uri: image500(card.poster_path) || fallbackMoviePoster}}/>

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
            // cardIndex={card.id}
            // cardIndex={0}

        />
    </View>
  )
}

export default SwiperScreen