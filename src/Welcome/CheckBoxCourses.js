/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { colors } from '@material-ui/core';

export default function CheckBoxCourses() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={courses} 
      getOptionLabel={(option) => option.title}
      style={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="בחר קורס" variant="outlined" />}
    />
  );
}


const courses = [
    { title: '234106 אינפי 1 מ '},
    { title: 'אלגברה א 102252'},
    { title: '234136 אינפי 2 מ'},
    { title: 'מבוא למדעי המחשב 121312'},
    { title: 'אלגורתמים 132432'},
    { title: 'מערכות הפעלה 312321'},
    { title: 'מבוא לבינה מלאכותית 999999'},
  ];
