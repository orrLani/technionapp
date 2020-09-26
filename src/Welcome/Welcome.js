import './styles.css'
import React,{useState} from 'react';
import Courses from '../SignUpPage/AutocompleteComponents/Courses'
import CheckBoxCourses from './CheckBoxCourses'
import CheckBoxHobbies from './CheckBoxHobbies'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {course_list, hobby_list} from '../AutoCmpleteLists';
import AutoCompleteField from '../SignUpPage/AutocompleteComponents/AutoCompleteField'





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

    console.log(course)

    history.push({
      pathname: '/chatpage',
      data: course // your data array of objects
    })

    }

    function HobbySubmit(event){

      console.log(hobby)

      history.push({
        pathname: '/chatpage',
        data: hobby // your data array of objects
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
  

