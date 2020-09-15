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
              <span className="date">4 days ago</span>
              <h2>Post One</h2>
              <p>Lorem ipsum dolor sit amet consectetur, Ducimus, repudiandae temporibus omnis illum maxime quod deserunt eligendi dolor</p>
            </div>
            <div className="card-stats">
              <div className="stat">
                <div className="value">4<sup>m</sup></div>
                <div className="type">read</div>
              </div>
              <div className="stat border">
                <div className="value">5123</div>
                <div className="type">views</div>
              </div>
              <div className="stat">
                <div className="value">32</div>
                <div className="type">comments</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-image card2"></div>
            <div className="card-text card2">
              <span className="date">1 week ago</span>
              <h2>Post Two</h2>
              <p>Adipisicing elit. Ducimus, repudiandae corrupti amet temporibus omnis provident illum maxime quod. Lorem ipsum dolor</p>
            </div>
            <div className="card-stats card2">
              <div className="stat">
                <div className="value">7<sup>m</sup></div>
                <div className="type">read</div>
              </div>
              <div className="stat border">
                <div className="value">7152</div>
                <div className="type">views</div>
              </div>
              <div className="stat">
                <div className="value">21</div>
                <div className="type">comments</div>
              </div>
            </div>
          </div>
          <div className="card">
              <div className="card-image card3"></div>
              <div className="card-text card3">
                <span className="date">3 week ago</span>
                <h2>Post Three</h2>
                <p>Repudiandae corrupti amet temporibus omnis provident illum maxime. Ducimus, lorem ipsum dolor adipisicing elit</p>
              </div>
              <div className="card-stats card3">
                <div className="stat">
                  <div className="value">5<sup>m</sup></div>
                  <div className="type">read</div>
                </div>
                <div className="stat border">
                  <div className="value">3021</div>
                  <div className="type">views</div>
                </div>
                <div className="stat">
                  <div className="value">15</div>
                  <div className="type">comments</div>
                </div>
              </div>
            </div>
        </body>
      </html>
      
    );
  }

  export default Welcome
  

