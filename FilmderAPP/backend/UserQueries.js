import {    collection, query, where, 
            getDocs, setDoc, getDoc, addDoc, doc, updateDoc,
            onSnapshot, orderBy, serverTimestamp } from "firebase/firestore"; 
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
 * Function to tell if user is in database, or only in authentication
 */
export async function doesUserExistInDb(userID) {

    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);

    return (docSnap.exists()) 
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
 * TODO: consider adding by non-existing email and adding yourself
 */
export async function addToFriendList(userID, friendsEmail, setFriendsEmail) {
      
    var userProfile = await getProfileById(userID)

    var friendsProfile = await getProfileByEmail(friendsEmail)

    if(friendsProfile !== undefined){
        var friendshipID = generateFriendshipID(userID, friendsProfile.uid)

        const docRef = doc(db, "friends", friendshipID);
        const docSnap = await getDoc(docRef);

        if(friendsProfile !== undefined){
            if(userProfile.first != "Name"){
                console.log("1")
                if(!docSnap.exists()){
                    setDoc(doc(db, "friends", friendshipID), {
                        lastMessage: {
                            text: "Say Hi",
                            time: new Date(),
                            sendBy: userID
                        },
                        users: {
                            [userID]: userProfile,
                            [friendsProfile.uid]: friendsProfile,
                        },
                        usersMatched: [userID, friendsProfile.uid],
                        timestamp: serverTimestamp()
                    });
                    alert("Friend has been added!")
                } else {
                    alert("Friendship already exists!")
                } 
            } else {
                alert("Firstly update your user profile!")
            }
        }
    } else {
        alert("There is no user with this email")
    }

    setFriendsEmail('')
    
}

/**
 * Function to set user friend list
 */
export function setUsersFriendList(userID, setFriends){

    onSnapshot(
        query(
            collection(db, "friends"), 
            where('usersMatched', 'array-contains', userID),
            orderBy("lastMessage.time", "desc")
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
                    user: {
                        _id: doc.data().user._id,
                        avatar: friendImageUrl
                    }
                }))
            )
        
        )
}

/**
 * Function to add a message to the chat
 */
export async function sendAMessage(GiftedChat, messages, setMessages, friendshipID, userID) {

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
    
    updateDoc(doc(db, "friends", friendshipID), {
        lastMessage: {
            text: messages[0].text,
            time: messages[0].createdAt,
            sendBy: messages[0].user._id
        }
    });
    
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
 * Function to update user preference about film
 */
export function addWantPreference(userID, filmID, doWant) {

    setDoc(doc(db, "user_preferences", userID + filmID), {
        userID: userID,
        filmID: filmID,
        doWant: doWant
    });
}

/**
 * Helper function to update the user data if 'friends' collection
 */
async function updateUserDataInFriends(userID, querySnapshot) {

    var userProfile = await getProfileById(userID)

    querySnapshot.forEach(async (document) => {

        var usersKeys = Object.keys(document.data().users)

        var friendID = (usersKeys.at(0) != userID ? usersKeys.at(0) : usersKeys.at(1))

        updateDoc(doc(db, "friends", generateFriendshipID(userID, friendID)), {
            users: {
                [userID]: userProfile,
                [friendID]: await getProfileById(friendID),
            },
            usersMatched: [userID, friendID],
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
 * Helper function to get the profile from 'users' by an email of a user
 */
async function getProfileByEmail(userEmail) {

    const q = query(collection(db, "users"), where("email", "==", userEmail));

    const querySnapshot = await getDocs(q);
    return (querySnapshot.docs[0] !== undefined) ? querySnapshot.docs[0].data() : undefined;
}  

/**
 * Helper function to generate/get valid friendship ID
 */
function generateFriendshipID(uid1, uid2) {
    
    return (uid1 > uid2 ? uid1 + uid2 : uid2 + uid1)
}