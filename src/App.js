import React from "react";
import "./App.css";
import Welcome from './Welcome/Welcome'
import Learn from './Learn.js'
import PopUpVerify from './SignUpPage/PopUpVerify'
import {AuthProvider} from './server/Auth'
import PrivateRoute from "./PrivateRoute";
import {BrowserRouter as Router, Route} from "react-router-dom"
import { RouterOutlined } from "@material-ui/icons";
import SignInSide from "./SignIn/Signin"
import { Prompt } from 'react-router'
import Chatpage from "./chatpage/Chatpage"

function App() {

  const uid =  localStorage.getItem('uid')!==undefined?localStorage.getItem('uid'):null;
 
  return (
    <AuthProvider>
      <Router>
    <div className="app">
   <div className="app__body">
    
      
      <Route exact path="/" component={SignInSide} />
      <Route exact path="/signup" component={Learn} />
      <Route exact path="/popupverify" component={PopUpVerify} />
      <Route path="/signin" component ={SignInSide}  />
      <Route exact path="/welcome" component ={Welcome} /> 
      <Route exact path="/chatpage" component ={Chatpage} /> 
     
      
     </div>
    </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
