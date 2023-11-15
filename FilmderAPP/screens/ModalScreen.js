import React, { useEffect, useState} from 'react'
import { View, Text, Image, ScrollView } from 'react-native';
import {fetchMovieDetails, image500, fallbackMoviePoster } from '../api/moviedb';
import { basicMovie } from '../constants/index'

const ModalScreen = ({ route, navigation }) => {
    const id = route.params.id;
    const [movie, setMovie] = useState([basicMovie]);

    useEffect(()=>{
        getMovieDetails(id);
    },[]); 

    const getMovieDetails = async id=>{
        const details = await fetchMovieDetails(id);
        if(details) {
            setMovie({...movie, ...details});
        }
    }

    return (
    <ScrollView style={{ padding: 16 }}>
        <Image
        style={{ height: 200, width: '50%', borderRadius: 8, marginTop: 16, marginBottom: 16 }}
        source={{ uri: image500(movie.poster_path)}}
        />

        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>{movie.title}</Text>

        <InfoItem label="Year" value={movie.year} />    
        <InfoItem label="Runtime" value={`${movie.runtime} minutes`} />
        {/* <InfoItem label="Genres" value={movie.genres.join(', ')} /> */}
        <InfoItem label="Director" value={movie.director} />
        <InfoItem label="Actors" value={movie.actors} />
        <InfoItem label="Plot" value={movie.overview} /> 
    </ScrollView>
    );
};

const InfoItem = ({ label, value }) => (
  <View style={{ marginBottom: 8 }}>
    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{label}:</Text>
    <Text style={{ fontSize: 16 }}>{value}</Text>
  </View>
);

export default ModalScreen;