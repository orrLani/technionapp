import React, { useContext ,useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AuthContext } from '../server/Auth';


export default function WelcomeMessageDialog({history}) {
  const auth = useContext(AuthContext)
  const [open,setOpen] = useState(true)

    const handleClose = () => {
      setOpen(false);
    };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle dir="rtl" id="alert-dialog-title">
          {"ברוכים הבאים ל-TechChat!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText dir="rtl" id="alert-dialog-description">
            אתר צ'אטים אנונימי רק לסטודנטים בטכניון!
          </DialogContentText>
            <DialogContentText dir="rtl" id="alert-dialog-description">
            כי גם בסמסטר קורונה ניתן להכיר ולדבר עם אנשים חדשים :)
            </DialogContentText>
            <DialogContentText dir="rtl" id="alert-dialog-description">
            בכניסה הראשונית יש להירשם לאתר.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
          onClick={() => {
            setOpen(false)
          }} 
          color="primary"
          >
            סגור
          </Button>

          <Button 
          onClick={() => {
            setOpen(false)
            history.push("/signup")
          }} 
          color="primary"
          >
            להרשמה
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
