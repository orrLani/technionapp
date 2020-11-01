import React,{useContext} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import {AuthContext} from '../../../server/Auth'
import {ChatContext} from '../../../server/ChatProvider'
export default function InsertNicknameDialog({ open, setOpen }) {
    const {setChat, addNewChat} = useContext(ChatContext)
    const auth = useContext(AuthContext)
    const handleSubmit = async () => {
        if (
          auth.currentUserNickName.length < 2 ||
          auth.currentUserNickName.length > 20
        ) {
          alert("כינוי חייב להכיל בין 2 ל-20 תווים");
        } else {
          setOpen(false);
          console.log("in handle submit");
          setChat((chat) => {
            return {
              ...chat,
              is_open: true,
              is_loading: true,
            };
          });
          // chat.addUserToChat()
          addNewChat(auth);
        }
    };

    return (
        <div dir="rtl">
            <Dialog
                open={open}
                onClose={() => {setOpen(false)}}
                aria-labelledby="form-dialog-title"
            >
                <DialogContent dir="rtl">
                    <DialogContentText variant="h6"  dir="rtl">בחר/י כינוי:</DialogContentText>
                    <DialogContentText variant="h6"  dir="rtl">אין חובה להזדהות בשמך.</DialogContentText>
                    <TextField id="nickname"
                        value={auth.currentUserNickName}
                        variant="outlined"
                        onChange={(e) => {
                            auth.setNickNameHasChanged(true)
                            return auth.setCurrentUserNickName(e.target.value)
                        }}>
                    </TextField>
                    <h3> </h3>
                    <DialogContentText classes={{
                        root: {
                            fontSize: '4px',
                            color: 'blue',
                        },
                    }} dir="rtl">זכר/י כי כל פעילות הגורמת עוול למשתמשים אחרים תגרור חסימה לאלתר.</DialogContentText>
                </DialogContent>
                <DialogActions align="center" dir="rtl">
                    <Button onClick={() => {setOpen(false)}} color="primary">
                        ביטול
                </Button>
                    <Button onClick={handleSubmit} color="primary">
                        כניסה
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
