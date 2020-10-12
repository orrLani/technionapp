import './Chatpage.css'
import React, {useState, useContext,useEffect} from 'react';
import { Link } from 'react-router-dom';

import Sidebar from './ChatComponents/Sidebar'
import Chat from './Chat'
import Header from './ChatComponents/Header'
import firebase from '../server/firebase'
import {db} from '../server/firebase'
// import Login from "./Login"

/* use contextAPI to know the chat */
import {ChatContext, ChatProvider} from '../server/ChatProvider'
import {AuthContext} from '../server/Auth'

/* imports functions that manage chats */
import {joinChat} from '../server/ChatsManager'

/* imports loading page */
import Loading from '../Loading'

function Chatpage({ChatIsOpenFunction}) {
  const [chat,setChat]  = useContext(ChatContext)

  const auth = useContext(AuthContext)

  useEffect(() => {
    { chat.DEBUG && console.log("i'm mounting the chatpage!")}
    { chat.DEBUG && console.log(chat)}

    // in case of exiting the browser (or f5) - deletes the user from chat
    window.addEventListener('beforeunload', (event) => {
      { chat.DEBUG && console.log("user_uid", auth.currentUser.uid)}
      { chat.DEBUG && console.log("chat_id", chat.id)}
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Remove user from chat
      const deleteFromChat = firebase.functions().httpsCallable('removeUserFromChat')
      deleteFromChat({
        user_uid: auth.currentUser.uid,
        chat_id: chat.id
      })
    })
    return(() => {
      { chat.DEBUG && console.log("i'm unmounting the chat page!") }
    }
    )
  },[])

    if(auth){
      return(
        <div className="chatpage">
            <div className="chatpage__body">
              <Sidebar />
              <div className="chatpage__body__right">
                <Header/>
                <Chat/>
              </div>
            </div>
        </div>
      )
    }
    else{
      return(
        <Link 
                to= "/signin"
                
                replace 
               >אתה לא מחובר ,תתחבר בבקשה</Link>
      )
    }
}
/*
function Chatpage(props) {
  
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
*/
export default Chatpage
