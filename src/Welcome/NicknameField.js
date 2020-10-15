import React,{useContext} from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {AuthContext} from '../server/Auth'
function NicknameField() {
    const auth = useContext(AuthContext)
    
    return (
        
        <TextField id="nickname"
                   value={auth.currentUserNickName}
                   label="בחר/י כינוי"
                   variant="outlined"
                    onChange = {(e) => {
                        auth.setNickNameHasChanged(true)
                        return auth.setCurrentUserNickName(e.target.value)
                        }}>
                   </TextField>
            
    )
}

export default NicknameField
