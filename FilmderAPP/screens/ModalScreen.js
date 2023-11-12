import { View, Text, Image } from 'react-native'
import React from 'react'
import { DummyData } from '../temporary/cards';


const ModalScreen = ({route, navigation}) => {
    const id = route.params.id;
    return (
        <View>
            <Text>
                Title: {DummyData[id].title}
            </Text>

            <Text>
                Year: {DummyData[id].year}
            </Text>

            <Text>
                Runtime: {DummyData[id].runtime}
            </Text>

            <Text>
                Genres: {DummyData[id].genres.toString()}
            </Text>

            <Text>
                Director: {DummyData[id].director}
            </Text>

            <Text>
                Actors: {DummyData[id].actors.toString()}
            </Text>

            <Text>
                Plot: {DummyData[id].plot}
            </Text>

            <Image 
                className="h-full w-full rounded-xl"
                source={{ uri: DummyData[id].posterUrl }}
            />
        </View>
    )
}

export default ModalScreen