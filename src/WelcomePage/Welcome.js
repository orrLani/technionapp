import './Welcome.css'
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
/* database and authentication */
import firebase from '../server/firebase'
import { AuthContext } from '../server/Auth'
import { useContext } from 'react'

/* makes Modal of chatpage */
import Modal from '@material-ui/core/Modal';
import Chatpage from '../chatpage/Chatpage'
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';

/* chat ContextAPI */
import { ChatContext } from '../server/ChatProvider'

/* Loading page */
import Loading from '../Loading'

/* Chat cards */
import FaculticChatCard from './Components/Cards/FaculticChatCard'
import TechnionChatCard from './Components/Cards/TechnionChatCard'

/* Dialogs */
import InsertNicknameDialog from './Components/Dialogs/InsertNicknameDialog'
import LoginDialog from './Components/Dialogs/LoginDialog'

import useMobileDetect from 'use-mobile-detect-hook';

const Welcome = ({ history }) => {

  /*Contexts API */
  const auth = useContext(AuthContext)
  const { chat, setChat } = useContext(ChatContext)

  /* handle nickname dialog */
  const [openInsertNicknameDialog, setOpenInsertNicknameDialog] = useState(false)

  /* handle login dialog */
  const [openLoginDialog, setOpenLoginDialog] = useState(true)
  
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if(isMobile){
      console.log("mobile!")
    }
    else{
      console.log("not mobile!")
    }
  },[navigator.userAgent])


  useEffect(() => {
    console.log(auth)
    const userLoggedIn = auth.currentUser
    setOpenLoginDialog(!userLoggedIn)
  }, [auth])

  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // history.push('/signin')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
    <div className="background_style">
      {/* in case user not logged in */}
      <LoginDialog />
      

      <div className="cards">
        <FaculticChatCard
          setChat={setChat}
          setOpenInsertNicknameDialog={setOpenInsertNicknameDialog}
        />

        <TechnionChatCard
          setChat={setChat}
          setOpenInsertNicknameDialog={setOpenInsertNicknameDialog}
        />
      </div>

      {/* fired when user clicks on add chat */}
      {openInsertNicknameDialog && (
        <InsertNicknameDialog
          open={openInsertNicknameDialog}
          setOpen={setOpenInsertNicknameDialog}
        />
      )}

      {/* Modal of the chatpage */}
      <Modal
        open={chat.is_open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={chat.is_open}>
          {chat.is_loading ? <Loading /> : <Chatpage />}
        </Fade>
      </Modal>

      {/* SignOut Button */}
      <Button id="signOut" onClick={signOut} variant="contained">
        התנתקות
      </Button>
    </div>
      <div className="techchat__logo">
        <div>TechChat</div>
        <div className="beta">Beta</div>
      </div>
      </div>
  );
}

export default Welcome


