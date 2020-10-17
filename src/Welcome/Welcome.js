import './styles.css'
import React,{useEffect, useState} from 'react';
//import Courses from '../SignUpPage/AutocompleteComponents/Courses'
import CheckBoxCourses from './CheckBoxCourses'
import CheckBoxHobbies from './CheckBoxHobbies'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {course_list, hobby_list} from '../AutoCmpleteLists';
import AutoCompleteField from '../SignUpPage/AutocompleteComponents/AutoCompleteField'
import NicknameField from './NicknameField'

/* database and authentication */
import firebase, { db } from '../server/firebase'
import {AuthContext} from '../server/Auth'
import {useContext} from 'react'

/* makes Modal of chatpage */
import Modal from '@material-ui/core/Modal';
import Chatpage from '../chatpage/Chatpage'
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';

/* joins chat */
import {getChatIDForUser} from '../server/ChatsManager'

/* chat ContextAPI */
import {ChatContext} from '../server/ChatProvider'

/* Loading page */
import Loading from '../Loading'



/* EmailConfirmation*/

import EmailConfirmation from './EmailConfirmation'

const Welcome = ({history}) =>  {

  const [course, setCourses] = useState('') 
  const [hobby, setHobby] = useState('')

  /*Contexts API */
  const auth = useContext(AuthContext)
  const [chat,setChat] = useContext(ChatContext)
  

  function CoursesSubmit(event) {
    // var email, user_name;
    // var user_email = firebase.auth().currentUser.email;
    let user_name = auth.currentUser.email.split('@')[0]
    console.log(user_name)
  }
  function handleCloseChat() {
    // setChatIsOpen(false)
  }

    function HobbySubmit(event){
      const deleteFromChat = firebase.functions().httpsCallable('removeUserFromChat')
      deleteFromChat({})
      .catch(error => {
        console.log(error)
      })


      console.log("I've been clicked!")
      setChat({
        ...chat,
        is_open: true,
        is_loading: true
      })
      // in case that user added new nickname, update in database
      console.log(auth)
      if (auth.nickNameHasChanged) {
        const setUserNickName = firebase.functions().httpsCallable('setUserNickName')
        setUserNickName({
          nickname: auth.currentUserNickName
        })
        .then(() => {
          auth.setNickNameHasChanged(false)
        })
        .catch(error => {
          console.log(error)
        })
      }
      const addUserToChat = firebase.functions().httpsCallable('addUserToChat')
      addUserToChat({
        user_nickname: auth.currentUserNickName
      }).then(chatRef => {
        {chat.DEBUG && console.log(chatRef)}
        {chat.DEBUG && console.log(chatRef.data.chat_id)}
        
        setChat({
          ...chat,
          is_open: true,
          id: chatRef.data.chat_id,
          is_loading: false,
          active_status: "WAITING_CHAT"
        })
      })
      .catch(error =>{
        alert("Error occured, please try again")
        setChat({
          ...chat,
          is_open: false,
          is_loading: false,
          id: undefined
        })
      })

    }

    useEffect(() => {
      {chat.DEBUG && console.log("Welcome is mounting!")}
      {chat.DEBUG && console.log(chat)}
      // const deleteFromChat = firebase.functions().httpsCallable('removeUserFromChat')
      // deleteFromChat({})
      // .catch(error => {
      //   console.log(error)
      // })
      return function cleanup() {
        {chat.DEBUG && console.log("Welcome is unmounting!")}
        {chat.DEBUG && console.log(chat)}
      }
    },[])


    //[TEST START]
    function test_add_user() {
      db.collection('rooms')
    .where('users_count','<=',2)
    .orderBy('users_count')
    .orderBy('timestamp_start')
    .limit(1)
    .get().then(snapshot => {
      //return room with 1 user, or undefined if not exist
      snapshot.docs.forEach(doc => {
        console.log(doc.data())
      })

    })
    }
    //[TEST END]


    return (
      <div className="background_style">
        {/* <EmailConfirmation emailVerified={auth.currentUser.emailVerified}/> */}
          <div className="card">
            <div className="card-image"></div>
            <div className="card-text">
              <h2>צ'אט לימודי</h2>
              <Grid container justify="center" spacing={6} >
                <Grid item xs={12} container justify="center">
                <AutoCompleteField list={course_list} 
                            label="קורסים" setFunction={setCourses}  />
                   
                </Grid>
                
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={CoursesSubmit} > 
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
                <Grid container justify="center" spacing={6}  dir="rtl">
                <Grid item xs={12} container justify="center">
                <AutoCompleteField list={hobby_list} 
                            label="תחביבים" setFunction={setHobby} />
                   </Grid>
                            <NicknameField />
                   
              <Grid item xs={12}>
                <Button variant="contained" color="primary" 
                  onClick = {test_add_user} 
                > 
                 לחץ כאן 
                </Button>
              </Grid>
              </Grid>
              </div>
              </div>
        <Modal
          // aria-labelledby="transition-modal-title"
          // aria-describedby="transition-modal-description"
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
              : <Chatpage /> }
           
          </Fade>
        </Modal>

      </div>
    );
  }

  export default Welcome
  

