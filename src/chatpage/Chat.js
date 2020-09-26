import React, {useState, useEffect} from 'react'
import {Avatar, IconButton} from "@material-ui/core"
import {AttachFile, MoreVert, SearchOutlined, Message, InsertEmoticon} from "@material-ui/icons"
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from "react-router-dom"
// import db from './firebase'
 import firebase from "../server/firebase"
 import GridList from '@material-ui/core/GridList';
import "./Chat.css"
// import { useStateValue } from './StateProvider';
import Header from './ChatComponents/Header'
import Sidebar from './ChatComponents/Sidebar'
function Chat() {
    const [input, setInput] = useState("")
    const [roomName, setRoomName] = useState("")
    // const {roomId} = useParams()
    const [messages,setMessages] = useState([])

    const uid = firebase.auth().currentUser.uid
    
    const db = firebase.firestore()
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

    

    useEffect(() => {
        db
            .collection("rooms")
             .doc('1')
             .collection("messages")
                .orderBy('timestamp','asc')
                .onSnapshot(snapshot => (
                     setMessages(snapshot.docs.map(doc => doc.data()))
                ))
            },
            []
            
        )
            

      
    const sendMessage = (e) => {
        console.log(db.collection('rooms').doc("1")
        .collection('messages'))
        e.preventDefault()
        console.log('You typed >>> ', input)
        db.collection('rooms').doc("1")
        .collection('messages').add({
            text: input,
            user_uid: uid,
            timestamp: Date.now(),
        })
        setInput("")
    }
    //firebase.firestore.FieldValue.serverTimestamp()
    return (

        <div className="chat">

          {/* <Header /> */}
          
        
            <div className="chat__body">
                
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
                {messages.map(message => (
                    //Left or right   //className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}
                    <p className="chat__reciever">
                        <span className="chat__name">{message.name}</span>
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
                <form onSubmit = {sendMessage}>
                    <input value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="הקלד משהו נחמד..."
                    type="text"
                    dir="rtl"
                    />
                    <button  type="submit">
                        Send a message
                    </button>

                    {/* <button onClick={() => {}}
                    type="submit">
                        Send a message
                    </button> */}
                  </form>  
            </div>
        </div>
    )
}

export default Chat
