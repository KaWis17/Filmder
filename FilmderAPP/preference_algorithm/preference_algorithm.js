import { getUserPreferences } from "../backend/UserQueries"


export async function getUserFilmsFromDb(userID)
{
    preferences = getUserPreferences(userID)
    console.log(typeof(preferences))
    console.log(typeof(preferences[0]))
    console.log(JSON.stringify(preferences[0]))
    // preferences.forEach((filmObj) => {
    //     console.log(JSON.stringify(filmObj))
    // });
}