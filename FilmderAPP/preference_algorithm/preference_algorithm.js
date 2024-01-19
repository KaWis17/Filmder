import { getUserPreferences, getUserReviews, getUserPrefs } from "../backend/UserQueries"
import { fetchAllMovieGenres } from "../api/moviedb"


var preferences = []
var reviews = []

var genres_array = []


export async function readUserPreferencesFromDb(userID)
{
    preferences = await getUserPreferences(userID)
    reviews = await getUserReviews(userID)
    let all_genres_obj = await fetchAllMovieGenres()
    genres_array = all_genres_obj["genres"]

    for(let genre of genres_array)
    {
        genre["weight"] = 0
    }
    await count_weights()


    // console.log(reviews)
    // console.log(reviews[0]["genres"])
    // console.log(reviews[1]["rate"])
    // console.log(reviews[1]["filmID"])
    // prefs = await getUserPrefs(userID)
    // console.log(prefs)
}


async function count_weights()
{
    console.log(genres_array)
    for(let pref of preferences)
    {
        let curr_genres_list = pref["genres"].split("##").map(genre => parseInt(genre))
        let curr_want = pref["doWant"]
        console.log(curr_genres_list)
        for(let genreID of curr_genres_list)
        {
            for(let genreObj of genres_array)
            {
                if(genreObj["id"] == genreID)
                {
                    if(curr_want == true)
                    {
                        genreObj["weight"] = genreObj["weight"] + 1
                        console.log("True")
                    }
                    else if(genreObj["id"] == false)
                    {
                        genreObj["weight"] = max(genreObj["weight"]-1, 0)
                        console.log("False")
                    }
                    break;
                }
            }
        }
    }
    console.log(genres_array)

    for(let review of reviews)
    {
        let curr_genres_list = review["genres"].split("##").map(genre => parseInt(genre))
        let currRate = review["rate"]
        console.log(curr_genres_list)
        for(let genreID of curr_genres_list)
        {
            for(let genreObj of genres_array)
            {
                if(genreObj["id"] == genreID)
                {
                    console.log(genreObj["weight"])
                    console.log(genreID)
                    console.log(currRate)
                    if(currRate < 3)
                    {
                        console.log(genreObj["weight"])
                        if(genreObj["weight"] - 1 < 0)
                        {
                            genreObj["weight"] = 0
                        }
                        else
                        {
                            genreObj["weight"] = genreObj["weight"] - 1
                        }
                        // genreObj["weight"] = max(genreObj["weight"]-1, 0)//???
                    }
                    else if(currRate > 3)
                    {
                        console.log(genreObj["weight"])
                        genreObj["weight"] = genreObj["weight"] + 1
                    }
                    break;
                }
            }
        }
    }
    console.log(genres_array)
}