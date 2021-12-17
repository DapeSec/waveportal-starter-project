import * as React from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

  const wave = () => {
    
  }
  
  return (
    <div className="App">
      <div className="mainContainer">

        <div className="dataContainer">

          <div className="header">
          Web 3.0 LinkedIn Profiles
          </div>

          <div className="summary">
          Add a link to your LinkedIn Profile to be displayed as a Web 3.0 dev!
          </div>

          <button className="profileButton" onClick={wave}>
            Post LinkedIn
          </button>
          
        </div>
      </div>
    </div>
  );
}
