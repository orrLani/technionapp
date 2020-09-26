import React from "react";
import "./Header.css";
import Link from '@material-ui/core/Link';

import {Avatar, IconButton} from "@material-ui/core"

function header() {
    return (
        
        <div className="chat-header">
            <h2 className="course__number">104666</h2>
            <h2 clasName="room__name"> אינפי 1מ</h2>
            <IconButton>
            <Link href="/welcome" variant="body2"
                className="leave__room"
                dir="rtl">עזוב את החדר :(</Link>
            </IconButton>
        </div>

    );
}

export default header;