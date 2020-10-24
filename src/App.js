import React from "react";
import "./App.css";
import Welcome from './Welcome/Welcome'
import Signup from './SignUpPage/signup'
import PopUpVerify from './SignUpPage/PopUpVerify'
import {AuthProvider} from './server/Auth'
import PrivateRoute from "./PrivateRoute";
import {BrowserRouter as Router, Route} from "react-router-dom"
import { RouterOutlined } from "@material-ui/icons";
import SignInSide from "./SignIn/Signin"
import { Prompt } from 'react-router'
import Chatpage from "./chatpage/Chatpage"
import NewSignUp from "./SignUpPage/signup"
import Closed from './Closed'
import {ChatProvider} from './server/ChatProvider'


function App() {

  const uid =  localStorage.getItem('uid')!==undefined?localStorage.getItem('uid'):null;
 
  return (
    <ChatProvider>
    <AuthProvider>
      <Router>
    <div className="app">
   <div className="app__body">
    
      
      <Route exact path="/" component={Closed} />
      {/* <Route exact path="/" component={Welcome} /> */}
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/popupverify" component={PopUpVerify} />
      <Route path="/signin" component ={SignInSide}  />
      <Route exact path="/welcome" component ={Welcome} /> 
      <Route exact path="/chatpage" component ={Chatpage} /> 
     
      
     </div>
    </div>
      </Router>
    </AuthProvider>
    </ChatProvider>
  );
}

export default App;
