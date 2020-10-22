/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function AutoCompleteField(props) {
  return (
    <Autocomplete
      multiple = {props.is_multiple}
      // id="combo-box-demo"
      options={props.list}
      getOptionLabel={(option) => option.title}
      style={{ width: 400 }}
      onChange = {(event,value)=> {
          props.setFunction(value)
            console.log("I have changed!")
            console.log(value)
        }}
      renderInput={(params) => 
      <TextField {...params} 
      label={props.label} variant="outlined"
       />}
    />
  );
}

