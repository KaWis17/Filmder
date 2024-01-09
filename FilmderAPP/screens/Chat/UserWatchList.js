import React, {useEffect, useState} from 'react';
import {BackHandler, FlatList, Image, Text, TouchableOpacity, View} from 'react-native'

import useAuth from '../../backend/AuthProvider'
import {fallbackMoviePoster, fetchMovieDetails, image500} from "../../api/moviedb";
import {getToWatchById} from "../../backend/UserQueries";


/** returns list of movie details based on given film ids
 * @param filmIds list of movie ids to fetch
 * */
async function fetchMovieDetailsList(filmIds) {
    try {
        const movieDetailsPromises = filmIds.map((filmId) => {
            return fetchMovieDetails(filmId);
        });
        return await Promise.all(movieDetailsPromises);
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
}

/** View for users watchlist */
const UserWatchList = ({route, navigation}) => {
    const friendID = route.params.friendID;

    const {user} = useAuth();

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchMovieDetailsList((await getToWatchById(friendID)));
                setData(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData().then();
    }, []);

    /** Navigation to details screen */
    const handleMoviePress = (item) => {
        navigation.navigate("modalScreen", {film: item})
    };

    /** View for movie icon */
    const renderItem = ({item}) => (
        <View style={{alignSelf:"center"}}>
            <TouchableOpacity
                style={{margin:10,width:180,height:250}}
                onPress={() => handleMoviePress(item)}>
                <Image
                    source={{ uri: ( image500(item.poster_path) || fallbackMoviePoster) }}
                    style={{ height: 200, width:180}}
                />
                <Text style={{fontSize:15, backgroundColor: '#ccbbcc'}}>{item.title}</Text>
            </TouchableOpacity>
        </View>
    );

    /** View for users watchlist */
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

export default UserWatchList