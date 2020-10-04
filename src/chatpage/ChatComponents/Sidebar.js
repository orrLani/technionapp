import React,{useState,useEffect} from "react";
import "./Sidebar.css";
import firebase from "../../server/firebase"
function Sidebar() {
  const [users,setUsers] = useState([])
  const db = firebase.firestore()



  useEffect(() => {
    db
        .collection("rooms")
         .doc('1')
         .collection("users_on_page")
            .onSnapshot(snapshot => (
                 setUsers(snapshot.docs.map(doc => doc.data()))
            ))
        },
        []
        
    )

console.log("hii1")
console.log(users)
console.log("hii1")
    return (
      
        <div className="chat-sidebar">
          <h3 dir="rtl"> משתמשים:</h3>



          {users.map(user => (
                    //Left or right   //className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}
                    
                    <div className="chat__username">{user.user_name}</div>
                                         ))
                }

          
          <ul id="users"></ul>
        </div>
        
      
    );
}

export default Sidebar;