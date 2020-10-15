//import * as firebase from "firebase/app";
//import "firebase/auth";
import firebase from 'firebase'


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBdxiO2unFysdLywxLOhWt2ZVpGQVkW5Os",
    authDomain: "techchat-86696.firebaseapp.com",
    databaseURL: "https://techchat-86696.firebaseio.com",
    projectId: "techchat-86696",
    storageBucket: "techchat-86696.appspot.com",
    messagingSenderId: "517224744870",
    appId: "1:517224744870:web:62ba3b2a81d352ef753167",
    measurementId: "G-6W6E2HBSFJ"
});

const db = firebaseApp.firestore()
export {db}
export default firebaseApp;