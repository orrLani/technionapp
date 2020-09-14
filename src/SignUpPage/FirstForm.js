import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import { enableRtl } from '@syncfusion/ej2-base';
//Enables Right to left alignment for all controls/
//enableRtl(true);

export default function FirstForm() {
  return (
    <React.Fragment dir="rtl">
      <Typography variant="h6" dir="rtl" gutterBottom>
        פרטי חובה
      </Typography>
      <Grid container spacing={3} dir="rtl">
        <Grid item xs={12} sm={6} dir="rtl">
          
          <TextField dir="rtl"
            required
            id="technionUser"
            name="technionUser"
            label="יוזר טכניוני"
            fullWidth
            autoComplete="given-name"
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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            type="password"
            id="password_return"
            name="password_return"
            label="חזור על הסיסמא בבקשה"
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}