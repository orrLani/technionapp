import React from 'react';
import ReactDOM from 'react-dom';
//import {SignUp} from './SignUp'
import './index.css';
import App from './App';

//imoprt my file
import Checkout from './SignUp/Checkout'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // call to my page
  <React.StrictMode>
   <Checkout/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
