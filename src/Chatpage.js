import './Chatpage.css'
import React, {useState} from 'react';
import './App.css';
import Sidebar from './ChatComponents/Sidebar'
import Chat from './Chat'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from "./Login"
import { useStateValue } from './StateProvider';
function Chatpage() {
    return (
        <div className="chatpage__body">
            <Router>
            <Sidebar />
          <Switch>

            <Route path="/rooms/:roomId">
              <Chat />              
            </Route>
            <Route path="/">
            <Chat />
            </Route>
          </Switch>
        </Router>
        </div>
    )
}

export default Chatpage
