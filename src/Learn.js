import React,{useState} from "react";
import TextField from '@material-ui/core/TextField';
import Button  from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

import BirthDay from './SignUpPage/AutocompleteComponents/BirthDay'
import AutoCompleteField from './SignUpPage/AutocompleteComponents/AutoCompleteField'
import {gender_list} from './AutoCmpleteLists';
import {semester_list} from './AutoCmpleteLists'
import {faculty_list} from './AutoCmpleteLists'
import {course_list} from './AutoCmpleteLists'
import {maritalstatus_list} from './AutoCmpleteLists'
import {hobby_list} from './AutoCmpleteLists'
function Learn() {

       // const list_gender = [
       // { title:'זכר'},
      ///  { title: 'נקבה'},
      //  { title: 'אחר'}
      //  ];

        const[text_user,setUserName] = useState('')
        const[text_password,setPassword] = useState('')
        const[text_password_again,setPasswordAgain]=useState('')
        const [birthday, setBirthday] = useState('')
        const [gender, setGender ] = useState('')
        const [semester, setSemester ] = useState('')
        const [faculty, setFactulty] = useState('')
        const [course, setCourses] = useState('') 
        const [maritalstatus,setMaritalStatus] = useState('')
        const [hobby, setHobby] = useState('')

        const handleClick = () =>{
           // console.log(text_user)
          //  console.log(text_password)
          //  console.log(text_password_again)
           // console.log(text_password===text_password_again)
           // console.log(birthday)
           // console.log(gender)
           console.log(semester)
        }
    return(
            <form>
                <React.Fragment dir="rtl">
                    <Grid container spacing={3} dir="rtl">
                        <Grid item xs={12} sm={6} dir="rtl">
                            <TextField
                                required
                                id="technionUser"
                                name="technionUser"
                                label="יוזר טכניוני"
                                fullWidth
                                autoComplete="given-name"
                                onChange = {(event)=> {setUserName(event.target.value)}}
                            />  
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                type="password"
                                id="password"
                                name="password"
                                label="סיסמא לאתר"
                                fullWidth
                                onChange = {(event)=> {setPassword(event.target.value)}}
                            /> 
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                type="password"
                                id="password"
                                name="password"
                                label="חזור על הסיסמא בבקשה "
                                fullWidth
                                onChange = {(event)=> {setPasswordAgain(event.target.value)}}
                            /> 
                        </Grid>

                        <Grid item xs={12}>
                            <BirthDay setBirthday={setBirthday}/>
                        </Grid>
                        
                        <Grid item xs={12}>
                            <AutoCompleteField list={gender_list} 
                            label="מין" setFunction={setGender}  />
                        </Grid>

                        <Grid item xs={12}>
                            <AutoCompleteField list={semester_list} 
                            label="סמסטר" setFunction={setSemester}  />
                        </Grid>

                        <Grid item xs={12}>
                            <AutoCompleteField list={semester_list} 
                            label="פקולטה" setFunction={setFactulty}  />
                        </Grid>

                        <Grid item xs={12}>
                            <AutoCompleteField list={faculty_list} 
                            label="פקולטה" setFunction={setFactulty}  />
                        </Grid>

                        <Grid item xs={12}>
                            <AutoCompleteField list={course_list} 
                            label="קורסים" setFunction={setCourses}  />
                        </Grid>

                        <Grid item xs={12}>
                            <AutoCompleteField list={maritalstatus_list} 
                            label="מצב משפחתי" setFunction={setMaritalStatus}  />
                        </Grid>

                        <Grid item xs={12}>
                            <AutoCompleteField list={hobby_list} 
                            label="תחביבים" setFunction={setHobby}  />
                        </Grid>
                        

                        <Grid item xs={12}> 
                            <Button
                                dir ="rtl"
                                variant="contained"
                                color="primary"
                                onClick={handleClick} 
                            > לחץ להגשה
                            </Button>
                        </Grid>

                    </Grid>    
                </React.Fragment>
            </form>

    );


  }
  
  export default Learn;