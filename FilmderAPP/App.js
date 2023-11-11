import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from "react/cjs/react.development"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from './FirebaseConfig';


export default function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function signIn(){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert("Logged in")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("not logged")
    });
  }

  function signUp(){
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        alert('created user')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        // ..
    });
  }

  return (
    <View style={styles.container}>
      <Text>Firebase auth!</Text>
      <StatusBar style="auto" />
      <TextInput placeholder='Email' value={email} onChangeText={(Text) => {setEmail(Text)}}></TextInput>
      <TextInput placeholder='Password' value={password} onChangeText={(Text) => {setPassword(Text)}}></TextInput>
      <Button title="signIn" onPress={signIn}/>
      <Button title="signUp" onPress={signUp}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
