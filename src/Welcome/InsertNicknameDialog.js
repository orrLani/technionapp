import React,{useContext, useEffect} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import {AuthContext} from '../server/Auth'
import {ChatContext} from '../server/ChatProvider'
export default function InsertNicknameDialog({ open, setOpen, submitFunction }) {
    const chatContext = useContext(ChatContext)
    const auth = useContext(AuthContext)
    const handleSubmit = async () => {
        setOpen(false);
        console.log("in handle submit")
        chatContext.setChat(chat => {
            return{
                ...chat,
                is_open: true,
                is_loading: true
            }
        })
        // chat.addUserToChat()
        chatContext.addNewChat(auth)
    };

    return (
        <div dir="rtl">
            <Dialog
                open={open}
                onClose={() => {setOpen(false)}}
                aria-labelledby="form-dialog-title"
            >
                <DialogContent dir="rtl">
                    <DialogContentText dir="rtl">בחר/י כינוי:</DialogContentText>
                    <TextField id="nickname"
                        value={auth.currentUserNickName}
                        variant="outlined"
                        onChange={(e) => {
                            auth.setNickNameHasChanged(true)
                            return auth.setCurrentUserNickName(e.target.value)
                            console.log("hello")
                        }}>
                    </TextField>
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
