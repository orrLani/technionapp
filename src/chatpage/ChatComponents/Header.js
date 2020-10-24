import React , {useContext,useEffect} from "react";
import "./Header.css";
//import Link from '@material-ui/core/Link';

import {IconButton } from "@material-ui/core"

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
    // { chat.DEBUG && console.log("I'm Mounting Header!")}
    return(() => {
      // { chat.DEBUG && console.log("i'm unmounting the header!")}
    })
  },[chat])



  return (
    <div className="chat__header" >
      
      <MoodIcon />
      <h2> {chat.title}</h2>
      

      <IconButton style= {{color: '#F7FFF7'}} onClick={NewChat} >
          צ'אט חדש
      </IconButton>
    </div>

  );
}

export default Header;