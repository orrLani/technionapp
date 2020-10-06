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
    if (chat) {
      db
        .collection("rooms")
        .doc(chat.ID)
        .collection("users_on_page")
        .onSnapshot(snapshot => (
          setUsers(snapshot.docs.map(doc => doc.data()))
        ))
    }
  }, [chat]  )

  return (

    <div className="chat-sidebar">
      <h3 dir="rtl"> משתמשים:</h3>
        {users.map(user => (
          <div className="chat__username">{user.user_name}</div>
        ))
        }

      <ul id="users"></ul>
    </div>
  );
}

export default Sidebar;