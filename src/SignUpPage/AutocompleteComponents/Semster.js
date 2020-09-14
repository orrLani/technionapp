/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Semster() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={semster}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="סמסטר" variant="outlined" />}
    />
  );
}

const semster = [

    { title: 'א', year: 1 },
    { title: 'ב', year: 1 },
    { title: 'ג', year: 2 },
    { title: 'ד', year: 2 },
    { title: 'ה', year: 3 },
    { title: 'ו', year: 3 },
    { title: 'ז', year: 4 },
    { title: 'ח', year: 4 }
];
  