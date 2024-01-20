import { getUserPreferences, getUserReviews, getUserPrefs } from "../backend/UserQueries"
import { fetchAllMovieGenres } from "../api/moviedb"


var preferences = []
var reviews = []

var genres_array = []
var sum_weights = 0
var distribution_array = []

var trendingOptions = {
    "with_original_language": 'pl', "year": 2024
}

var userOptions = {}



export async function readUserPreferencesFromDb(userID)
{
    preferences = await getUserPreferences(userID)
    reviews = await getUserReviews(userID)
    let all_genres_obj = await fetchAllMovieGenres()
    genres_array = all_genres_obj["genres"]
    distribution_array = new Array(genres_array.length).fill(0)

    for(let genre of genres_array)
    {
        genre["weight"] = 0
    }
    await count_weights()
    // await count_distribution()

    // console.log(reviews)
    // console.log(reviews[0]["genres"])
    // console.log(reviews[1]["rate"])
    // console.log(reviews[1]["filmID"])
    // prefs = await getUserPrefs(userID)
    // console.log(prefs)
}


async function count_weights()
{
    // console.log(genres_array)
    for(let pref of preferences)
    {
        let curr_genres_list = pref["genres"].split("##").map(genre => parseInt(genre))
        let curr_want = pref["doWant"]
        // console.log(curr_genres_list)
        for(let genreID of curr_genres_list)
        {
            for(let genreObj of genres_array)
            {
                if(genreObj["id"] == genreID)
                {
                    if(curr_want == true)
                    {
                        genreObj["weight"] = genreObj["weight"] + 1
                        // console.log("True")
                    }
                    else if(genreObj["id"] == false)
                    {
                        genreObj["weight"] = max(genreObj["weight"]-1, 0)
                        // console.log("False")
                    }
                    break;
                }
            }
        }
    }
    // console.log(genres_array)

    for(let review of reviews)
    {
        let curr_genres_list = review["genres"].split("##").map(genre => parseInt(genre))
        let currRate = review["rate"]
        // console.log(curr_genres_list)
        for(let genreID of curr_genres_list)
        {
            for(let genreObj of genres_array)
            {
                if(genreObj["id"] == genreID)
                {
                    // console.log(genreObj["weight"])
                    // console.log(genreID)
                    // console.log(currRate)
                    if(currRate < 3)
                    {
                        // console.log(genreObj["weight"])
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
                    else if(currRate == 4)
                    {
                        // console.log(genreObj["weight"])
                        genreObj["weight"] = genreObj["weight"] + 1
                    }
                    else if(currRate == 5)
                    {
                        // console.log(genreObj["weight"])
                        genreObj["weight"] = genreObj["weight"] + 2
                    }
                    break;
                }
            }
        }
    }
    // console.log(genres_array)
    // for(let genre of genres_array)
    // {
    //     sum_weights += genre["weight"]
    // }
    // console.log(sum_weights)
}


async function sumOfWeights()
{
    sum_weights = 0
    for(let genre of genres_array)
    {
        sum_weights += genre["weight"]
    }
}


async function count_distribution()
{
    // let s_weights = await sumOfWeights()
    // console.log("sum:")
    // console.log(s_weights)
    await sumOfWeights()
    if(sum_weights > 0)
    {
        for(let i = 0; i < genres_array.length; i++)
        {
            let genre_weight = genres_array[i]["weight"]
            distribution_array[i] = genre_weight/sum_weights
        }
        // console.log(distribution_array)
    }
   
}


// export async function chooseKindOfApiQuery()
// {
//     console.log(distribution_array)
//     if(sum_weights == 0)
//     {
//         return trendingOptions
//     }
//     let r = Math.random() * sum_weights
//     console.log(typeof(r))
//     console.log(r.toString())

//     let curr = 0;
//     let idx = 0;
//     while(curr + distribution_array[idx] < r)
//     {
//         curr += distribution_array[idx]
//         idx++
//     }
//     if(idx < genres_array.length)
//     {
//         console.log(typeof(idx))
//         console.log(idx.toString())
//         let genre_str = genres_array[idx]["id"]
//         console.log(genre_str)
//         console.log(genres_array["name"])
//         userOptions["with_genres"] = genre_str
//         return userOptions
//     }
//     else
//     {
//         return trendingOptions
//     }
// }