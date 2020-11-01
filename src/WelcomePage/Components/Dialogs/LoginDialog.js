import React, { useContext ,useState,useEffect} from "react";
import './LoginDialog.css'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { AuthContext } from '../../../server/Auth';
import IconButton from '@material-ui/core/IconButton';

import TermsDialog from './TermsDialog'
import AlertLoginDialog from './AlertLoginDialog'
/* backend */
import firebase, {provider} from '../../../server/firebase'

export default function WelcomeMessageDialog({history}) {
  const auth = useContext(AuthContext)
  const [open,setOpen] = useState(true)
  const [openTermsDialog,setOpenTermsDialog] = useState(false)

  /* to show if login success or failed */
  const [alertState, setAlertState] = useState({
    open: false,
    message: ''
  });
    useEffect(() => {
      const userLoggedIn = auth.currentUser 
      setOpen(!userLoggedIn)
    },[auth])

    function signIn() {
      firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        setAlertState({
          open: true,
          message: "התחברת בהצלחה!",
          sevirity_level: "success"
        })
      })
      .catch(function (error) {
        setAlertState({
          open: true,
          message: error.message,
          sevirity_level: "error"
        })
      });
    }
  return (
    <div>
      <div dir="rtl">
        <AlertLoginDialog
          alertState={alertState}
          setAlertState={setAlertState}
        />
      </div>
      <TermsDialog
        termsOpen={openTermsDialog}
        setTermsOpen={setOpenTermsDialog}
      />
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle dir="rtl" id="alert-dialog-title">
          {"ברוכים הבאים ל-TechChat!"}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText
            color="textPrimary"
            variant="h4"
            dir="rtl"
            id="alert-dialog-description"
          >
            {"ברוכים הבאים ל-TechChat!"}
          </DialogContentText>

          <DialogContentText
            color="textPrimary"
            variant="h6"
            dir="rtl"
            id="alert-dialog-description"
          >
            אתר צ'אטים אנונימי רק לסטודנטים בטכניון!
          </DialogContentText>
          <DialogContentText
            color="textPrimary"
            variant="h6"
            dir="rtl"
            id="alert-dialog-description"
          >
            כי גם בסמסטר קורונה ניתן להכיר ולדבר עם אנשים חדשים 🙂
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText
            color="textPrimary"
            variant="h4"
            dir="rtl"
            id="alert-dialog-description"
          >
            {"אז איך זה עובד?"}
          </DialogContentText>
          <DialogContentText
            color="textPrimary"
            variant="h6"
            dir="rtl"
            id="alert-dialog-description"
          >
            אתם נרשמים בקליק עם היוזר הטכניוני, בוחרים סוג צ'אט, נכנסים,
            ומתחילים לדבר. כמה פשוט 🙂
          </DialogContentText>
          <DialogContentText
            color="textPrimary"
            variant="h6"
            dir="rtl"
            id="alert-dialog-description"
          >
            הצ'אטים הם אנונימיים, קטנים, ונבחרים בצורה אוטומטית. אינכם יודעים
            בוודאות מי מתכתב איתכם, אלא אם תבחרו להיחשף. יש 2-3 אנשים בכל צ'אט,
            והכינוי שיוצג נבחר על ידכם. ניתן לבחור צ'אט לפי פקולטה, או צ'אט כללי
            עבור כל הטכניון.
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText
            color="textPrimary"
            variant="h6"
            dir="rtl"
            id="alert-dialog-description"
          >
            ההתחברות וכלל הפעילות באתר מקושרת למייל הטכניוני, למניעת ספאם ושימוש
            לרעה.
          </DialogContentText>
          <DialogContentText
            color="textPrimary"
            variant="h6"
            dir="rtl"
            id="alert-dialog-description"
          >
            <IconButton style={{ color: "gray" }} disabled size="small">
              בהרשמה אתם מסכימים
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => setOpenTermsDialog(true)}
              size="small"
            >
              לתנאי השימוש.
            </IconButton>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <div style={{ justifySelf: "center" }}>
            <Button
              size="large"
              style={{ justifySelf: "center" }}
              onClick={signIn}
              variant="contained"
              color="primary"
            >
              לכניסה
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
