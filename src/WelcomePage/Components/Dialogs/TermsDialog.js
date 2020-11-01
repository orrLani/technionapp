import React, { useContext } from "react";
import './LoginDialog.css'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AuthContext } from '../../../server/Auth';
import IconButton from '@material-ui/core/IconButton';

function TermsDialog({termsOpen, setTermsOpen}) {
    return (
        <Dialog
                dir="rtl"
                open={termsOpen}
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
    )
}

export default TermsDialog
