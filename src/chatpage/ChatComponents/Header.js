import React from "react";
import "./Header.css";
import Link from '@material-ui/core/Link';

import {Avatar, IconButton} from "@material-ui/core"

function header(props) {
    const x = [props.data]
    console.log(x)
    let value =null
    if (x[0] !==undefined){
         value = x.map((x) =>
         <h2 className="room__name">{x.title}</h2>
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
                className="leave__room"
                dir="rtl">עזוב את החדר :(</Link>
            </IconButton>
        </div>

    );
}

export default header;