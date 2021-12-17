import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from './utils/LinkedInPortal.json';
import twitterLogo from './assets/twitter-logo.svg';

  // Constants
  const TWITTER_HANDLE = 'Dape25';
  const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
  const contractAddress = "0x99D90ecD32fb32c361CfE43769356e4dA3633B05";
  const contractABI = abi.abi;

  const App = () => {
    // States
    const [currentAccount, setCurrentAccount] = useState("");
    const [inputValue, setInputValue] = useState('');

    // Actions
    const checkIfWalletIsConnected = async () => {    
      try {
        const { ethereum } = window;
  
        if (!ethereum) {
          console.log("Make sure you have metamask!");
          return;
        } else {
          console.log("We have the ethereum object", ethereum);
        }
        
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setCurrentAccount(account)
        } else {
          console.log("No authorized account found")
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    const connectWallet = async () => {
      try {
        const { ethereum } = window;
  
        if (!ethereum) {
          alert("Get MetaMask!");
          return;
        }
  
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  
        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]); 
      } catch (error) {
        console.log(error)
      }
    }

    const postProfile = async () => {
      try {
        const { ethereum } = window;
  
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const linkedinPortalContract = new ethers.Contract(contractAddress, contractABI, signer);
  
          let count = await linkedinPortalContract.getTotalProfiles();
          console.log("Retrieved total LinkedIn Profiles...", count.toNumber());

          const profileTxn = await linkedinPortalContract.postProfile();
          console.log("Mining...", profileTxn.hash);

          await profileTxn.wait();
          console.log("Mined -- ", profileTxn.hash);

          count = await linkedinPortalContract.getTotalProfiles();
          console.log("Retrieved total LinkedIn Profiles...", count.toNumber());
          
          console.log("Ethereum object doesn't exist!");
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error)
      }
    }

    const onInputChange = (event) => {
      const { value } = event.target;
      setInputValue(value);
    };

    const renderNotConnectedContainer = () => (
      <button
        className="walletButton"
        onClick={connectWallet}
      >
        Connect MetaMask Wallet
      </button>
    );

    const renderConnectedContainer = () => (
      <div className="connected-container">
        <div className="summary">
          Add a link to your LinkedIn Profile
        </div>
        
        <form
          onSubmit={(event) => {
          event.preventDefault();
          postProfile();
          }}
        >
          <div>
            <input
              type="text"
              placeholder="URL"
              value={inputValue}
              onChange={onInputChange}
            />
          </div>

          <button
            type="submit"
            className="profileButton"
          >
            Add LinkedIn
          </button>
          
        </form>

      </div>
    );

    // Use Effects
    useEffect(() => {
      console.log("Web 3.0 LinkedIn")
      checkIfWalletIsConnected();
    }, [])
  
  return (
    <div className="App">
      <div className="mainContainer">

        <div className="dataContainer">

          <div className="header">
          Web 3.0 LinkedIn
          </div>       

          {!currentAccount && renderNotConnectedContainer()}

          {currentAccount && renderConnectedContainer()}

        </div>

        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`@${TWITTER_HANDLE}`}</a>
        </div>

      </div>
    </div>
  );
}

export default App