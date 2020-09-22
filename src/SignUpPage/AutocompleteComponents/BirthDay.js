import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function BirthDay(props) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="תאריך יום הולדת"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        onChange = {(event)=> {props.setBirthday(event.target.value)}}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}