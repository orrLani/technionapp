import React, { useState, useEffect, useContext } from 'react'
import { Avatar, IconButton } from "@material-ui/core"
import { AttachFile, MoreVert, SearchOutlined, Message, InsertEmoticon } from "@material-ui/icons"
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from "react-router-dom"

/* database */
import firebase from "../server/firebase"
import { db } from '../server/firebase'
import fb from 'firebase'

/* context API */
import { AuthContext } from '../server/Auth'
import { ChatContext } from '../server/ChatProvider'


import GridList from '@material-ui/core/GridList';
import "./Chat.css"

import usePrevious from './../utils/usePrevious'


function Chat(props) {
    const [input, setInput] = useState("")
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([])

    const auth = useContext(AuthContext)
    const [chat, setChat] = useContext(ChatContext)
    const [users,setUsers] = useState([])
    const prevUsers = usePrevious(users)

    // const val =chat.is_not_active;
    // if(val){
    // chat.is_not_active = false;
    // }


    //console.log(Date.now().timestamp)

    // const [{user},dispatch] = useStateValue()
    // useEffect(() => {
    //     if (roomId) {
    //         db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
    //             setRoomName(snapshot.data().name))
    //         )
    //         db
    //         .collection("rooms")
    //         .doc(roomId)
    //         .collection("messages")
    //         .orderBy('timestamp','asc')
    //         .onSnapshot(snapshot => (
    //             setMessages(snapshot.docs.map(doc => doc.data()))
    //         ))
    //     }
    // },[roomId])


    /* collect room messages */
    useEffect(() => {
        { chat.DEBUG && console.log("I'm Mounting Chat!")}
        { chat.DEBUG && console.log(chat)}
        if (chat && chat.id) {
            db
                .collection("rooms")
                .doc(chat.id)
                .collection("messages")
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => (
                    // setMessages(snapshot.docs.map(doc => doc.data()))
                    setMessages(snapshot.docs)
                ))
        }
        return(() => {
            { chat.DEBUG && console.log("i'm unmounting the chat!")}
            setMessages([])
        })
    },
        [chat]
    )


    /* fired when user press enter to send a message
        adds the message to the database */
    const sendMessage = (e) => {
        e.preventDefault()
        console.log('You typed >>> ', input)
        if(input.length < 2 || input.length > 100) {
            alert("הודעה חייבת להכיל בין 2 ל-100 תווים")
        }
        else{
            db.collection('rooms').doc(chat.id)
                .collection('messages').add({
                    user_name: auth.currentUser.email.split('@')[0],
                    nickname: auth.currentUserNickName,
                    text: input,
                    user_uid: auth.currentUser.uid,
                    timestamp: fb.firestore.FieldValue.serverTimestamp(),
                })
        }
        setInput("")
    }
    //firebase.firestore.FieldValue.serverTimestamp()
    return (
        <div className="chat">
            { chat.active_status === "ACTIVE_CHAT" &&
                <div className="chat__body">
                
                    {messages.map(message => (
                        //Left or right   //className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}
                        <p key={message.id} 
                            className={`chat__message ${message.data().user_uid === auth.currentUser.uid && "chat__reciever"}`} >
                            <span className="chat__name">{message.data().nickname}</span>
                            {message.data().text}
                            <span className="chat__timestamp">
                            {new Date(message.data().timestamp?.toDate()).getHours()} 
                            :
                                {new Date(message.data().timestamp?.toDate()).getMinutes()}
                            </span>
                        </p>
                        // {new Date(message.timestamp?.toDate()).toUTCString()}
                    ))}
                </div>
                }
            {chat.active_status === "WAITING_CHAT" && 
                <div className="chat__body">
                    המתנה כפרה
                    </div>
            }
            {chat.active_status === "CLOSED_CHAT" && 
                <div className="chat__body">
                    למה אני לא רואה פעילות
                    </div>
            }


            {chat.active_status === "ACTIVE_CHAT" && 
            <div className="chat__footer"  >
                <form onSubmit={sendMessage}>
            <input value={input}
                    disabled = {false}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder ="הקלד משהו נחמד"  
                    type="text"
                    dir="rtl"/>
                    </form>
                    </div>
            }

            {chat.active_status === "CLOSED_CHAT" && 
            <div className="chat__footer"  >
                <form onSubmit={sendMessage}>
            <input value={input}
                    disabled = {true}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder ="למה הצאט חסום"  
                    type="text"
                    dir="rtl"
                    />
                    </form>
                    </div>
            }

            {chat.active_status === "WAITING_CHAT" && 
            <div className="chat__footer">
                 <form onSubmit={sendMessage}>
                <input value={input}
                    disabled = {true}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder ="למה הצ'אט ממתין"
                    type="text"
                    dir="rtl"
                    />
                    </form>
                    </div>
            }

                
                
            </div>
    )
}

export default Chat
