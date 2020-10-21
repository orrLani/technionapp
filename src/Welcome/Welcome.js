import './styles.css'
import React, { useEffect, useState } from 'react';
//import Courses from '../SignUpPage/AutocompleteComponents/Courses'
import CheckBoxCourses from './CheckBoxCourses'
import CheckBoxHobbies from './CheckBoxHobbies'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { course_list, hobby_list } from '../AutoCmpleteLists';
import AutoCompleteField from '../SignUpPage/AutocompleteComponents/AutoCompleteField'
import NicknameField from './NicknameField'
import InsertNicknameDialog from './InsertNicknameDialog'

/* TESTING, CAN DELETE */
import fb from 'firebase'
/* database and authentication */
import firebase, { db } from '../server/firebase'
import { AuthContext } from '../server/Auth'
import { useContext } from 'react'

/* makes Modal of chatpage */
import Modal from '@material-ui/core/Modal';
import Chatpage from '../chatpage/Chatpage'
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';

/* joins chat */
import { getChatIDForUser } from '../server/ChatsManager'

/* chat ContextAPI */
import { ChatContext } from '../server/ChatProvider'

/* Loading page */
import Loading from '../Loading'



/* EmailConfirmation*/

import EmailConfirmation from './EmailConfirmation'

const Welcome = ({ history }) => {

  const [course, setCourse] = useState('')
  const [hobby, setHobby] = useState('')

  /* in order to know if the chat is חברתי or לימודי */
  const [chatType, setChatType] = useState('')

  /*Contexts API */
  const auth = useContext(AuthContext)
  const { chat, setChat } = useContext(ChatContext)

  /* handle nickname dialog */
  const [insertNicknameDialogOpen, setInsertNicknameDialogOpen] = useState(false)

  useEffect(() => {
    console.log(course)
  }, [course])
  function CoursesSubmit(event) {
    // var email, user_name;
    // var user_email = firebase.auth().currentUser.email;
    let user_name = auth.currentUser.email.split('@')[0]
    console.log(user_name)
  }
  function handleCloseChat() {
    // setChatIsOpen(false)
  }


  useEffect(() => {
    { chat.DEBUG && console.log("Welcome is mounting!") }
    { chat.DEBUG && console.log(chat) }
    // const deleteFromChat = firebase.functions().httpsCallable('removeUserFromChat')
    // deleteFromChat({})
    // .catch(error => {
    //   console.log(error)
    // })
    return function cleanup() {
      { chat.DEBUG && console.log("Welcome is unmounting!") }
      { chat.DEBUG && console.log(chat) }
    }
  }, [])

  useEffect(() => {
    console.log(auth)
    if (!auth.currentUser) {
      console.log("from welcome to signin")
      history.push('/signin')
    }
  }, [auth])



  return (
    <div className="background_style">
      {/* <EmailConfirmation emailVerified={auth.currentUser && auth.currentUser.emailVerified}/> */}
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
          color="secondery">התנתקות</Button>

      </div>
      <div className="cards">
        <div className="card">
          <div className="card-image"></div>
          <div className="card-text">
            <h2>צ'אט לימודי</h2>
            <Grid container justify="center" spacing={6} >
              <Grid item xs={12} container justify="center">
                <AutoCompleteField list={course_list}
                  label="קורסים" setFunction={setCourse} />

              </Grid>
              {/* <NicknameField id={1} /> */}
              <Grid item xs={12}>
                <Button variant="contained" color="primary"
                  onClick={() => {
                    console.log(course)
                    if (course.title === undefined) {
                      alert("אנא בחר/י קורס")
                    }
                    else {
                      setChatType("Learning")
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
            <h2>צ'אט חברתי </h2>
            <Grid container justify="center" spacing={6} dir="rtl">
              <Grid item xs={12} container justify="center">
                <AutoCompleteField list={hobby_list}
                  label="תחביבים" setFunction={setHobby} />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary"
                  onClick={() => {
                    setChatType("Friendly")
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
        onClose={handleCloseChat}
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


