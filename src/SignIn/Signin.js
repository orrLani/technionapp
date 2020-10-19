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


import firebase from '../server/firebase'
import { SystemUpdate } from '@material-ui/icons';

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
}));

const SignInSide=({history})=> {

  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  
  
  const [modal, setModal] = useState(false);

  const auth = useContext(AuthContext)
  const [alertState, setAlertState] = React.useState({
    open: false
  });

  const resetModal = () => {
    setModal(false);
    setEmail("");
    setPassword("");
  };

  function handleSignIn(event){
    console.log(email)
    console.log(password)
    event.preventDefault();

  
      
      
      firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
      //   console.log("from sign in to welcome")
      //  history.push("/welcome")
      })
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
  }, [auth])
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit = {handleSignIn} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange = {(event)=> {setEmail(event.target.value)}}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange = {(event)=> {setPassword(event.target.value)}}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <CustomizedSnackbars alertState={alertState}
             setAlertState={setAlertState}/>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
export default SignInSide;