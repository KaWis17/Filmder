import React, { useEffect, useState } from 'react'
import { View, Text, Image, Modal, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-deck-swiper';
import { useNavigation } from '@react-navigation/core';
import { fetchMovies, image500, fallbackMoviePoster } from '../../api/moviedb';
import { basicMovie } from '../../constants/index';
import { addWantPreference, addRatePreference, countWantedFilmsFromGenre, 
    countNumberOfUsersFilms, getAllGenres } from '../../backend/UserQueries';
import useAuth from '../../backend/AuthProvider'
import StarRating from 'react-native-star-rating-widget';


const SwiperScreen = () => {
    const [ cardsNumber, setCardsNumber ] = useState(19);
    const { user } = useAuth();
    const [ page, setPage ] = useState(1);

    const navigation = useNavigation();
    // this is the default film on the screen, you can see it for a sec while loading
    const [trending, setMovies] = useState([ basicMovie ]);

    const [rating, setRating] = useState(0)
    const [ratingScreen, setRatingScreen] = useState([false, -1, -1])

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

    var genreOption = {
       "with_genres": "14,28"
    }

    const genres_array = [14, 28, 99]

    /**
     * This function gets films from API. The maximum number of films that can be received in one API call is one page which contains 19 films.
     * Remember that variable {page} means actual page number + 1. 
     */
    const getMovies = async ()=>{
        setPage(p => p + 1);
        console.log(`page = ${page}`)
        const data = await fetchMovies(page, genreOption);
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

        <Modal
            className="bg-red-500"
            animationType="slide"
            transparent={true}
            visible={ratingScreen[0]}
            >
                <View className="absolute self-center p-5 mt-48 bg-zinc-500 rounded-xl">
                    <Text className="relative text-2xl font-bold w-full text-center truncate max-h-10 whitespace-nowrap mb-3">Review film</Text>
                    <StarRating
                        className="mb-3"
                        rating={rating}
                        onChange={setRating}
                        enableHalfStar={false}
                    />

                    <TouchableOpacity 
                        onPress={() => {
                            addRatePreference(user.uid, ratingScreen[1], ratingScreen[2], rating)
                            let num_of_Wanted = countWantedFilmsFromGenre(user.uid, 14)
                            console.log(num_of_Wanted)
                            let num_of_All = countNumberOfUsersFilms(user.uid)
                            console.log(num_of_All)
                            genres = getAllGenres()
                            let r = Math.random();
                            console.log(r.toString())
                            if(r < 1.0)
                            {
                                let genre_str = genres_array[0].toString()
                                console.log(genre_str)
                                genreOption["with_genres"] = genre_str
                            }  
                            else if(r < 2.0)
                            {
                                let genre_str = genres_array[1].toString()
                                console.log(genre_str)
                                genreOption["with_genres"] = genre_str
                            }
                            else
                            {
                                let genre_str = genres_array[2].toString()
                                console.log(genre_str)
                                genreOption["with_genres"] = genre_str
                            }
                            setRatingScreen([false, -1, -1])
                            setRating(0)
                            getMovies()
                        }}
                        className="mx-auto w-3/5 h-12 mb-4 border-solid rounded-md bg-blue-500">
                        <Text className=" text-lg my-auto text-center color-white">SUBMIT</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {
                            setRatingScreen([false, -1, -1])
                            setRating(0)
                        }}
                        className="mx-auto w-3/5 h-12 mb-4 border-solid rounded-md bg-red-500">
                        <Text className=" text-lg my-auto text-center color-white">CLOSE</Text>
                    </TouchableOpacity>
                </View>
        </Modal>


        <Swiper 
            ref={swiper => {
                this.swiper = swiper;
            }}
            containerStyle={{backgroundColor: "transparent" }}
            cards={trending}
            stackSize={1}
            animateCardOpacity
            infinite={true}

            onSwiped={(id)=>{
                console.log(`swiped, card_id = ${id} on page ${page}`);
                update_cards(id)
            }}

            onSwipedTop={async (id) => {
                navigation.navigate("sendToFriendScreen", {film: trending[id]})
            }}

            onSwipedRight={(id) => {
                addWantPreference(user.uid, trending[id].id, trending[id].genre_ids, true)
                console.log("Swiped right")
            }}

            onSwipedBottom={(id) => {
                setRatingScreen([true, trending[id].id, trending[id].genre_ids])

                this.swiper.swipeBack()
            }}

            onSwipedLeft={(id) => {
                addWantPreference(user.uid, trending[id].id, trending[id].genre_ids, false)
                console.log("Swiped left")
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