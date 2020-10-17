import React,{useState,useEffect,useContext} from "react";
import "./Sidebar.css";
import firebase from "../../server/firebase"
import {db} from "../../server/firebase" 

/* handle ContextAPI */
import {ChatContext} from '../../server/ChatProvider'
import { AuthContext } from "../../server/Auth";

/* custom hook */
import usePrevious from '../../utils/usePrevious'

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
  const auth = useContext(AuthContext)
  const prevUsers = usePrevious(users)

  useEffect(() => {
    let user_in_current_users_list = users.find(user => user.user_uid===auth.currentUser.uid)

    let user_in_previous_users_list = prevUsers && prevUsers.find(user => user.user_uid===auth.currentUser.uid)
    console.log("users changed!")
    console.log({users,prevUsers})
    if((prevUsers && prevUsers.length === 2 && users.length === 1) || 
  (!user_in_current_users_list&&user_in_previous_users_list)) {

      // console.log(prevUsers.length)
      // console.log(users.length)
      console.log("Close the chat!")
      
      setChat(prevChat => {
        return {
          ...prevChat,
          active_status: "CLOSED_CHAT"
        }
      })
    }
    // needs to be on waiting list
    // else if(users.length <= 1 ) {
    //   setChat(chat => {
    //     return {
    //       ...chat,
    //       active_status: "WAITING_CHAT"
    //     }
    //   })
    //   console.log("WAIT")
    // }
    else if (users.length > 1 && chat.active_status !== "CLOSED_CHAT") {
      setChat(chat => {
        return {
          ...chat,
          active_status: "ACTIVE_CHAT"
        }
      })


    }
  },[users])
  /* fired when user connects to the chat for the first time.
    added the user to the userslist in the sidebar */
  useEffect(() => {
    { chat.DEBUG && console.log("I'm Mounting Sidebar") }
    /*due to error message : "Can't perform a React state update on an unmounted component"
      added the current variable and used it in function setUsers */
    let isMounted = true

    if (chat&&chat.is_open) {
      db
        .collection("rooms")
        .doc(chat.id)
        .collection("users_on_page")
        .onSnapshot(snapshot => {
          if(isMounted){
            setUsers(snapshot.docs.map(doc => doc.data()))
          }
        })
    }
    return(() => {
      { chat.DEBUG && console.log("i'm unmounting the sidebar!")}
      isMounted = false
      //setUsers([])
    })
  }, []  )

  return (

    <div className="chat-sidebar">
      <h3 dir="rtl"> משתמשים:</h3>
        {users.map(user => (
          <div key={user.user_uid} className="chat__username">{user.nickname}</div>
        ))
        }

      <ul id="users"></ul>
    </div>
  );
}

export default Sidebar;