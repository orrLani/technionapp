import React,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Background0 from '../Images/0.jpg';
import Background1 from '../Images/1.jpg';
import Background2 from '../Images/2.jpg';
import Background3 from '../Images/3.jpg';
import CustomizedSnackbars from '../SignUpPage/message_alert'


// Dialog
import WelcomeMessageDialog from './WelcomeMessageDialog'

import logo from '../logo.png'
import firebase from '../server/firebase'
import {provider} from '../server/firebase'
// handle userState
import {AuthContext} from '../server/Auth'
import {useContext} from 'react'



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
       techat
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Background_list = [`url(${Background0})` ,
`url(${Background1})` ,
`url(${Background2})` ,
`url(${Background3})` 
];
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    //backgroundImage: '../Images/' + (Math.random()) % 4 + '.jpg',
    backgroundImage: Background_list[Math.floor(Math.random()*(4))],
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
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
    fontSize: 'large',
    alignSelf: 'center',
    padding: '2px',
  }
}));

const SignInSide=({history})=> {

  const[user,setUser] = useState('')
  const[password,setPassword] = useState('')
  
  
  

  const auth = useContext(AuthContext)
  const [alertState, setAlertState] = React.useState({
    open: false
  });

  const resetModal = () => {
    setUser("");
    setPassword("");
  };

  function handleSignIn(event){
    console.log({user})
    // console.log(password)
    event.preventDefault();

  
      
      
      firebase.auth()
      .signInWithEmailAndPassword(user+"@campus.technion.ac.il", password)
      .then(() => resetModal())
      .catch(err =>
      {
        // event.preventDefault();
        setAlertState({
          open: true,
          message : err.message,
          sevirity_level: "error"
        })
        

      }
        
      );

  }
  useEffect(() => {
    if(auth.currentUser) {
      history.push("/welcome")
    }
  }, [auth,history])

  function test_login() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // User is signed in.
        // IdP data available in result.additionalUserInfo.profile.
        // OAuth access token can also be retrieved:
        // result.credential.accessToken
        // OAuth ID token can also be retrieved:
        // result.credential.idToken
      })
      .catch(function (error) {
        // Handle error.
      });
  }
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
     
      {/* when first open */}
      <WelcomeMessageDialog history={history} />

      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div dir="rtl" className={classes.paper}>
          
          <img alt="logo" width='350px'src={logo}></img>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
           <Button onClick={test_login}>כפתור</Button>
          <Typography color="red" component="h1" variant="h5">
            התחברות
          </Typography>
          
          
          
        </div>
      </Grid>
    </Grid>
  );
}
export default SignInSide;