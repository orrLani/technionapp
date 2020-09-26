import './Chatpage.css'
import React, {useState} from 'react';

import Sidebar from './ChatComponents/Sidebar'
import Chat from './Chat'
import Header from './ChatComponents/Header'

// import Login from "./Login"
// import { useStateValue } from './StateProvider';
function Chatpage(props) {
   console.log("chatpagggwww")
    console.log(props.location.data)
    return (
       <div>
         <Header />
        <div className="chatpage__body">
           <Sidebar />
           <Chat data ={props.location.data} />
        </div>
      </div>
    )
}

export default Chatpage
