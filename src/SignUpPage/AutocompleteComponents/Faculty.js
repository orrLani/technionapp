/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Faculty() {
  return (
    <Autocomplete dir="rtl"
      id="combo-box-demo"
      options={faculty}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => <TextField dir="rtl" {...params} label="פקולטה" variant="outlined" />}
    />
  );
}

const faculty = [

    { title:'הנדסת אווירונאוטיקה וחלל'},
    { title: 'הנדסה אזרחית וסביבתית' },
    { title: 'ארכיטקטורה ובינוי ערים' },
    { title: 'הנדסת ביוטכנולוגיה ומזון' },
    { title: 'ביולוגיה' },
    { title: 'הנדסה ביורפואית' },
    { title: 'הנדסת חשמל' },
    { title: 'כימיה'},
    { title: 'הנדסה כימית'},
    { title: 'מדעי המחשב'},
    { title: 'מתמטיקה'} ,
    { title: 'פיזיקה'},
    { title: 'רפואה'} ,
    { title: 'הנדסת תעשייה וניהול'} ,
    { title: 'חינוך למדע וטכנולוגיה'}

];

