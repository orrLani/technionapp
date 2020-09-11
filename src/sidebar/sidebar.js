import React from "react";
import "./sidebar.css";

function sidebar() {
    return (
       
        <div class="chat-sidebar">
          <h3><i class="fas fa-comments"></i> Room Name:</h3>
          <h2 id="room-name"></h2>
          <h3><i class="fas fa-users"></i> Users</h3>
          <ul id="users"></ul>
        </div>
      
    );
}

export default sidebar;