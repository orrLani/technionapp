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
//import Demo from "./demo";
import Checkout from './SignUpPage/Checkout'
import SignIn from './SignIn/Signin' 
import Welcome from './Welcome/Welcome.js' 

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const theme = createMuiTheme({
  direction: "rtl"
});


ReactDOM.render(
  <StylesProvider jss={jss}>
    <ThemeProvider theme={theme}>
      <Welcome/>
    </ThemeProvider>
  </StylesProvider>,
  document.querySelector("#root")
);