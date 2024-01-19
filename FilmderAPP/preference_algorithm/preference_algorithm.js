import { getUserPreferences, getUserReviews } from "../backend/UserQueries"


var preferences = []
var reviews = []


export async function readUserPreferencesFromDb(userID)
{
    preferences = await getUserPreferences(userID)
    reviews = await getUserReviews(userID)
    console.log(reviews)
    console.log(reviews[0]["genres"])
    console.log(reviews[1]["rate"])
    console.log(reviews[1]["filmID"])
}