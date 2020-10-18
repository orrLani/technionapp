import React, { useContext ,useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AuthContext } from '../server/Auth';


export default function EmailConfirmation({ emailVerified }) {
  console.log(emailVerified)
  const [message,setMessage] = useState("")
  const auth = useContext(AuthContext)
  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  return (
    <div>
      <Dialog
        open={!emailVerified}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"לצורך שימוש בצאטים אתה צריך לאשר את המשתמש"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText dir="rtl" id="alert-dialog-description">
            אם אינך מוצא, נסה לחפש בספאם
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <DialogContentText>
          {message}
          </DialogContentText>
          <Button 
          onClick={() => {
            setMessage("נשלח וידוא, אנא בדוק/י את תיבת המייל ונסה שוב")
            auth.currentUser.sendEmailVerification()
            console.log(auth.currentUser)
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
