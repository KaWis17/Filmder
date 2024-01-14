import axios from 'axios';
import {apiKey, apiBaseUrl} from '../constants/index';
export const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
export const parameterizedEndpoint = `${apiBaseUrl}/discover/movie?`;
export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const image500 = path => path ? 'https://image.tmdb.org/t/p/w500'+ path : null;
const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieGenreEndpoint = () => `${apiBaseUrl}/genre/movie/list?api_key=${apiKey}`;


const injectParametersIntoUrl = (url, params) => (
    params ? 
    (url.concat('', Object.keys(params)
        .map((param) => `&${param}=${String(params[param]).replaceAll(',','%2C').replaceAll('|', '%7C')}`)
        .join('')))
    : url
)

const apiCall = async (endpoint, params)=>{
    var urlWithParams = injectParametersIntoUrl(endpoint, params);
    console.log(urlWithParams);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            // Authorization by token is needed for getting films with parameters.
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTA2YmZmZDNiYjczNjVlODZmNGQyMTYyNmQzNDM3MSIsInN1YiI6IjY1NTJhNWRkZDRmZTA0MDBlMWIxYzY4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hRSO88_x0CLMI32hVnNRmqd58Td5mtHjSzkbPfFuHz8',
        },
        url: urlWithParams
    }

    try {
        const response = await axios.request(options);
        return response.data;
    }catch(error){
        console.log('error', error);
        return{}
    }
}

/**
 * This function returns json which contains one page of films from API (19 films without possability to get more than 19 at once).
 * Function returns filtered and sorted films due to options in variable {params}.
 * If {params} is undefined then function returns films from the list of trending movies of the day.
 * Check this for more filters and sort options https://developer.themoviedb.org/reference/movie-details.
 */
export const fetchMovies = (page, params)=>(
    params ? 
    apiCall(`${parameterizedEndpoint}&page=${page}`, params)
    :
    apiCall(`${trendingMoviesEndpoint}&page=${page}`)
)

/**
 * This function returns extended information about a film by its id e.g. tagline, budget, spoken_languages.
 * Check this for more details https://developer.themoviedb.org/reference/movie-details
 */
export const fetchMovieDetails = (id)=>{
    return apiCall(movieDetailsEndpoint(id));
}

/**
 * This function returns json with ALL pairs of genre_id and genre e.g.
 *    {
 *   "id": 35,
 *   "name": "Comedy"
 *   },
 * 
 * Check this for more details https://developer.themoviedb.org/reference/genre-movie-list
 */
export const fetchAllMovieGenres = ()=>{
    return apiCall(movieGenreEndpoint());
}