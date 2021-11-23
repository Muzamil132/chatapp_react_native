import firebase from "firebase";
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvS2Iv7cc4oF_PCpqXmew6NxFR8J_ZgoE",
  authDomain: "mybook-e1b6f.firebaseapp.com",
  databaseURL: "https://mybook-e1b6f-default-rtdb.firebaseio.com",
  projectId: "mybook-e1b6f",
  storageBucket: "mybook-e1b6f.appspot.com",
  messagingSenderId: "690880426218",
  appId: "1:690880426218:web:a4614fb0eca0adc810a793",
  measurementId: "G-T97P6LP933",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
export var auth = firebase.auth();
export var googleProvider = new firebase.auth.GoogleAuthProvider();
// var facebookProvider = new firebase.auth.FacebookAuthProvider();

export default db;
