import './Chatpage.css'
import React, {useState, useContext,useEffect} from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import {IconButton } from "@material-ui/core"
import { red } from '@material-ui/core/colors';

import Sidebar from './ChatComponents/Sidebar'
import Chat from './Chat'
import Header from './ChatComponents/Header'
import firebase from '../server/firebase'
// import {db} from '../server/firebase'
// import Login from "./Login"

/* use contextAPI to know the chat */
import {ChatContext, ChatProvider} from '../server/ChatProvider'
import {AuthContext} from '../server/Auth'

/* imports functions that manage chats */
import {joinChat} from '../server/ChatsManager'

/* imports loading page */
import Loading from '../Loading'
import { Close } from '@material-ui/icons';

function Chatpage({ChatIsOpenFunction}) {
  const {chat,setChat,removeUserFromChat}  = useContext(ChatContext)

  const auth = useContext(AuthContext)


  function ExitChat() {
    setChat(chat => {
      return {
        ...chat,
        is_open: false,
        is_loading: true
      }
    })
    //if chat is closed, it has already been deleted, no need to update databade.
    if( chat.active_status !== "CLOSED_CHAT" ){
      removeUserFromChat()
    }
  }


  useEffect(() => {
    { chat.DEBUG && console.log("i'm mounting the chatpage!")}
    { chat.DEBUG && console.log(chat)}

    // in case of exiting the browser (or f5) - deletes the user from chat
    window.addEventListener('beforeunload', (event) => {
      // alert("You are getting out of working chat!")
      { chat.DEBUG && console.log("user_uid", auth.currentUser.uid)}
      { chat.DEBUG && console.log("chat_id", chat.id)}

      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Remove user from chat
      
      const deleteFromChat = firebase.functions().httpsCallable('removeUserFromChat')
      deleteFromChat({
        chat_id: chat.id
      }).then(() => {
        console.log("I've deleted!")
      })
    })
    return(() => {
      { chat.DEBUG && console.log("i'm unmounting the chat page!") }
    }
    )
  },[])

    if(auth&&chat.is_open){
      return(
        <div>
          <IconButton>
            {/* red[50] === white */}
            <CloseIcon onClick = {ExitChat} style={{ color: red[50] }} />
          </IconButton>
        <div className="chatpage">
            <div className="chatpage__body">
              <Sidebar />
              <div className="chatpage__body__right">
                <Header/>
                <Chat/>
              </div>
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
