import React from "react";
import Welcome from './WelcomePage/Welcome'
import Signup from './SignUpPage/signup'
import PopUpVerify from './SignUpPage/PopUpVerify'
import {AuthProvider} from './server/Auth'
import {BrowserRouter as Router, Route} from "react-router-dom"
import SignInSide from "./SignInPage/Signin"

import Chatpage from "./chatpage/Chatpage"
import {ChatProvider} from './server/ChatProvider'


function App() {

 
  return (
    <ChatProvider>
    <AuthProvider>
      <Router>
    <div className="app">
   <div className="app__body">
    
      
      {/* <Route exact path="/" component={Closed} /> */}
      <Route exact path="/" component={Welcome} />
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
