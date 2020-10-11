import React , {useContext} from "react";
import "./Header.css";
//import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';

import { Avatar, IconButton } from "@material-ui/core"
import { NearMeOutlined } from "@material-ui/icons";
import firebase from '../../server/firebase'
import {db} from '../../server/firebase'

/* to delete */
import fb from 'firebase'

/* Context Providers */
import {AuthContext} from '../../server/Auth'
import {ChatContext} from '../../server/ChatProvider'


function Header(props) {
  const [chat,setChat] = useContext(ChatContext)
  const auth = useContext(AuthContext)
  function ExitChat() {
    setChat({
      ...chat,
      is_loading: true
    })
    const deleteFromChat = firebase.functions().httpsCallable('removeUserFromChat')
    deleteFromChat({
      user_uid: auth.currentUser.uid,
      chat_id: chat.id
    })
    .catch(error => {
      console.log(error)
    })
  }

//[TEST START]
  function test_remove_user() {
    db
    .collection('rooms')
    .doc(chat.id)
    .collection("users_on_page")
    .where('user_uid', '==', auth.currentUser.uid)
    .get().then((querySnapshot) => {
        /* deletes every user with same uid in the chat (need to be only 1) */
        querySnapshot.forEach(doc => {
            doc.ref.delete()
        })
        return ``
    })
      /* after delete, check if chat is empty and deletes if it does */
      .then(() => {

        //returs chat reference
        return db.collection('rooms').doc(chat.id).get()
      })
      .then(chatRef => {
        // returns users_count
        return chatRef.data().users_count
      })
      .then(users_count => {
        // if user was the last on the chat, delete the chat.
        if(users_count === 1) {
          return db.collection('rooms').doc(chat.id).delete()
        }
        // else, decrement users count
        else{
          const decrement = fb.firestore.FieldValue.increment(-1);
          return db.collection('rooms').doc(chat.id).update({
              users_count: decrement
          })
        }
      })
      .catch(error => {
          throw error
      })
    // .get()
    // .then(room => {
    //     // return(
    //     //     room,
    //     //     room.ref.collection("users_on_page")
    //     //     .where('user_uid', '==', data.user_uid).get()
    //     // )

    //     // return room.ref.collection("users_on_page")
    //     // .where('user_uid', '==', auth.currentUser.uid).get()
    //     return ({
    //       room: room,
    //       snapshot: room.ref.collection("users_on_page")
    //       .where('user_uid', '==', auth.currentUser.uid).get()
    //     })
    // })
    // /* delete all users in snapshot with user_uid (needs to be 1 only) */
    // .then(({room,snapshot}) => {
    //   console.log("room: ", room)  
    //   console.log("snapshot: ", snapshot)

    //     snapshot.forEach(doc => {
    //         doc.ref.delete()
    //     })
    //     return room
    // })

    // /* after delete, check if chat is empty and deletes if it does */
    // .then((room) => {
    //     return (room,room.ref.doc('users_count').get())
    // })
    // .then((room,users_count) => {
    //     // if only 1 user - delete
    //     if (users_count === 1) {
    //         room.delete()
    //     }
    //     // else - decrement by 1
    //     else {
    //         const decrement = firebase.firestore.FieldValue.increment(-1)
    //         room.ref.update({
    //             users_count: decrement
    //         })
    //     }
    //     return ''
    // })
    // .catch(error => {
    //     throw error
    // })
  }
//[TEST END]

  return (
    <div className="chat__header" >
      {/* <h2 className="room_name">{name[1].title}</h2>  */}
      <h2 className="room__name"> אינפי 1מ</h2>
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