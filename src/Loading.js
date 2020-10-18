import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

    return (
        <div style={{
            display: 'grid',
            placeItems: 'center',
            height: '50vh',
        }}>
            <div className={classes.root}>
                <CircularProgress />
            </div>
        </div>
    );
}