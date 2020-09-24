import React,{useState, useCallback, useEffect} from "react";
import {withRouter} from "react-router"
import firebase from './server/firebase'
import PopUpVerify from './SignUpPage/PopUpVerify'
import {Redirect} from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button  from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

import BirthDay from './SignUpPage/AutocompleteComponents/BirthDay'
import AutoCompleteField from './SignUpPage/AutocompleteComponents/AutoCompleteField'
import {gender_list,semester_list,faculty_list,course_list,maritalstatus_list,hobby_list} from './AutoCmpleteLists';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// // function FormDialog() {
// //     const [open, setOpen] = React.useState(false);
  
// //     const handleClickOpen = () => {
// //       setOpen(true);
// //     };
  
// //     const handleClose = () => {
// //       setOpen(false);
// //     };
  
//     return (
//       <div>
//         <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//           Open form dialog
//         </Button>
//         <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//           <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
//           <DialogContent>
//             <DialogContentText>
//               To subscribe to this website, please enter your email address here. We will send updates
//               occasionally.
//             </DialogContentText>
//             <TextField
//               autoFocus
//               margin="dense"
//               id="name"
//               label="Email Address"
//               type="email"
//               fullWidth
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} color="primary">
//               Cancel
//             </Button>
//             <Button onClick={handleClose} color="primary">
//               Subscribe
  //           </Button>
  //         </DialogActions>
  //       </Dialog>
  //     </div>
  //   );
  // }
const Learn = ({history}) => {
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

        async function handleSignUp(event) {
           //TODO - check passwords equal
           console.log(text_user)
           event.preventDefault();
           try {
             await firebase
              .auth()
              .createUserWithEmailAndPassword(text_user+"@campus.technion.ac.il",text_password);
              const user = firebase.auth().currentUser;
              await user.sendEmailVerification();

            history.push("/popupverify");
           } catch(error) {
             alert(error)
           }
         
        }
        console.log("I'm in signup");
        
        
       

          
        

    return(
            <form onSubmit = {handleSignUp}>
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
                                label="Error"
                                name="password"
                                label="חזור על הסיסמא בבקשה "
                                fullWidth
                                onChange = {(event)=> {
                                    setPasswordAgain(event.target.value)
                                    }}
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
                            label="תחביבים" setFunction={setHobby   }  />
                        </Grid>
                        

                        <Grid item xs={12}> 
                            <Button
                                type="submit"
                                dir ="rtl"
                                variant="contained"
                                color="primary"
                            > לחץ להגשה
                            </Button>
                        </Grid>

                    </Grid>    
                </React.Fragment>
            </form>

    );


  }
  
  export default Learn;