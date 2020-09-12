import React from "react";
import "./Header.css";
import {Avatar, IconButton} from "@material-ui/core"

function header() {
    return (
        
        <div className="chat-header">
            <h2 className="course__number">104666</h2>
            <h2 clasName="room__name"> אינפי 1מ</h2>
            <IconButton>
                <h3 href="index.html" 
                className="leave__room"
                dir="rtl">עזוב את החדר :(</h3>
            </IconButton>
        </div>

    );
}

export default header;