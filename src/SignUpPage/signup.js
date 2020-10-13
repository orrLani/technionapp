import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import firebase from '../server/firebase'


import {gender_list,semester_list,faculty_list,course_list,maritalstatus_list,hobby_list} from '../AutoCmpleteLists';
import BirthDay from './AutocompleteComponents/BirthDay'
import AutoCompleteField from './AutocompleteComponents/AutoCompleteField'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = ({history})=> {
  const classes = useStyles();


  //create const

    const[text_user, setUserName] = useState('')
    const[text_password, setPassword] = useState('')
    const[text_password_again, setPasswordAgain]=useState('')
    const [birthday, setBirthday] = useState('')
    const [gender, setGender ] = useState('')
    const [semester, setSemester ] = useState('')
    const [faculty, setFactulty] = useState('')
    const [course, setCourses] = useState('') 
    const [maritalstatus,setMaritalStatus] = useState('')
    const [hobby, setHobby] = useState('')


    async function handleSignUp(event) {
          
        if(text_password!==text_password_again){
           alert('password are not equal');
            return;
                   }

       console.log(text_user)
       event.preventDefault();
       
       const db = firebase.firestore()
       try {
         await firebase.auth().createUserWithEmailAndPassword(text_user+"@campus.technion.ac.il",text_password) 
         const user = firebase.auth().currentUser;
         db.collection("users").doc(user.uid).set({
             text_user: text_user,
             birthday: birthday,
             gender: gender,
             semester: semester,
             faculty: faculty,
             course: course,
             maritalstatus : maritalstatus,
             hobby: hobby


         }).then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

             

          

          console.log(birthday)
          console.log(user.get)

          console.log(user.uid)
          console.log(user.metadata)
          
          await user.sendEmailVerification();

        history.push("/popupverify");
       } catch(error) {
         alert(error)
       }
     
    }
    console.log("I'm in signup");
    
    
   


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          הרשמה
        </Typography>
        <form className={classes.form} noValidate onSubmit ={handleSignUp}>
          <Grid container spacing={2} dir="rtl">
            <Grid item xs={12}>
            <TextField
                    required
                    textAlign="right"
                    dir="rtl"
                    id="technionUser"
                    name="technionUser"
                    label="יוזר טכניוני"
                    fullWidth
                    variant="outlined"
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
                    variant="outlined"
                    onChange = {(event)=> {setPassword(event.target.value)}}
                />
            </Grid>    

            <Grid item xs={12}>
                <TextField
                    required
                    type="password"
                    id="password"
                    label="Error"
                    name="password"
                    label="חזור על הסיסמא בבקשה "
                    fullWidth
                    variant="outlined"
                     onChange = {(event)=> {
                    setPasswordAgain(event.target.value)
                     }}
                  /> 
            
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
                <AutoCompleteField list={faculty_list} 
                label="פקולטה" setFunction={setFactulty}  />
            </Grid>

            <Grid item xs={12}>
                <AutoCompleteField list={course_list} 
                label="קורסים" setFunction={setCourses}
                is_multiple = {true}  />
            </Grid>

            <Grid item xs={12}>
                <AutoCompleteField list={maritalstatus_list} 
                label="מצב משפחתי" setFunction={setMaritalStatus}  />
            </Grid>

            <Grid item xs={12}>
                <AutoCompleteField list={hobby_list} 
                label="תחביבים" setFunction={setHobby }  
                is_multiple ={true}/>
            </Grid>

            
            <Grid item xs={12}>
                <BirthDay setBirthday={setBirthday}/>
            </Grid>




            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="אני מצהיר שקראתי את תנאי השימוש"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignUp;
