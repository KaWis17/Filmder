import AsyncStorage from '@react-native-async-storage/async-storage';


const GENRE_STATS = 'genre-stats'


/**
 * This function retorns read weight of passed genre 
 * @param genreID from database
 * @param {*} genreID passed genre
 * @returns  weight of genre
 */
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


/**
 * This functions returns weight of all genres
 * read from database
 * @returns weight of all genres
 */
export const getWeightsOfGenres = async () => {
    let genres_str = await AsyncStorage.getItem(GENRE_STATS)
    let genres_array = JSON.parse(genres_str)
    return genres_array
}


/**
 * This function increment weight of passed genre @param genreID
 * by passed value @param increment and stores it in cache
 * @param {*} genreID passed genre
 * @param {*} increment value
 * @returns updated weight of genre
 */
export const incrementWeightOfGenre = async (genreID, increment) => {
    let genres_str = await AsyncStorage.getItem(GENRE_STATS)
    let genres_array = JSON.parse(genres_str)
    let newWeight = 0
    let hasChanged = false
    for(let curr_genre of genres_array)
    {
        if(curr_genre["genreID"] == genreID)
        {
            newWeight = curr_genre["weight"] + increment
            curr_genre["weight"] = newWeight
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
    }
    const jsonValue = JSON.stringify(genres_array);
    await AsyncStorage.setItem(GENRE_STATS, jsonValue);
    return newWeight
}


/**
 * This function decrement weight of passed genre @param genreID
 * by passed value @param decrement and stores it in cache
 * @param {*} genreID passed genre
 * @param {*} decrement value
 * @returns updated weight of genre
 */
export const decrementWeightOfGenre = async (genreID, decrement) => {
    let genres_str = await AsyncStorage.getItem(GENRE_STATS)
    let genres_array = JSON.parse(genres_str)
    let newWeight = 0
    let hasChanged = false
    for(let curr_genre of genres_array)
    {
        if(curr_genre["genreID"] == genreID)
        {
            // newWeight = max(curr_genre["weight"] - decrement, 0)
            newWeight = curr_genre["weight"] - decrement
            newWeight = newWeight >= 0 ? newWeight : 0
            curr_genre["weight"] = newWeight
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
    }
    const jsonValue = JSON.stringify(genres_array);
    await AsyncStorage.setItem(GENRE_STATS, jsonValue);
    return newWeight
}
