// import React from 'react';
// import ReactDOM from 'react-dom';
// //import {SignUp} from './SignUp'
// import './index.css';
// import App from './App';
// import rtl from "jss-rtl"
// import {create} from "jss"
// import {
//   StylesProvider,
//   jssPreset,
//   ThemeProvider,
//   createMuiTheme
// } from "@material-ui/core/styles";
// //imoprt my file
// import Checkout from './SignUpPage/Checkout'
// import * as serviceWorker from './serviceWorker';

// //Configure jss
// const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// const rtlTheme = createMuiTheme({ direction: "rtl" });
// ReactDOM.render(
//   // call to my page
//   <React.StrictMode>
//     <StylesProvider jss={jss}>
//    <Checkout/>
//    </StylesProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();



import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { StylesProvider, ThemeProvider, jssPreset } from "@material-ui/styles";
import { create } from "jss";
import rtl from "jss-rtl";
//import * as firebase from 'firebase'
import App from './App'





const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const theme = createMuiTheme({
  direction: "rtl"
});


// ReactDOM.render(
//   <StylesProvider jss={jss}>
//     <script src="https://www.gstatic.com/firebasejs/3.1.0/firebase.js"></script>
//     <script src="https://www.gstatic.com/firebasejs/3.1.0/firebase-database.js"></script>
//     <script src="https://www.gstatic.com/firebasejs/5.9.3/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/5.9.3/firebase-auth.js"></script>
// <script src="https://www.gstatic.com/firebasejs/5.9.3/firebase-database.js"></script>
// <script src="/__/firebase/7.21.1/firebase-app.js"></script>
// <script src="/__/firebase/7.21.1/firebase-analytics.js"></script>
// <script src="/__/firebase/7.21.1/firebase-auth.js"></script>
// <script src="/__/firebase/7.21.1/firebase-firestore.js"></script>

//     <ThemeProvider theme={theme}>
//       <App/>
//     </ThemeProvider>
//   </StylesProvider>,
//   document.querySelector("#root")
// );

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)