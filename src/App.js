import React from "react";
import "./App.css";
//import Welcome from './Welcome/Welcome'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Signin from "./SignIn/Signin";
//import {useStateValue} from "./StateProvider"
//import UseWindowDimensions from "./UseWindowDimensions";

function App() {
  //const [{user},dispatch] = useStateValue();
 // const { width } = UseWindowDimensions();
  const uid =  localStorage.getItem('uid')!==undefined?localStorage.getItem('uid'):null;
  //console.log(useStateValue);
  //const {user,setUser} = useState(null);
  //console.log(user)
  return (
    <div className="app">
   <div className="app__body">
      <Signin />
     </div>
    </div>
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