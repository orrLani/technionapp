import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PaymentForm from './PaymentForm.js';
import Review from './Review';

//our nice pages 
import FirstForm from './FirstForm'
//import AddressForm from './AddressForm';
import SecondForm from './SecondForm'


import rtl from "jss-rtl"
import {create} from "jss"
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
//Configure jss
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const rtlTheme = createMuiTheme({ direction: "rtl" });

//create copy-right at the bottom of the page. - create copy-right , create link , create date
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//create a style for the web
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

//the name of the steps of the loging up
const first_step = 'שם משתמש וסיסמא'
const second_step = 'קצת עליך'
const last_step = 'וידוא פרטים'
const steps = [first_step, second_step, last_step];

//conect the index of steps with the page himself.
function getStepContent(step) {
  switch (step) {
    case 0:
      return <FirstForm/>;
    case 1:
      return <SecondForm/>;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}
//the main function
export default function Checkout() {
  //initazion the style and the web
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  //change activeStep to be activeStep+1
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  //change activeStep to be activeStep-1
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  //the page himself that return
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            הרשמה לאתר
          </Typography>
          <Stepper activeStep={activeStep} dir="rtl" className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" dir="rtl" gutterBottom>
                  תודה רבה על ההרשמה
                </Typography>
                <Typography variant="subtitle1" dir="rtl">
                נשלח אליך קוד סודי למייל הטכניוני- לטובת ההרשמה ,תמלא את הקוד הסודי בתיבה הריקה
                </Typography>
                <Typography variant="subtitle1" dir="rtl">
                <TextField dir="rtl"
                  required
                   id="secret_code"
                    name="secret_code"
                  label="הקוד הסודי בבקשה"
                  fullWidth
                  />
              </Typography>
              <Typography variant="subtitle1" dir="rtl">
              <Button
                    variant="contained"
                    color="primary"
                    onClick='NONE'
                    className={classes.button}
                  >לחץ כאן לסיום
                  </Button>
              </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      הקודם
                    </Button>
                  )}
                  <Button
                    dir ="rtl"
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    
                    {activeStep === steps.length - 1 ? 'הגשת הטופס' : 'הבא'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}