import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

//for buttun choose
import Semster from './AutocompleteComponents/Semster'

import Faculty from './AutocompleteComponents/Faculty'

import Hobbies from './AutocompleteComponents/Hobbies'

import BirthDay from './AutocompleteComponents/BirthDay'

import Genus from './AutocompleteComponents/Genus'

import MaritalStatus from './AutocompleteComponents/MaritalStatus'

import Courses from './AutocompleteComponents/Courses'




export default function SecondForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" dir="rtl"  gutterBottom>
פרטיים אישיים  
      </Typography>
      <Grid dir="rtl" container spacing={5}>
        <Grid item xs={12}>
          <BirthDay/>
        </Grid>
        <Grid item xs={12}>
          <Genus/>
        </Grid>
        <Grid item xs={12}>
          <MaritalStatus/>
        </Grid>
        <Grid item xs={12}>
          <Hobbies/>
        </Grid>
      </Grid>
      <Typography variant="h6" dir="rtl"  gutterBottom>
        פרטים לימודיים
      </Typography>
      <Grid dir="rtl" container spacing={5}> 
        <Grid item xs={12} >
            <Semster/>
        </Grid>
        <Grid item xs={12}>
            <Faculty/>
        </Grid>
        <Grid item xs={12}>
          <Courses/>
        </Grid>
      </Grid>

    </React.Fragment>
  );
}