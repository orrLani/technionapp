import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyDLq97JJZ-I8IfseGlgM7cPKiWXHuPbtTw",
    authDomain: "course-chat-4b2ec.firebaseapp.com",
    databaseURL: "https://course-chat-4b2ec.firebaseio.com",
    projectId: "course-chat-4b2ec",
    storageBucket: "course-chat-4b2ec.appspot.com",
    messagingSenderId: "501765050631",
    appId: "1:501765050631:web:32a1d0dd2a6453ec01b5a2",
    measurementId: "G-VS1MVGY2SN"
});

export default app;