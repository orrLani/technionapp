import React, { useState, useEffect, useContext } from 'react'
import { Avatar, IconButton } from "@material-ui/core"
import { AttachFile, MoreVert, SearchOutlined, Message, InsertEmoticon } from "@material-ui/icons"
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from "react-router-dom"

/* database */
import firebase from "../server/firebase"
import { db } from '../server/firebase'

/* context API */
import { AuthContext } from '../server/Auth'
import { ChatContext } from '../server/ChatProvider'


import GridList from '@material-ui/core/GridList';
import "./Chat.css"


function Chat(props) {
    const [input, setInput] = useState("")
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([])

    const user = useContext(AuthContext)
    const [chat, setChat] = useContext(ChatContext)




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
        if (chat && chat.id) {
            db
                .collection("rooms")
                .doc(chat.id)
                .collection("messages")
                .orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc => doc.data()))
                ))
        }
    },
        [chat]
    )


    /* fired when user press enter to send a message
        adds the message to the database */
    const sendMessage = (e) => {
        e.preventDefault()
        console.log('You typed >>> ', input)
        db.collection('rooms').doc(chat.id)
            .collection('messages').add({
                user_name: user.currentUser.email.split('@')[0],
                text: input,
                user_uid: user.currentUser.uid,
                timestamp: Date.now(),
            })
        setInput("")
    }
    //firebase.firestore.FieldValue.serverTimestamp()
    return (
        <div className="chat">



            <div className="chat__body">


                {messages.map(message => (
                    //Left or right   //className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}
                    <p className="chat__reciever">
                        <span className="chat__name">{message.user_name}</span>
                        {message.text}
                        <span className="chat__timestamp">
                            {/* {new Date(message.timestamp.toDate())} */}
                        </span>
                    </p>
                    // {new Date(message.timestamp?.toDate()).toUTCString()}
                ))
                }

            </div>

            <div className="chat__footer"  >
                <form onSubmit={sendMessage}>
                    <input value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="הקלד משהו נחמד..."
                        type="text"
                        dir="rtl"
                    />


                </form>
            </div>
        </div>
    )
}

export default Chat
