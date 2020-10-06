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

function Chatpage({ChatIsOpenFunction}) {
  const [chat,setChat]  = useContext(ChatContext)

  const [loading, setLoading] = useState(false)
  const user = useContext(AuthContext)

  // useEffect(() => {
  //   /* applied when function loads */
  //   /* TODO - add func(userID) that gives the user the chat he was assigned */

  //   /* sends userID to outer function in order to get the chat id */
  //   /* updated the chat ID curresponds to chatContext */
  //   const chatID = getChatIDForUser(
  //     {userName: user.currentUser.email.split('@')[0]}
  //   ).then((chatID) => {
  //     setChat({
  //       ID: chatID
  //     })
  //     console.log(chat.ID)
  //     setLoading(false)
  //   },[chat])
    
  // }, [])
  function ReturnValue() {
    if(loading){
      return(
        <h2> Loading...</h2>
      )
    }
    if(user){
      return(
        <div className="chatpage">
            <div className="chatpage__body">
              <Sidebar />
              <div className="chatpage__body__right">
                <Header ChatIsOpenFunction = {ChatIsOpenFunction}/>
                <Chat ID={1} />
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
  return(
    <div>
    <ReturnValue/>
  </div>
  ) 
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
