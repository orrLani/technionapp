import './styles.css'
import React,{useState} from 'react';
import Courses from '../SignUpPage/AutocompleteComponents/Courses'
import CheckBoxCourses from './CheckBoxCourses'
import CheckBoxHobbies from './CheckBoxHobbies'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {course_list, hobby_list} from '../AutoCmpleteLists';
import AutoCompleteField from '../SignUpPage/AutocompleteComponents/AutoCompleteField'

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


const Welcome = ({history}) =>  {

  const [course, setCourses] = useState('') 
  const [hobby, setHobby] = useState('')

  /*Contexts API */
  const auth = useContext(AuthContext)
  const [chat,setChat] = useContext(ChatContext)

  // chat loads
  const [chatLoading, setChatLoading] = useState(false)
  const [chatIsOpen, setChatIsOpen] = useState(false);

  function CoursesSubmit(event) {

    // var email, user_name;
    // var user_email = firebase.auth().currentUser.email;
    let user_name = auth.currentUser.email.split('@')[0]
    console.log(user_name)
    
    
  }
  function handleCloseChat() {
    setChatIsOpen(false)
  }

    function HobbySubmit(event){
      setChat({
        ...chat,
        isLoading: true
      })
      const addUserToChat = firebase.functions().httpsCallable('addUserToChat')
      addUserToChat({
        user_uid: auth.currentUser.uid,
        user_name: auth.currentUser.email.split('@')[0],
      }).then(chatRef => {
        console.log(chatRef)
        console.log(chatRef.data.chat_id)
        setChat({
          id: chatRef.data.chat_id,
          isLoading: false
        })
      })
      .catch(error =>{
        console.log(error)
      })

    setChatIsOpen(true)

    }
    // [Testing start]
  function test_add_chat() {
    const addUserToChat = firebase.functions().httpsCallable('addUserToChat')
    addUserToChat({
      user_uid: auth.currentUser.uid,
      user_name: auth.currentUser.email.split('@')[0],
    }).then(chat => {
      console.log(chat)
    })
    .catch(error =>{
      console.log(error)
    })
  }
    function test() {
      db.collection('rooms')
      .where('users_count','==',1)
      .get().then(snapshot => {
        //return room with 1 user, or undefined if not exist
       return snapshot.docs[0]
      })
      .then(room => {
        if(room) {
          room.ref.collection('users_on_page')
          .add({
            user_name: auth.currentUser.email.split('@')[0],
            user_uid: auth.currentUser.uid
          })
          room.ref.set({
            users_count: 2
          })
        }
        else {
          db.collection('rooms').add({})
          .then(room => {
            console.log(room.id)
            room.collection('users_on_page').add({
              user_name: auth.currentUser.email.split('@')[0],
              user_uid: auth.currentUser.uid

            })
            room.set({
              users_count: 1
            })

          })
        }
      })
    }
      // const say = firebase.functions().httpsCallable('getAmountOfRooms')
      // say({user_uid: auth.currentUser.uid}).then(result => {
      //   alert(result.data)
      // })
    //}

    // [Testing End]
    return (
      <div className="background_style">

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
                <Grid container justify="center" spacing={6} >
                <Grid item xs={12} container justify="center">
                <AutoCompleteField list={hobby_list} 
                            label="תחביבים" setFunction={setHobby} />
                   </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" 
                  onClick = {HobbySubmit} /*change here */
                > 
                 לחץ כאן 
                </Button>
              </Grid>
              </Grid>
              </div>
              </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={!chat.is_loading}
          onClose={handleCloseChat}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
            <Fade in={chatIsOpen}>
          <Chatpage ChatIsOpenFunction= {setChatIsOpen} />
          </Fade>
        </Modal>

      </div>
    );
  }

  export default Welcome
  

