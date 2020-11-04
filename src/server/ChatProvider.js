import React, { createContext, useState } from 'react'
import firebase from './firebase'

export const ChatContext = createContext();

export const ChatProvider = ({children}) => {
    const [chat,setChat] = useState({
        id: null,
        is_loading: false,
        is_open: false,
        active_status: "ACTIVE_CHAT",
        DEBUG: true,
    
    })
    async function addNewChat(auth) {
        // in case that user added new nickname, update in database
        // console.log("adding new user!")
        // console.log(chat)
      // console.log(auth)

      /* fire 'deleteFromChat' cloud function if user still in chat */
      const deleteFromChat = firebase.functions().httpsCallable('removeUserFromChat')
      await deleteFromChat({})
      .catch(error => {
        // console.log("not in chat")
      })
      /* if user entered new nickname, update it in databse */
      if (auth.nickNameHasChanged) {
        const setUserNickName = firebase.functions().httpsCallable('setUserNickName')

        setUserNickName({
          nickname: auth.currentUserNickName,
          
        })
        .then(() => {
          auth.setNickNameHasChanged(false)
        })
        .catch(error => {
          console.log(error)
        })
      }
      const addUserToChat = firebase.functions().httpsCallable('addUserToChat')

      // course will be {title: "Friendly"} if chat type is חברתי
      // console.log(chat.user_hobby)

      //give user random color
      const random_color = "#"+Math.floor(Math.random()*16777215).toString(16)
      auth.setUserChatColor(random_color)
      addUserToChat({
        user_nickname: auth.currentUserNickName,
        course_title: chat.title,
        hobby: chat.user_hobby,
        //add color to the user
        color: random_color
      }).then(chatRef => {
        // {chat.DEBUG && console.log(chatRef)}
        // {chat.DEBUG && console.log(chatRef.data.chat_id)}
        
        setChat({
          ...chat,
          is_open: true,
          id: chatRef.data.chat_id,
          is_loading: false,
          active_status: "WAITING_CHAT",
        })
      })
      .catch(error =>{
        alert("Error occured, please try again")
        setChat({
          ...chat,
          is_open: false,
          is_loading: false,
          id: undefined
        })
      })
    }

    const removeUserFromChat = async () => {
        /*
        setChat(chat => {
            return {
              ...chat,
              is_open: false,
              is_loading: true
            }
          })
          */
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
            // console.log(error)
          })
    }
    return (
        <ChatContext.Provider value={{chat,setChat,addNewChat,removeUserFromChat}}>
            {children}
        </ChatContext.Provider>
    )
}