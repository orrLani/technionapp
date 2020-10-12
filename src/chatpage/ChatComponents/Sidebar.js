import React,{useState,useEffect,useContext} from "react";
import "./Sidebar.css";
import firebase from "../../server/firebase"
import {db} from "../../server/firebase" 

/* handle ContextAPI */
import {ChatContext} from '../../server/ChatProvider'

/* 
  LEFT side:
  ----------------------
  |users:|             |
  |  **  |             |
  |  **  |             |
  |  **  |             |
  ----------------------

  fetches the users in the current chat and display them in the sidebar.

*/
function Sidebar() {
  const [users,setUsers] = useState([])
  const [chat,setChat] = useContext(ChatContext)

  /* fired when user connects to the chat for the first time.
    added the user to the userslist in the sidebar */
  useEffect(() => {
    console.log(chat)
    { chat.DEBUG && console.log("I'm Mounting Sidebar") }
    if (chat&&chat.id) {
      db
        .collection("rooms")
        .doc(chat.id)
        .collection("users_on_page")
        .onSnapshot(snapshot => (
          setUsers(snapshot.docs.map(doc => doc.data()))
        ))
    }
    return function unmount() {
      { chat.DEBUG && console.log("i'm unmounting the sidebar!")}
    }
  }, [chat]  )

  return (

    <div className="chat-sidebar">
      <h3 dir="rtl"> משתמשים:</h3>
        {users.map(user => (
          <div key={user.user_uid} className="chat__username">{user.user_name}</div>
        ))
        }

      <ul id="users"></ul>
    </div>
  );
}

export default Sidebar;