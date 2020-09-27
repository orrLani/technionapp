import React from "react";
import "./Header.css";
import Link from '@material-ui/core/Link';

import {Avatar, IconButton} from "@material-ui/core"
import { NearMeOutlined } from "@material-ui/icons";
import firebase from '../../server/firebase'


function header(props) {
    const db = firebase.firestore()

function Remove_User(){
    db.collection("rooms").doc("1").collection("users_on_page").doc(props.document_uid).delete();


    // db
    // .collection("rooms")
    //  .doc('1')
    //  .collection("users_on_page")
    //  .add({
    //   user_name: name
    //   })

}



    const name = [props.data]
    console.log(name)
    let value =null
    if (name[0] !==undefined){
         value =name.map((x) =>
         <div className="room_name">
         <h2 >{x.title}</h2>
         console.log({x.title});
         </div>
         )
    }

    // const items = props.data.map((i) =>{
    //     return ( <h1>{i.title}</h1> )
    //  });
    return (
        <div className="chat-header">
            {/* <h2 className="course__number">104666</h2> */}
            {/* <h2 clasName="room__name"> אינפי 1מ</h2> */}
           {value}
            
            <IconButton>
            <Link href="/welcome" variant="body2"
                className="leave__room" onClick= {Remove_User}
                dir="rtl">עזוב את החדר :(</Link>
            </IconButton>
        </div>

    );
}

export default header;