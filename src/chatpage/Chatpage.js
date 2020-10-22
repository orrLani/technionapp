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
    // currently NOT WORKING
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
  },[chat])
    if(auth&&chat.is_open){
      return(
        <div>
          <IconButton onClick = {ExitChat} style={{ color: red[50] }}>
            {/* red[50] === white */}
            <CloseIcon  />
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

export default Chatpage
