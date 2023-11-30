import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import Swiper from 'react-native-deck-swiper';
import { useNavigation } from '@react-navigation/core';
import { fetchMovies, image500, fallbackMoviePoster } from '../../api/moviedb';
import { basicMovie } from '../../constants/index';
import { addWantPreference } from '../../backend/UserQueries';
import useAuth from '../../backend/AuthProvider'


const SwiperScreen = () => {
    const [ cardsNumber, setCardsNumber ] = useState(19);
    const { user } = useAuth();
    const [ page, setPage ] = useState(1);
    /**
     * TODO: Janie, zrób proszę dokumentację, jeśli uważasz, że jest potrzebna
     */

    const navigation = useNavigation();
    // this is the default film on the screen, you can see it for a sec while loading
    const [trending, setMovies] = useState([ basicMovie ]);

    useEffect(()=>{
        getMovies();           
    }, [])

    /**
     * paramExample = {"queryParam1": int_value1,
     *                 "queryParam2": "string_value2",
     *                 "queryParam3": "value1|value2,value3"}    {, - and} {| - or}
     * List of all parameters can be finded here: https://developer.themoviedb.org/reference/discover-movie
     */
    var exampleOptions = {
        "with_original_language": 'pl', "year": 2023
    }

    /**
     * This function gets films from API. The maximum number of films that can be received in one API call is one page which contains 19 films.
     * Remember that variable {page} means actual page number + 1. 
     */
    const getMovies = async ()=>{
        setPage(p => p + 1);
        console.log(`page = ${page}`)
        const data = await fetchMovies(page, exampleOptions);
        if (data && data.results) {
            setMovies(data.results);
            setCardsNumber(data.results.length - 1);
        }
    }

    const update_cards = async (id)=>{
        if (id == cardsNumber) {
            await getMovies();
        }
    }

  return (
    <View className="flex h-screen bg-slate-300">

        <Swiper 
            containerStyle={{backgroundColor: "transparent" }}
            cards={trending}
            stackSize={1}
            animateCardOpacity
            infinite={true}

            onSwiped={(id)=>{
                console.log(`swiped, card_id = ${id} on page ${page}`);
                update_cards(id)
            }}

            onSwipedTop={() => {
                //alert("swipedTOP")
            }}

            onSwipedRight={(id) => {
                addWantPreference(user.uid, trending[id].id, true, true)
            }}

            onSwipedBottom={() => {
                //alert("swipedBOTTOM")
            }}

            onSwipedLeft={(id) => {
                addWantPreference(user.uid, trending[id].id, false)
            }}

            onTapCard={(id) => {
                navigation.navigate("modalScreen", {film: trending[id]})
            }}

            renderCard={(card) => {
                id = card.id;
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

        />
    </View>
  )
}

export default SwiperScreen