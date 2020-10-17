import React , {useContext,useEffect} from "react";
import "./Header.css";
//import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';

import { Avatar, IconButton } from "@material-ui/core"
import { NearMeOutlined } from "@material-ui/icons";
import firebase from '../../server/firebase'
import {db} from '../../server/firebase'

/* Context Providers */
import {AuthContext} from '../../server/Auth'
import {ChatContext} from '../../server/ChatProvider'


import MoodIcon from '@material-ui/icons/Mood';

function Header(props) {
  const [chat,setChat] = useContext(ChatContext)
  const auth = useContext(AuthContext)
  function NewChat() {
    
    setChat(chat => {
      return {
        ...chat,
        is_open: true,
        is_loading: true

      }
    })
    const deleteFromChat = firebase.functions().httpsCallable('removeUserFromChat')
    const addUserToChat = firebase.functions().httpsCallable('addUserToChat')

    deleteFromChat({})
      .then(() => {
        return addUserToChat({
          user_nickname: auth.currentUserNickName
        })
      })
      .then(newChatRef => {
        setChat({
          ...chat,
          is_open: true,
          id: newChatRef.data.chat_id,
          is_loading: false,
          active_status: "WAITING_CHAT"
        })
      })
    .catch(error => {
      console.log("where is error")
      console.log(error)
      // alert("Error occured, please try again")
      //seting state back to welcome page
      setChat({
        ...chat,
        is_open: false,
        is_loading: false,
        id: undefined
      })
    })

    
  }
  useEffect(() => {
    { chat.DEBUG && console.log("I'm Mounting Header!")}
    return(() => {
      { chat.DEBUG && console.log("i'm unmounting the header!")}
    })
  },[])

  //[Test start]
  function test_delete_messages() {
    console.log("tesing")
    db.collection('rooms').doc(chat.id)
    .collection('messages').get().then(messages => {
      messages.forEach(message => {
        message.ref.delete()
      })
    })
  }
  //[Test end]


  return (
    <div className="chat__header" >
      {/* <h2 className="room_name">{name[1].title}</h2>  */}
      <MoodIcon />
      <h2> אינפי 1מ</h2>
      {/* {value} */}

      <IconButton onClick={NewChat} >
        {/* <Link variant="body2"
          to="/welcome"
          className="leave__room"
          dir="rtl">עזוב את החדר</Link> */}
          צ'אט חדש
      </IconButton>


    </div>

  );
}

export default Header;