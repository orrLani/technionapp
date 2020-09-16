/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { colors } from '@material-ui/core';

export default function CheckBoxHobbies() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={hobbies}  
      getOptionLabel={(option) => option.title}
      style={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="בחר תחום עניין" variant="outlined" />}
    />
  );
}


const hobbies = [
  { title: 'ספורט'},
  { title: 'משחקי מחשב'},
  { title: 'משחקי קופסא'},
  { title: 'מוזיקה'},
  { title: 'ספרים'},
  { title: 'ספורט אקסטרים'},
  { title: 'בדיחות'},
];