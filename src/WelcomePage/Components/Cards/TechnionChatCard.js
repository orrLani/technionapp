import React, { useState } from 'react';
//import Courses from '../SignUpPage/AutocompleteComponents/Courses'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {hobby_list } from '../../../AutoCmpleteLists';
import AutoCompleteField from '../../../SignUpPage/AutocompleteComponents/AutoCompleteField'

function TechnionChatCard({setChat,setOpenInsertNicknameDialog}) {
    const [hobby,setHobby] = useState(null)

    function handleSubmit() {
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
          setOpenInsertNicknameDialog(true)
    }
    return (
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
                  onClick={handleSubmit}
                >
                  לחץ כאן
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
    )
}

export default TechnionChatCard
