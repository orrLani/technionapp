import React, { useContext ,useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AuthContext } from '../server/Auth';
import firebase from 'firebase'

/* Modal in welcomepage that opens if user didn't verified in email */
export default function EmailConfirmation({ emailVerified }) {
  const [message,setMessage] = useState("")
  const auth = useContext(AuthContext)

  return (
    <div>
      <Dialog
        open={!emailVerified}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"לצורך שימוש בצ'אטים הינך צריך/ה לאשר את המשתמש"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText dir="rtl" id="alert-dialog-description">
            אם אינך מוצא/ת, נסה/י לחפש בדואר הזבל
          </DialogContentText>
          <DialogContentText dir="rtl">
          {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          

          
          <Button 
          onClick={() => {
            firebase.auth().signOut()
          }} 
          color="primary"
          
          >
            להחלפת משתמש
          </Button>
          
          
          <Button 
          onClick={() => {
            try{
              setMessage("נשלח וידוא בשנית, אנא בדק/י את תיבת הדואר ונסה/י שוב")
              auth.currentUser.sendEmailVerification()
              console.log(auth.currentUser)
            }
            catch{
              setMessage("קרתה שגיאה, נסה/י שוב")
            }
          }} 
          color="primary"
          disabled = {message !== ""}
          >
            שלח שוב
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
