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


function Header(props) {
  const [chat,setChat] = useContext(ChatContext)
  const auth = useContext(AuthContext)
  function ExitChat() {
    setChat(chat => {
      return {
        ...chat,
        is_open: false,
        is_loading: true
      }
    })
    const deleteFromChat = firebase.functions().httpsCallable('removeUserFromChat')
    deleteFromChat({})
      .then(() => {
        setChat(chat => {
          return {
            ...chat,
            is_loading: false,
          }
        })
      })
    .catch(error => {
      console.log(error)
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
      <h2 className="room__name"> אינפי 1מ</h2>
      {/* {value} */}

      <IconButton onClick={ExitChat} >
        {/* <Link variant="body2"
          to="/welcome"
          className="leave__room"
          dir="rtl">עזוב את החדר</Link> */}
          עזוב את החדר
      </IconButton>


    </div>

  );
}

export default Header;