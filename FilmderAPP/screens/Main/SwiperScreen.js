import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'

import Swiper from 'react-native-deck-swiper';
import { useNavigation } from '@react-navigation/core';

import { fetchMovies, image500, fallbackMoviePoster } from '../../api/moviedb';

const SwiperScreen = () => {

    /**
     * TODO: Mario, Janie, zróbcie proszę dokumentację, jeśli uważacie, że jest potrzebna
     */

    const navigation = useNavigation();
    
    // this is the default film on the screen, you can see it for a sec while loading <-- would be managed later 
    const [trending, setMovies] = useState([
        {
            "adult": false,
            "backdrop_path": "/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
            "id": 872585,
            "title": "Oppenheimer",
            "original_language": "en",
            "original_title": "Oppenheimer",
            "overview": "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
            "poster_path": "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
            "media_type": "movie",
            "genre_ids": [
              18,
              36
            ],
            "popularity": 2706.372,
            "release_date": "2023-07-19",
            "video": false,
            "vote_average": 8.237,
            "vote_count": 4380
          },
    ]);

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
            stackSize={10}
            stackSeparation={15}
            animateCardOpacity
            infinite={true}

            // onSwipedAll={} <-- todo: write this function

            onSwipedTop={() => {
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
                navigation.navigate("modalScreen", {id: id})
            }}

            renderCard={(card) => {
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
            cardIndex={0}

        />
    </View>
  )
}

export default SwiperScreen