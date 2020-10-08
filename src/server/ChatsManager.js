
import React, {useContext} from 'react'
import {db} from './firebase'
import {AuthContext} from './Auth'
import {ChatContext} from './ChatProvider'
async function createNewChat() {
  const chat = await db.collection("rooms").add({})
  return chat.id
}
export async function getChatIDForUser({userName, userID}) {
  const chatID = await createNewChat()
  db.collection("rooms").doc(chatID).collection("users_on_page").add({
    user_name: userName,
    user_uid: userID
  })
  return chatID
    /*
    console.log("username is:" +userName)
    db
      .collection("rooms")
      .doc(chatID)
      .collection("users_on_page")
      .add({
        user_name: userName,
        user_id: userID
      })
      */
    // return chatID
    }