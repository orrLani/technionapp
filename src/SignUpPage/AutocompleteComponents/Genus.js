/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Genus() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={genus}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="מין" variant="outlined" />}
    />
  );
}

const genus = [

    { title:'זכר'},
    { title: 'נקבה'},
    { title: 'אחר'}
 

];
