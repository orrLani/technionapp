import React,{useState} from 'react';
import {AuthContext} from '../server/Auth'
import {db} from '../server/firebase'
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
import CustomizedSnackbars from './message_alert'

import {gender_list,semester_list,faculty_list,course_list,maritalstatus_list,hobby_list} from '../AutoCmpleteLists';
import BirthDay from './AutocompleteComponents/BirthDay'
import AutoCompleteField from './AutocompleteComponents/AutoCompleteField'

//terms of use dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import firebase from '../server/firebase'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        TechChat
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
  tech_user: {
    display: 'flex',
    flex: 1,
  },
  mailSuffix: {
    flex: 1,
    fontSize: 'x-large',
    alignSelf: 'center',
    padding: '2px',
  }
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

    //terms of use windows
    const [termsOpen,setTermsOpen] = useState(false)
    const [termsChecked, setTermsChecked] = useState(false)
    const [alertState, setAlertState] = React.useState({
      open: false
    });

    // Auth Context
    const auth = React.useContext(AuthContext)

    const handleClick = () => {
      // setState({
      //   open: true
      // });
    };


    async function handleSignUp(event) {
      event.preventDefault();

      try {
        if (!termsChecked) {
          event.preventDefault();
          // setAlertState({
          //   open: true,
          //   message: " למה הוא אישר את תנאי השימוש ",
          //   sevirity_level: "error"
          // })
          throw new Error("צריך לאשר את תנאי השימוש");
        }

        if (text_password !== text_password_again) {
          event.preventDefault();
          throw new Error("סיסמאות לא תואמות");
        }

        console.log(text_user);

        await firebase
          .auth()
          .createUserWithEmailAndPassword(
            text_user + "@campus.technion.ac.il",
            text_password
          );
        const user = firebase.auth().currentUser;
        await db.collection("users").doc(user.uid).set({
          text_user: text_user,
          birthday: birthday,
          gender: gender,
          semester: semester,
          faculty: faculty,
          course: course,
          maritalstatus: maritalstatus,
          hobby: hobby,
          nickname: "default",
        });
        console.log(auth.currentUser);

        //  }).then(function() {
        //     console.log("Document successfully written!");
        // })
        // .catch(function(error) {
        //    console.error("Error writing document: ", error);
        // });

        console.log(birthday);
        console.log(user.get);

        console.log(user.uid);
        console.log(user.metadata);

        await user.sendEmailVerification();

        history.push("/popupverify");
      } catch (error) {
        console.log(error.stack);
        console.log(error.message);

        event.preventDefault();
        setAlertState({
          open: true,
          message: error.message,
          sevirity_level: "error",
        });
      }
    }
    
    
    
   


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
        <form className={classes.form} noValidate onSubmit={handleSignUp}>
          <Grid container spacing={2} dir="rtl">
            <Grid item xs={12}>
              <div className={classes.tech_user}>
                <div dir="ltr" className={classes.mailSuffix}>
                  @campus.technion.ac.il
                </div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fontSize="large"
                  fullWidth
                  id="user"
                  label="משתמש טכניוני"
                  name="user"
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                  autoFocus
                />
              </div>
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
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
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
                onChange={(event) => {
                  setPasswordAgain(event.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <AutoCompleteField
                list={gender_list}
                label="מין"
                setFunction={setGender}
              />
            </Grid>

            <Grid item xs={12}>
              <AutoCompleteField
                list={semester_list}
                label="סמסטר"
                setFunction={setSemester}
              />
            </Grid>

            <Grid item xs={12}>
              <AutoCompleteField
                list={faculty_list}
                label="פקולטה"
                setFunction={setFactulty}
              />
            </Grid>

            <Grid item xs={12}>
              <AutoCompleteField
                list={course_list}
                label="קורסים"
                setFunction={setCourses}
                is_multiple={true}
              />
            </Grid>

            <Grid item xs={12}>
              <AutoCompleteField
                list={maritalstatus_list}
                label="מצב משפחתי"
                setFunction={setMaritalStatus}
              />
            </Grid>

            <Grid item xs={12}>
              <AutoCompleteField
                list={hobby_list}
                label="תחביבים"
                setFunction={setHobby}
                is_multiple={true}
              />
            </Grid>

            <CustomizedSnackbars
              alertState={alertState}
              setAlertState={setAlertState}
            />

            {/* <Snackbar
              open={state.open}
             
            >
              <Alert severity="error">
              password is not equal
              </Alert>
              </Snackbar> */}

            {/* <Grid item xs={12}>
                <BirthDay setBirthday={setBirthday}/>
            </Grid> */}

            <Grid style={{ display: "flex" }} item xs={12}>
              <div style={{ marginRight: "40%" }}>
                <Link onClick={() => setTermsOpen(true)}>תנאי השימוש</Link>
              </div>
              <Dialog
                dir="rtl"
                open={termsOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setTermsOpen(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">
                  {"תנאי השימוש באתר"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    אני מאשר/ת שכל שימוש באתר על אחריותי בלבד ולא על מפתחיו. אני
                    מאשר/ת שאסור לי להשתמש באתר למטרות זדוניות, ואסור לי לפגוע
                    במשתמשים אחרים המשתמשים באתר. אני מאשר/ת שכל תוכן שאני מעלה
                    לאתר הוא על אחריותי בלבד ולא תהיה לי עילה כנגד מפתחיו במקרה
                    של פעולות זדוניות.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setTermsOpen(false)} color="primary">
                    סגור
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked = {termsChecked}
                 id={'confirmed'} 
                 required 
                 value="allowExtraEmails"
                  color="primary" />}
                  onChange = {() => setTermsChecked(terms => {
                    return !terms
                  })}
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
            הרשמה
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                כבר יש חשבון? לחצ/י כאן להתחברות
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
