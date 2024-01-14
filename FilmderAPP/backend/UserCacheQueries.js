import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllWatchedFilmsIdsFromDb } from './UserQueries'

const WATCHED_FILM_CARDS = 'watched-cards'

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
    console.log('getWatchedCards')
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
    console.log('updateWatchedCardsIfNeeded')
    const oldCards = await AsyncStorage.getItem(WATCHED_FILM_CARDS);
    const oldCardsList = JSON.parse(oldCards);
    if (newWatchedCardIds.length != 0) {
        const allCardsList = [...oldCardsList, ...newWatchedCardIds];
        const jsonAllCards = JSON.stringify(allCardsList);
        await AsyncStorage.setItem(WATCHED_FILM_CARDS, jsonAllCards);
        return allCardsList;
    }
    else {
        return oldCardsList;
    }
}
