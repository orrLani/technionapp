import './styles.css'
import React from 'react';
import Courses from '../SignUpPage/AutocompleteComponents/Courses'
import CheckBoxCourses from './CheckBoxCourses'
import CheckBoxHobbies from './CheckBoxHobbies'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

function Welcome() {
    return (

        <html>
        <head>
          <meta charset="UTF-8" />
          <link rel="stylesheet" type="text/css" href="styles.css" />
        </head>
        <body>
          <div className="card">
            <div className="card-image"></div>
            <div className="card-text">
              <h2>צ'אט לימודי</h2>
              <Grid container justify="center" spacing={6} >
                <Grid item xs={12} container justify="center"> <CheckBoxCourses /></Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" disableElevation> 
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
                <Grid item xs={12} container justify="center"> <CheckBoxHobbies /></Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" disableElevation> 
                 לחץ כאן 
                </Button>
              </Grid>
              </Grid>
              </div>
              </div>
        </body>
      </html>
      
    );
  }

  export default Welcome
  

