/**
 * @module backend
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllWatchedFilmsIdsFromDb, getUserPreferencesFromDb } from './UserQueries'

const WATCHED_FILM_CARDS = 'watched-cards'
const GENRE_STATS = 'genre-stats'

/**
 * This function gets all ids of films that where earlier showed on SwiperScreen
 * and store them in @param WATCHED_FILM_CARDS
 */
export const saveWatchedCards = async (user) => {
    const value = await getAllWatchedFilmsIdsFromDb(user.uid)
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(WATCHED_FILM_CARDS, jsonValue);
    return true;
}

/**
 * @returns @param WATCHED_FILM_CARDS from cache
 */
export const getWatchedCards = async () => {
    const cards = await AsyncStorage.getItem(WATCHED_FILM_CARDS);
    return JSON.parse(cards);
}

/**
 * This function clears cache (@param WATCHED_FILM_CARDS) when closing an app.
 */
export const clearWatchedCards = async () => {
    await AsyncStorage.removeItem(WATCHED_FILM_CARDS);
}

/**
 * This function updates @param WATCHED_FILM_CARDS while swiping cards in SwipingScreen 
 * @returns updated list of showed film ids.
 */
export const updateWatchedCardsIfNeeded = async (newWatchedCardIds) => {
    const oldCards = await AsyncStorage.getItem(WATCHED_FILM_CARDS);
    const oldCardsList = JSON.parse(oldCards);
    if (typeof(newWatchedCardIds) === undefined || newWatchedCardIds.length == 0) {
        return oldCardsList;
    }
    else {
        const allCardsList = [...oldCardsList, ...newWatchedCardIds];
        const jsonAllCards = JSON.stringify(allCardsList);
        await AsyncStorage.setItem(WATCHED_FILM_CARDS, jsonAllCards);
        return allCardsList;
    }
}


/**
 * This function gets all genres weights from database
 * and stores it in cache
 */
export const saveGenreStats = async (user) => {
    const value = await getUserPreferencesFromDb(user.uid)
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(GENRE_STATS, jsonValue);
    return true;
}
