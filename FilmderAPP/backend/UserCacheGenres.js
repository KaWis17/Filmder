import AsyncStorage from '@react-native-async-storage/async-storage';


const GENRE_STATS = 'genre-stats'


export const getWeightOfGenre = async (genreID) => {
    let genres_str = await AsyncStorage.getItem(GENRE_STATS)
    let genres_array = JSON.parse(genres_str)
    let genre_weight = 0
    for(let curr_genre of genres_array)
    {
        if(curr_genre["genreID"] == genreID)
        {
            genre_weight = curr_genre["weight"]
            break
        }
    }
    return genre_weight
}


export const getWeightsOfGenres = async () => {
    let genres_str = await AsyncStorage.getItem(GENRE_STATS)
    let genres_array = JSON.parse(genres_str)
    return genres_array
}



export const incrementWeightOfGenre = async (genreID, increment) => {
    let genres_str = await AsyncStorage.getItem(GENRE_STATS)
    let genres_array = JSON.parse(genres_str)
    let newWeight = 0
    let hasChanged = false
    for(let curr_genre of genres_array)
    {
        if(curr_genre["genreID"] == genreID)
        {
            console.log(curr_genre["weight"])
            newWeight = curr_genre["weight"] + increment
            curr_genre["weight"] = newWeight
            console.log(curr_genre["weight"])
            hasChanged = true
            break
        }
    }
    if(!hasChanged)
    {
        let newGenre = {
            "genreID":  genreID,
            "weight":   increment,
        }
        genres_array.push(newGenre)
        console.log(increment)
    }
    const jsonValue = JSON.stringify(genres_array);
    console.log(jsonValue)
    await AsyncStorage.setItem(GENRE_STATS, jsonValue);
    return newWeight
}


export const decrementWeightOfGenre = async (genreID, decrement) => {
    let genres_str = await AsyncStorage.getItem(GENRE_STATS)
    let genres_array = JSON.parse(genres_str)
    let newWeight = 0
    let hasChanged = false
    for(let curr_genre of genres_array)
    {
        if(curr_genre["genreID"] == genreID)
        {
            console.log(curr_genre["weight"])
            // newWeight = max(curr_genre["weight"] - decrement, 0)
            newWeight = curr_genre["weight"] - decrement
            newWeight = newWeight >= 0 ? newWeight : 0
            curr_genre["weight"] = newWeight
            console.log(curr_genre["weight"])
            hasChanged = true
            break
        }
    }
    if(!hasChanged)
    {
        let newGenre = {
            "genreID":  genreID,
            "weight":   0,
        }
        genres_array.push(newGenre)
        console.log(0)
    }
    const jsonValue = JSON.stringify(genres_array);
    console.log(jsonValue)
    await AsyncStorage.setItem(GENRE_STATS, jsonValue);
    return newWeight
}
