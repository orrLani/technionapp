
import React, {useContext} from 'react'
import {db} from './firebase'
import {AuthContext} from './Auth'
import {ChatContext} from './ChatProvider'
export async function getChatIDForUser({userName, userID}) {
    let chatID = '1'
    console.log("username is:" +userName)
    db
      .collection("rooms")
      .doc(chatID)
      .collection("users_on_page")
      .add({
        user_name: userName
      })
    return chatID
}