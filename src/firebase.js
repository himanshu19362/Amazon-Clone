import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxqHJIjSpj5ulW0wn3wFxXEGaqC4F9W7o",
  authDomain: "clone-6f8d5.firebaseapp.com",
  projectId: "clone-6f8d5",
  storageBucket: "clone-6f8d5.appspot.com",
  messagingSenderId: "747936752684",
  appId: "1:747936752684:web:4e6f16d883b9b4652add89",
  measurementId: "G-LM9Y63R6K6",
};

//Initializes a firebase app 
const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebaseApp.auth()

export { db , auth }