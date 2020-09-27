import './styles.css'
import React,{useState} from 'react';
import Courses from '../SignUpPage/AutocompleteComponents/Courses'
import CheckBoxCourses from './CheckBoxCourses'
import CheckBoxHobbies from './CheckBoxHobbies'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {course_list, hobby_list} from '../AutoCmpleteLists';
import AutoCompleteField from '../SignUpPage/AutocompleteComponents/AutoCompleteField'
import firebase from '../server/firebase'



{/* <html>
<head>
  <meta charset="UTF-8" />
  <link rel="stylesheet" type="text/css" href="styles.css" />
</head>
<body> */}


const Welcome = ({history}) =>  {

  const [course, setCourses] = useState('') 
  const [hobby, setHobby] = useState('')


  function CoursesSubmit(event) {
    
    var  email,user_name;
    var user_email = firebase.auth().currentUser.email;
    user_name = user_email.split('@')[0]
    console.log(user_name)

    history.push({
      pathname: '/chatpage',
      data: [user_name,course] // your data array of objects
    })

    }

    function HobbySubmit(event){

    console.log(hobby)    
    var  email,user_name;
    var user_email = firebase.auth().currentUser.email;
    user_name = user_email.split('@')[0]
    console.log(user_name)

    history.push({
      pathname: '/chatpage',
      data: [user_name,hobby] // your data array of objects
    })


    }



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
                  onClick = {HobbySubmit}
                > 
                 לחץ כאן 
                </Button>
              </Grid>
              </Grid>
              </div>
              </div>

      </div>
    );
  }

  export default Welcome
  

