import {    collection, query, where, 
            getDocs, setDoc, addDoc, doc, 
            serverTimestamp, onSnapshot, 
            orderBy } from "firebase/firestore"; 
import * as ImagePicker from "expo-image-picker";
            
import { db, st } from "./FirebaseConnection"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

/**
 * Function to set user data
 */
export function setUserData (userID, setFirst, setLast, setAge, setImageUrl, setTimestamp) {

    onSnapshot(
        query(
            collection(db, "users"), 
            where('uid', '==', userID)
        ), 
        (snapshot) => {
            setFirst(snapshot.docs[0].data().first)
            setLast(snapshot.docs[0].data().last)
            setAge(snapshot.docs[0].data().born)
            setTimestamp(snapshot.docs[0].data().timestamp)
            if(snapshot.docs[0].data().imageUrl !== undefined)
                setImageUrl(snapshot.docs[0].data().imageUrl)
        }
    )
}

/**
 * Function to update user data in the 'users' collection,
 * it also runs a function to update user data in all 'friends' collections 
 */
export async function updateUserData(userID, userEmail, first, last, age, imageUrl, timestamp) {
    
    setDoc(doc(db, "users", userID), {
        uid: userID,
        email: userEmail,
        first: first,
        last: last,
        born: age,
        imageUrl: imageUrl,
        timestamp: timestamp
    });

    const q = query(
        collection(db, "friends"), 
        where('usersMatched', 'array-contains', userID)
    )

    updateUserDataInFriends(userID, await getDocs(q))
    alert("Profile has been successfully updated!")
}

/**
 * Function to add a friend to a 'friends' collection
 */
export async function addToFriendList(userID, friendID) {

    var userProfile = await getProfileById(userID)
    var friendsProfile = await getProfileById(friendID)
   
    setDoc(doc(db, "friends", generateFriendshipID(userID, friendID)), {
        users: {
            [userID]: userProfile,
            [friendID]: friendsProfile,
        },
        usersMatched: [userID, friendID],
        timestamp: serverTimestamp()
    });
}

/**
 * Function to set user friend list
 */
export function setUsersFriendList(userID, setFriends){

    onSnapshot(
        query(
            collection(db, "friends"), 
            where('usersMatched', 'array-contains', userID)
        ), 
        (snapshot) =>  {
            setFriends(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            )
        }
    )
} 

/**
 * Function to get the friend object from a list of a friend and the user
 */
export function getFriendFromFriendsList(list, userID) {
    var key = (list[Object.keys(list)[0]].uid == userID) ? 1 : 0;
    return list[Object.keys(list)[key]]
}

/**
 * Function to set the messages 
 */
export function setMessagesFromChat(friendshipID, setMessages, friendImageUrl) {

    onSnapshot(
        query(
            collection(db, "friends", friendshipID, "messages"), 
            orderBy('createdAt', 'desc')
        ), 
        (snapshot) =>  
            setMessages(
                snapshot.docs.map((doc) => ({
                    _id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt.toDate(),
                    avatar: friendImageUrl
                }))
            )
        )
}

/**
 * Function to add a message to the chat
 */
export function sendAMessage(GiftedChat, messages, setMessages, friendshipID, userID) {

    setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
    )

    addDoc(collection(db, "friends", friendshipID, "messages"), {
        text: messages[0].text,
        user: {
            _id: userID,
        },
        createdAt: new Date(),
    })
}

/**
 * Function to change user avatar
 */
export async function uploadProfilePhoto(userID, userEmail, first, last, age, timestamp) {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1
    });

    if(!result.canceled){
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();

        const storageRef = ref(st, "profilePictures/" + userID)
        const uploadTask = uploadBytesResumable(storageRef, blob)

        await uploadTask
        var photoUrl = await getDownloadURL(uploadTask.snapshot.ref)

        updateUserData(userID, userEmail, first, last, age, photoUrl, timestamp);
    }
}

/**
 * Helper function to update the user data if 'friends' collection
 */
async function updateUserDataInFriends(userID, querySnapshot) {

    var userProfile = await getProfileById(userID)

    querySnapshot.forEach(async (document) => {

        var usersKeys = Object.keys(document.data().users)

        var friendID = (usersKeys.at(0) != userID ? usersKeys.at(0) : usersKeys.at(1))
                    
        setDoc(doc(db, "friends", generateFriendshipID(userID, friendID)), {
            users: {
                [userID]: userProfile,
                [friendID]: await getProfileById(friendID),
            },
            usersMatched: [userID, friendID],
            timestamp: document.data().timestamp
        });
        
    });
}

/**
 * Helper function to get the profile from 'users' by the ID of a user
 */
async function getProfileById(userID) {
    const q = query(collection(db, "users"), where("uid", "==", userID));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data()
}  

/**
 * Helper function to generate/get valid friendship ID
 */
function generateFriendshipID(uid1, uid2) {
    return (uid1 > uid2 ? uid1 + uid2 : uid2 + uid1)
}