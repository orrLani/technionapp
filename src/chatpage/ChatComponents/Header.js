import React from "react";
import "./Header.css";
//import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';

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
        <div className="chat-header" >
            <h2 className="room_name">{ name[1].title}</h2> 
            {/* <h2 clasName="room__name"> אינפי 1מ</h2> */}
           {/* {value} */}
            
            {/* <IconButton>
            <Link variant="body2"
                to= "/welcome"
                className="leave__room"
                dir="rtl">עזוב את החדר :(</Link>
            </IconButton> */}
            <Link className="leaving_room"
                to= "/welcome"
                onClick= {Remove_User}
                replace 
               >עזוב את החדר :(</Link>


        </div>

    );
  }

export default header;