/* eslint-disable no-use-before-define */

import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Courses() {
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={hobbies}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </React.Fragment>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="קורסים" placeholder="קורסים" />
      )}
    />
  );
      }
const hobbies = [
  { title: '234106 אינפי 1 מ '},
  { title: 'אלגברה א 102252'},
  { title: '234136 אינפי 2 מ'},
  { title: 'מבוא למדעי המחשב 121312'},
  { title: 'אלגורתמים 132432'},
  { title: 'מערכות הפעלה 312321'},
  { title: 'מבוא לבינה מלאכותית 999999'},
];