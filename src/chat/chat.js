import React from "react";
import "./chat.css";
import sidebar from "../sidebar/sidebar.js";
import header from "../header/header.js";

function chat() {
    return (
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"
            integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk="
            crossorigin="anonymous"
          />
          <link rel="stylesheet" href="css/style.css" />
          <title>ChatCord App</title>
        </head>
        <body>
          <div class="chat-container">
            <header />
            <main class="chat-main">
             <sidebar />
              <div class="chat-messages"></div>
            </main>
            <div class="chat-form-container">
              <form id="chat-form">
                <input
                  id="msg"
                  type="text"
                  placeholder="Enter Message"
                  required
                  autocomplete="off"
                />
                <button class="btn"><i class="fas fa-paper-plane"></i> Send</button>
              </form>
            </div>
          </div>
          </body>
</html>

       

    );
}

export default chat;