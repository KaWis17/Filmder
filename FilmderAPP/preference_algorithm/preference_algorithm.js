import { getUserPreferences } from "../backend/UserQueries"


var preferences = []
var reviews = []


export async function readUserPreferencesFromDb(userID)
{
    preferences = await getUserPreferences(userID)
    console.log(preferences)
}