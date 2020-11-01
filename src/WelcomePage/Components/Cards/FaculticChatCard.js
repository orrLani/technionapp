import React, { useState } from 'react';
//import Courses from '../SignUpPage/AutocompleteComponents/Courses'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {faculty_list } from '../../../AutoCmpleteLists';
import AutoCompleteField from '../../../SignUpPage/AutocompleteComponents/AutoCompleteField'


function FaculticChatCard({setChat,setOpenInsertNicknameDialog}) {
    const [faculty,setFaculty] = useState('')
    function handleSubmit() {
        console.log(faculty)
        if (faculty.title === undefined) {
          alert("אנא בחר/י פקולטה")
        }
        else {
          setChat(chat => {
            return {
              ...chat,
              title: faculty.title,
            }
          })
          setOpenInsertNicknameDialog(true)
        }
    }
    return (
        <div className="card">
          <div className="card-image"></div>
          <div className="card-text">
            <h2>צ'אט פקולטי</h2>
            <Grid container justify="center" spacing={6} >
              <Grid item xs={12} container justify="center">
                <AutoCompleteField list={faculty_list}
                  label="בחר/י פקולטה" setFunction={setFaculty} />

              </Grid>
              
              <Grid item xs={12}>
                <Button variant="contained" color="primary"
                  onClick={handleSubmit} >
                  לחץ כאן
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
    )
}

export default FaculticChatCard
