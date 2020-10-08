import React , {useContext} from "react";
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
  const user = useContext(AuthContext)
  function ExitChat() {
    props.ChatIsOpenFunction(false)
    const deleteFromChat = firebase.functions().httpsCallable('RemoveUserFromChat')
    deleteFromChat({user_uid: user.currentUser.uid,chat_id: chat.ID})
    .catch(() =>{
      alert('error occured')
    })
  }



  return (
    <div className="chat__header" >
      {/* <h2 className="room_name">{name[1].title}</h2>  */}
      <h2 clasName="room__name"> אינפי 1מ</h2>
      {/* {value} */}

      <IconButton>
        <Link variant="body2"
          to="/welcome"
          onClick={ExitChat}
          className="leave__room"
          dir="rtl">עזוב את החדר</Link>
      </IconButton>


    </div>

  );
}

export default Header;