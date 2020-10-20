import React,{useState,useEffect,useContext} from "react";
import "./Sidebar.css";
import firebase from "../../server/firebase"
import {db} from "../../server/firebase" 

/* handle ContextAPI */
import {ChatContext} from '../../server/ChatProvider'
import { AuthContext } from "../../server/Auth";

/* custom hook */
import usePrevious from '../../utils/usePrevious'


/* for music */
import startChat from "../../sounds/start_chat.wav";
import endChat from "../../sounds/end_chat.wav";


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
  const [hobbys,setHobbys] = useState([])
  const {chat,setChat} = useContext(ChatContext)
  const auth = useContext(AuthContext)

  //for music
  const startAudio = new Audio(startChat);
  const endAudio = new Audio(endChat);
  const playSound = audioFile => {
    audioFile.play();
  };





  // to track changes in users list
  const prevUsers = usePrevious(users)

  useEffect(() => {
    let user_in_current_users_list = users.find(user => user.user_uid === auth.currentUser.uid)

    let user_in_previous_users_list = prevUsers && prevUsers.find(user => user.user_uid === auth.currentUser.uid)
    console.log("users changed!")
    console.log({ users, prevUsers })
    /* needs to close the chat in one of these cases:
      1. user is the last person in the chat
      2. user is already deleted from the chat (possibly because of opening chat in other browser) */
    if ((prevUsers && prevUsers.length === 2 && users.length === 1) 
      || (!user_in_current_users_list && user_in_previous_users_list)) {

      // console.log(prevUsers.length)
      // console.log(users.length)
      console.log("Close the chat!")
      playSound(endAudio)
      setChat(prevChat => {
        
        return {
          ...prevChat,
          active_status: "CLOSED_CHAT"
        }
      })
    }

    // from waiting to active
    // chat cannot go from closed to active
    else if (users.length > 1 && chat.active_status === "WAITING_CHAT") {
      //play the music
      console.log("start the chat!")
      console.log("playing start audio!")
      playSound(startAudio)
      setChat(chat => {  
        return {
          ...chat,
          active_status: "ACTIVE_CHAT"
        }
      })
    }


  }, [users,chat])
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
            setHobbys(snapshot.docs.map(doc => doc.data().user_hobby))
            //in case both hobbies are the same, reduce to 1 (primitive and probally need scaling)
            /*if(hobbys[0] && hobbys[1] && hobbys[0] === hobbys[1]) {
              setHobbys(hobbys[0])
            }
            */
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
      <div className="users__list">
      <h3 dir="rtl"> משתמשים:</h3>
        {users.map(user => (
          <div key={user.user_uid} 
          style={{ color: user.user_color }}
          className="chat__username"
          > {user.nickname}</div>
        ))
        
        }
        </div>
        {chat.title ==="צ'אט חברתי" && 
        <div className="users__list">
          <h3 dir="rtl">תחביבים:</h3>
          {hobbys.map(hobby => (
          <div key={hobby} 
          className="chat__username"


          >{hobby}</div>
        ))
        }
        </div>
          }
      {/* <ul id="users"></ul> */}
    </div>
  );
}

export default Sidebar;