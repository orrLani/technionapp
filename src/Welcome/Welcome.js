import './styles.css'
import React from 'react';

function Welcome() {
    return (

        <html>
        <head>
          <meta charset="UTF-8" />
          <link rel="stylesheet" type="text/css" href="styles.css" />
        </head>
        <body>
          <div className="card">
            <div className="card-image"></div>
            <div className="card-text">
              <h2>צ'אט לימודי</h2>
              <p>Lorem ipsum dolor sit amet consectetur, Ducimus, repudiandae temporibus omnis illum maxime quod deserunt eligendi dolor</p>
            </div>
          </div>
          
          <div className="card">
              <div className="card-image card3"></div>
              <div className="card-text card3">
                <h2>צ'אט חברתי </h2>
                <p>Repudiandae corrupti amet temporibus omnis provident illum maxime. Ducimus, lorem ipsum dolor adipisicing elit</p>
              </div>
            </div>
        </body>
      </html>
      
    );
  }

  export default Welcome
  

