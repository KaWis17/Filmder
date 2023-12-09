import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native'

import useAuth from '../../backend/AuthProvider'
import {fallbackMoviePoster, fetchMovieDetails, fetchMovies, image500} from "../../api/moviedb";
import {getToWatchById} from "../../backend/UserQueries";

const tempURL = "https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"

async function fetchMovieDetailsList(filmIds) {
    try {
        // Use Promise.all to concurrently fetch details for all movieIds
        const movieDetailsPromises = filmIds.map((filmId) => {
            const details = fetchMovieDetails(filmId);
            console.log("details "+details)
            return details;
        });

        // Wait for all promises to resolve
        const movieDetailsList = await Promise.all(movieDetailsPromises);
        console.log(movieDetailsList);
        return movieDetailsList;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        // You may choose to handle errors here or propagate them
        throw error;
    }
}


const OtherUserWatchList = ({route, navigation}) => {
    const friendID = route.params.friendID;

    const {user} = useAuth();

    const [data, setData] = useState([]);

    useEffect(() => {
        // Your asynchronous function to fetch data
        const fetchData = async () => {
            try {
                console.log("Dane Id filmow: "+await getToWatchById(friendID))
                //console.log("zerowy:"+await fetchMovieDetails(filmIDs[0]));
                const response = await fetchMovieDetailsList((await getToWatchById(friendID)));
                console.log("response "+response);
                setData(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData().then(r => console.log(data)); // Call the function to fetch data when the component mounts
    }, []);

    const renderItem = ({item}) => (
        <View style={{alignSelf:"center"}}>
            <TouchableOpacity
                style={{margin:10,width:180,height:250}}
                onPress={() => handleBubblePress(item)}>
                <Image
                    source={{ uri: ( image500(item.poster_path) || fallbackMoviePoster) }}
                    style={{ height: 200, width:180}}
                />
                <Text style={{fontSize:15, backgroundColor: '#ccbbcc'}}>{item.title}</Text>
            </TouchableOpacity>
        </View>
    );

    const handleBubblePress = (item) => {
            navigation.navigate("modalScreen", {film: item})
    };

    return (
        <View>
            <Text style={{fontSize:30, backgroundColor: '#ccbbcc',marginTop:25,textAlign:"center"}}>🎬 Watch List 🎬</Text>
            <FlatList
                style={{marginBottom:50}}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
            />
        </View>
    )
}

export default OtherUserWatchList