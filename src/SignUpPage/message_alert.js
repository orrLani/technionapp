import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars({alertState,setAlertState}) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertState({
      ...alertState,
      open: false
    })
  };
  
 

  return (
    <div className={classes.root} dir="ltr">
      <Snackbar open={alertState.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity= {alertState.sevirity_level}>
        {alertState.message}

          {/* {message} */}
        </Alert>
      </Snackbar>
    </div>
  );
}
