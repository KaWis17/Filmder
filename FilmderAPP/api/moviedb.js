import axios from 'axios';

// const apiKey = '7a06bffd3bb7365e86f4d21626d34371';
// const apiBaseUrl = 'https://api.themoviedb.org/3';
export const trendingMoviesEndpoint = 'https://api.themoviedb.org/3/trending/movie/day?api_key=7a06bffd3bb7365e86f4d21626d34371';
export const image500 = path => path ? 'https://image.tmdb.org/t/p/w500'+ path : null;
export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';

const apiCall = async (endpoint, params)=>{
    const options = {
        method: 'GET',
        url: endpoint,
        param: params? params: {}
    }

    try {
        const response = await axios.request(options);
        return response.data;
    }catch(error){
        console.log('error', error);
        return{}
    }
}

export const fetchMovies = ()=>{
    return apiCall(trendingMoviesEndpoint)
}
