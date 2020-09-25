import React from 'react';
import Button  from '@material-ui/core/Button';



const PopUpVerify = ({history}) => {
async function handleClick(event) {

  history.push("/signin");
}

  
  return (
    <div>
        
          <div align="center" >
            <h2 >הפרטים הועברו בהצלחה</h2>
            <p >אנא היכנס אל התיבת מייל שלך לסיום ההרשמה</p>
            
            <Button type="submit" dir ="rtl" variant="contained" color="gray" onClick ={handleClick} >
            
               אישרתי
               </Button>
               
             
          </div>
       
    </div>
  );
 }

 export default  PopUpVerify;
