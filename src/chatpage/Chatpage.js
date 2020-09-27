import './Chatpage.css'
import React, {useState} from 'react';

import Sidebar from './ChatComponents/Sidebar'
import Chat from './Chat'
import Header from './ChatComponents/Header'
import firebase from '../server/firebase'

// import Login from "./Login"
// import { useStateValue } from './StateProvider';
function Chatpage(props) {
  const db = firebase.firestore()

   console.log("chatpagggwww")
    console.log(props.location.data)
    let name =0
    let course= 0
    if(props.location.data !==undefined){
      name = props.location.data[0]
      course = props.location.data[1]
    }
    console.log("bla1")
    console.log(name)

   db
  .collection("rooms")
   .doc('1')
   .collection("users_on_page")
   .add({
    user_name: name
    })

    const uid=

    db
  .collection("rooms")
   .doc('1')
   .collection("users_on_page")
   .get()

    console.log(uid)

    console.log("bla2")
    return (
      
       <div className="chatpage__header" >
         <Header data ={course} document_uid ={uid}  />
        <div className="chatpage__body">
           <Sidebar />
           <Chat data ={name} />
        </div>
      </div>
    )
}

export default Chatpage
