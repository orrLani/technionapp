import './Welcome.css'
import React, { useEffect, useState } from 'react';
//import Courses from '../SignUpPage/AutocompleteComponents/Courses'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { course_list, hobby_list, faculty_list } from '../AutoCmpleteLists';
import AutoCompleteField from '../SignUpPage/AutocompleteComponents/AutoCompleteField'
import InsertNicknameDialog from './InsertNicknameDialog'

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



/* EmailConfirmation*/

import EmailConfirmation from './EmailConfirmation'

const Welcome = ({ history }) => {

  const [course, setCourse] = useState('')
  const [hobby, setHobby] = useState('')


  /*Contexts API */
  const auth = useContext(AuthContext)
  const { chat, setChat } = useContext(ChatContext)

  /* handle nickname dialog */
  const [insertNicknameDialogOpen, setInsertNicknameDialogOpen] = useState(false)

  useEffect(() => {
    console.log(course)
  }, [course])
  
  


  useEffect(() => {
    // { chat.DEBUG && console.log("Welcome is mounting!") }
    // { chat.DEBUG && console.log(chat) }
    // const deleteFromChat = firebase.functions().httpsCallable('removeUserFromChat')
    // deleteFromChat({})
    // .catch(error => {
    //   console.log(error)
    // })
    return function cleanup() {
      // { chat.DEBUG && console.log("Welcome is unmounting!") }
      // { chat.DEBUG && console.log(chat) }
    }
  }, [chat])

  useEffect(() => {
    console.log(auth)
    if (!auth.currentUser) {
      history.push('/signin')
    }
  }, [auth,history])



  return (
    <div className="background_style">
      
      <EmailConfirmation emailVerified={auth.currentUser && auth.currentUser.emailVerified}/>
      <div>
        {/* SignOut Button */}
        <Button onClick={() => {
          firebase.auth().signOut()
            .then(() => {
              // history.push('/signin')
            }).catch(error => {
              console.log(error)
            })
        }}
          variant="contained"
          // color="secondary"
          >התנתקות</Button>

      </div>
      <div className="cards">
        <div className="card">
          <div className="card-image"></div>
          <div className="card-text">
            <h2>צ'אט פקולטי</h2>
            <Grid container justify="center" spacing={6} >
              <Grid item xs={12} container justify="center">
                <AutoCompleteField list={faculty_list}
                  label="בחר/י פקולטה" setFunction={setCourse} />

              </Grid>
              
              <Grid item xs={12}>
                <Button variant="contained" color="primary"
                  onClick={() => {
                    console.log(course)
                    if (course.title === undefined) {
                      alert("אנא בחר/י פקולטה")
                    }
                    else {
                      setChat(chat => {
                        return {
                          ...chat,
                          title: course.title,
                        }
                      })
                      setInsertNicknameDialogOpen(true)
                    }
                  }} >
                  לחץ כאן
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>

        <div className="card">
          <div className="card-image card3"></div>
          <div className="card-text card3">
            <h2>צ'אט כלל טכניוני </h2>
            <Grid container justify="center" spacing={6} dir="rtl">
              <Grid item xs={12} container justify="center">
                <AutoCompleteField list={hobby_list}
                  label="תחביבים" setFunction={setHobby} />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary"
                  onClick={() => {
                    setChat(chat => {
                      //console.log(hobby)
                      if (hobby) {
                        return {
                          ...chat,
                          title: "צ'אט חברתי",
                          user_hobby: hobby.title,
                        }
                      }
                      else {
                        return {
                          ...chat,
                          title: "צ'אט חברתי",
                        }
                      }
                    })
                    setInsertNicknameDialogOpen(true)
                  }}
                >
                  לחץ כאן
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>

      {/* fired when user clicks on add chat */}
      {insertNicknameDialogOpen && <InsertNicknameDialog open={insertNicknameDialogOpen}
        setOpen={setInsertNicknameDialogOpen} />}

      {/* Modal of the chatpage */}
      <Modal
        open={chat.is_open}
        // onClose={handleCloseChat}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={chat.is_open}>
          {chat.is_loading
            ? <Loading />
            : <Chatpage />}

        </Fade>
      </Modal>

    </div>
  );
}

export default Welcome


