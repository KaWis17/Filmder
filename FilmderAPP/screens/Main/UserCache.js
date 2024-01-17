import React, { useEffect } from 'react'
import useAuth from '../../backend/AuthProvider'
import { saveWatchedCards, clearWatchedCards } from '../../backend/UserCacheQueries'

const FilmCache = ({
    setSavedCards
}) => {
    const { user } =  useAuth();

    useEffect(() => {
        fetchData();
        return () => {
            clearWatchedCards();
            console.log('delete data')
        }
    }, [])

    const fetchData = async () => {
        setSavedCards(await saveWatchedCards(user));
    }

    return (
        <></>
    )
}

export default FilmCache