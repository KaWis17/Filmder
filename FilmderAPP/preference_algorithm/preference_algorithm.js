import { getWeightsOfGenres } from "../backend/UserCacheGenres"

var genres_array = []
var sum_weights = 0
var distribution_array = []


var exampleOptions = {}


/**
 * This function counts sum of all genres weights
 * @returns sum of genres weights
 */
async function sumOfWeights()
{
    sum_weights = 0
    for(let genre of genres_array)
    {
        sum_weights += genre["weight"]
    }
    return sum_weights
}


/**
 * This function counts genres distribution
 * according to genres weights
 */
async function count_distribution()
{
    genres_array = await getWeightsOfGenres()
    console.log(genres_array)
    let s_weights = await sumOfWeights()
    console.log("sum:")
    console.log(s_weights)
    // await sumOfWeights()
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

/**
 * This function returns kind of api query
 * accroding to counted distribution
 * @returns params of chosen api query
 */
export async function chooseKindOfApiQuery()
{
    console.log("algorithm1")
    await count_distribution()
    console.log(distribution_array)
    if(sum_weights < 20)
    {
        return undefined
    }
    let r = Math.random()
    console.log(r.toString())

    let curr = 0;
    let idx = 0;
    while(curr + distribution_array[idx] < r)
    {
        curr += distribution_array[idx]
        idx++
    }
    if(idx < genres_array.length)
    {
        console.log(idx)
        console.log(genres_array[idx])
        let genre_str = genres_array[idx]["genreID"]
        console.log(genre_str)
        exampleOptions["with_genres"] = genre_str
        return exampleOptions
    }
    else
    {
        return undefined
    }
}









