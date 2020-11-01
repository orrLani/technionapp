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

const provider = new firebase.auth.OAuthProvider('microsoft.com')

provider.setCustomParameters({
    // Optional "tenant" parameter in case you are using an Azure AD tenant.
    // eg. '8eaef023-2b34-4da1-9baa-8bc8c9d6a490' or 'contoso.onmicrosoft.com'
    // or "common" for tenant-independent tokens.
    // The default value is "common".
    tenant: 'f1502c4c-ee2e-411c-9715-c855f6753b84'
  });
  

export {provider} 

const db = firebaseApp.firestore()
export {db}
export default firebaseApp;