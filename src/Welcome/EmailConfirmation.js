import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function EmailConfirmation({emailVerified}) {
console.log(emailVerified)

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
          <DialogContentText id="alert-dialog-description">
            למה אין אישור
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button  color="primary">
            Disagree
          </Button>
          <Button  color="primary" autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
