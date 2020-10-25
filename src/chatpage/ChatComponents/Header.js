import React , {useContext,useEffect} from "react";
import "./Header.css";
//import Link from '@material-ui/core/Link';

import {IconButton } from "@material-ui/core"
import Button from '@material-ui/core/Button';

/* Context Providers */
import {AuthContext} from '../../server/Auth'
import {ChatContext} from '../../server/ChatProvider'

import logo from './logo.jpeg'

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
      <img src={logo} width="30px"/>
      
      <h2> {chat.title}</h2>
      

      <Button 
      size="large"
       variant="contained"
        color="primary"
        onClick={NewChat}>
        לפתיחת צ'אט חדש
        </Button>
    </div>

  );
}

export default Header;