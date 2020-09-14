/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function MaritalStatus() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={status}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params}
       label="מצב משפחתי" variant="outlined" />}
    />
  );
}

const status = [
    { title:'רווק/ה'},
    { title:'תפוס/ה'} ,
    { title: 'נשוי/ה'},
    { title: 'אלמנ/ה'}

];
