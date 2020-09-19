import React, {useState, useEffect} from 'react'
import {Avatar, IconButton} from "@material-ui/core"
import {AttachFile, MoreVert, SearchOutlined, Message, InsertEmoticon} from "@material-ui/icons"
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from "react-router-dom"
// import db from './firebase'
// import firebase from "firebase"
import "./Chat.css"
// import { useStateValue } from './StateProvider';
import Header from './ChatComponents/Header'
import Sidebar from './ChatComponents/Sidebar'
function Chat() {
    const [input, setInput] = useState("")
    // const [seed,setSeed] = useState('')
    // const [roomName, setRoomName] = useState("")
    // const {roomId} = useParams()
    // const [messages,setMessages] = useState([])
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

    // useEffect(() => {
    //     setSeed(Math.floor(Math.random()*5000))
    // }, [roomId])

    // const sendMessage = (e) => {
    //     e.preventDefault()
    //     console.log('You typed >>> ', input)
    //     db.collection('rooms').doc(roomId)
    //     .collection('messages').add({
    //         message: input,
    //         name: user.displayName,
    //         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //     })
    //     setInput("")
    // }
    return (
        <div className="chat">
            {/* <div className='chat__header'>
             <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
             <div className="chat__headerInfo">
                 <h3>{roomName}</h3>
                 <p>Last seen at {new Date(
                     messages[messages.length-1]?.
                     timestamp?.toDate()).toUTCString()}
                 )}</p>
             </div>

             <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
             </div>
            </div> */}
            <Header />
            
            {/* <Sidebar /> */}
            <div className="chat__body">
                {/* {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                    </p>
                ))} */}
                <p className="chat__message">
                        <span className="chat__name">אור</span>
                    <span className="chat__timestamp">
                       18:37
                    </span>
                        איפה איתי
                    </p>
                    <p className="chat__reciever">
                        <span className="chat__name">איתי</span>
                        מי אתה
                    <span className="chat__timestamp">
                       
                    </span>
                    </p>
            </div>

            <div className="chat__footer">
                <form>
                    <input value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="הקלד משהו נחמד..."
                    type="text"
                    dir="rtl"
                    />
                    <button onClick={() => {}}
                    type="submit">
                        Send a message
                    </button>
                  </form>  
            </div>
        </div>
    )
}

export default Chat
