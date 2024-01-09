/**
 * @module screens
 */
import React from 'react';
import { View, Text, LinearGradient, ScrollView, ImageBackground } from 'react-native';

import { image500, fallbackMoviePoster } from '../../api/moviedb';

const ModalScreen = ({ route, navigation }) => {

  /**
   * TODO: Pawle zrób proszę dokumentację, jeśli uważasz, że jest potrzebna
   */
  
  const film = route.params.film;
  console.log(film)

  return (
    <ScrollView>
        <ImageBackground className="h-96" source={{uri: image500(film.poster_path) || fallbackMoviePoster}} resizeMode="cover">
            <View className="mt-80 h-16 bg-black order-dotted border-2 border-white">
                <Text className="px-10 m-auto text-4xl text-white font-semibold">{film.title}</Text>
            </View>
        </ImageBackground>
        <View className="px-5 pt-5 min-h-full mix-blend-multiply bg-black mb-16">
            <Text className="text-justify text-white text-lg mb-10">{film.overview}</Text>
            <InfoItem label="Vote average" value={film.vote_average} />
            <InfoItem label="Vote count" value={film.vote_count} />
            <InfoItem label="Release date" value={film.release_date} />
            <InfoItem label="Popularity" value={film.popularity} />
        </View>
        
    </ScrollView>
  );
};

const InfoItem = ({ label, value }) => (
    <View style={{ marginBottom: 12 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>{label}:</Text>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{value}</Text>
    </View>
);

export default ModalScreen;