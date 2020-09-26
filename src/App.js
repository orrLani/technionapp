import React from "react";
import "./App.css";

import Welcome from './Welcome/Welcome'
// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
// import Signin from "./SignIn/Signin";
// import Signup from './SignUpPage/Checkout'
// import Chatpage from './chatpage/Chatpage'
import Learn from './Learn.js'
import PopUpVerify from './SignUpPage/PopUpVerify'
//import {useStateValue} from "./StateProvider"
//import UseWindowDimensions from "./UseWindowDimensions";

import {AuthProvider} from './server/Auth'
import PrivateRoute from "./PrivateRoute";
import {BrowserRouter as Router, Route} from "react-router-dom"
import { RouterOutlined } from "@material-ui/icons";
import SignInSide from "./SignIn/Signin"
import { Prompt } from 'react-router'
import Chatpage from "./chatpage/Chatpage"

function App() {
  //const [{user},dispatch] = useStateValue();
 // const { width } = UseWindowDimensions();
  const uid =  localStorage.getItem('uid')!==undefined?localStorage.getItem('uid'):null;
  //console.log(useStateValue);
  //const {user,setUser} = useState(null);
  //console.log(user)

 
  
  return (
    <AuthProvider>
      <Router>
    <div className="app">
   <div className="app__body">
      {/* <Signin /> */}
      {/* <Signup /> */}
      
      <Route exact path="/" component={SignInSide} />
      <Route exact path="/signup" component={Learn} />
      <Route exact path="/popupverify" component={PopUpVerify} />
      <Route path="/signin" component ={SignInSide}  />
      <Route exact path="/welcome" component ={Welcome} /> 
      <Route exact path="/chatpage" component ={Chatpage} /> 
      {/* <Welcome /> */}
      {/* <Chatpage /> */}
      
     </div>
    </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
// return (
//   <div className="app">
//   {
//     !user && !uid?(
//      <Signin/>
//     ):(
//       <div className="app__body">
//      <Welcome />
//     </div>
//     )
//   }
//   </div>
// );
