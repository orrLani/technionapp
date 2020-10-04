import './Chatpage.css'
import React, {useState} from 'react';
import { Link } from 'react-router-dom';

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
  let name = 0
  let course = 0
  if (props.location.data !== undefined) {
    name = props.location.data[0]
    course = props.location.data[1]
    console.log("bla1")
    console.log(props.location.data)
    console.log("bla2")


    db
      .collection("rooms")
      .doc('1')
      .collection("users_on_page")
      .add({
        user_name: name
      })
  }



    // const uid=

  //   db
  // .collection("rooms")
  //  .doc('1')
  //  .collection("users_on_page")
  //  .get()

    // console.log(uid)

    function ReturnValue(){
      if(props.location.data !==undefined){
      return (

        <div className="chatpage">
            <div className="chatpage__body">
              <Sidebar />
              <div className="chatpage__body__right">
                <Header data={props.location.data} />
                <Chat data={name} />
              </div>
            </div>
        </div>
      )

      }

      return(
        <Link 
                to= "/signin"
                
                replace 
               >אתה לא מחובר ,תתחבר בבקשה</Link>
      )

    }

    return (
          <div>
            <ReturnValue/>
          </div>
    )
        
}

export default Chatpage
