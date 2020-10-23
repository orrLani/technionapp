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
  const {chat,setChat,addNewChat} = useContext(ChatContext)
  const auth = useContext(AuthContext)

  /* for צ'אט חדש button */
  function NewChat() {
    setChat(chat => {
      return {
        ...chat,
        is_open: true,
        is_loading: true

      }
    })
    addNewChat(auth)
  }
  useEffect(() => {
    { chat.DEBUG && console.log("I'm Mounting Header!")}
    return(() => {
      { chat.DEBUG && console.log("i'm unmounting the header!")}
    })
  },[chat])

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
      <h2> {chat.title}</h2>
      {/* {value} */}

      <IconButton style= {{color: '#F7FFF7'}} onClick={NewChat} >
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