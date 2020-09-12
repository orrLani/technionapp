import React from "react";
import "./Sidebar.css";

function Sidebar() {
    return (
      
        <div className="chat-sidebar">
          <h3 dir="rtl"> משתמשים:</h3>
          <div className="chat__username">גל</div>
          <div className="chat__username">אוריאן</div>
          <div className="chat__username">אור</div>
          <div className="chat__username">איתי</div>
          
          <ul id="users"></ul>
        </div>
        
      
    );
}

export default Sidebar;