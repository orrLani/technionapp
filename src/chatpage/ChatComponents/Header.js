import React from "react";
import "./Header.css";
import Link from '@material-ui/core/Link';

import {Avatar, IconButton} from "@material-ui/core"
import { NearMeOutlined } from "@material-ui/icons";
import firebase from '../../server/firebase'



function header(props) {
    
    const db = firebase.firestore()

function Remove_User(){
var username=props.data[0];
console.log(username)
 var jobskill_query = db.collection("rooms").doc("1").collection("users_on_page").where('user_name', '==', username);
jobskill_query.get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  });
});

 }


     const name = props.data
  
    return (
        <div className="chat-header">
            <h2 className="course__number">{ name[1].title}</h2> 
            {/* <h2 clasName="room__name"> אינפי 1מ</h2> */}
           {/* {value} */}
            
            <IconButton>
            <Link variant="body2"
                className="leave__room" onClick= {Remove_User}
                dir="rtl">עזוב את החדר :(</Link>
            </IconButton>
        </div>

    );
  }

export default header;