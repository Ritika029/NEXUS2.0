import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const WalletCard = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const [showRedirectButton, setShowRedirectButton] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const connectWalletHandler = () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            console.log('MetaMask Here!');

            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(result => {
                    accountChangedHandler(result[0]);
                    setConnButtonText('Wallet Connected');
                    getAccountBalance(result[0]);
                    setShowRedirectButton(true); // Show redirect button on successful connection
                })
                .catch(error => {
                    setErrorMessage(error.message);
                });
        } else {
            console.log('Need to install MetaMask');
            setErrorMessage('Please install MetaMask browser extension to interact');
        }
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getAccountBalance(newAccount.toString());
    }

    const getAccountBalance = (account) => {
        window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] })
            .then(balance => {
                setUserBalance(ethers.formatEther(balance));
            })
            .catch(error => {
                setErrorMessage(error.message);
            });
    };

    const chainChangedHandler = () => {
        window.location.reload();
    }

    window.ethereum.on('accountsChanged', accountChangedHandler);
    window.ethereum.on('chainChanged', chainChangedHandler);

    const redirectToAnotherSite = () => {
        // window.location.href = 'http://localhost:3000/'; // Replace 'https://example.com' with your desired URL
        navigate('/anotherpage'); // Use navigate to navigate to another page
    }

    return (
        <div className='walletCard'>
            <h4> {"Connection to MetaMask using window.ethereum methods"} </h4>
            <button onClick={connectWalletHandler}>{connButtonText}</button>
            <div>
                <br></br>
                {showRedirectButton && (
                    <button onClick={redirectToAnotherSite}>Redirect to Another Page</button>
                )}
            </div>
            <div className='accountDisplay'>
                <h3>Address: {defaultAccount}</h3>
            </div>
            <div className='balanceDisplay'>
                <h3>Balance: {userBalance}</h3>
            </div>
            {errorMessage}
        </div>
    );
}

export default WalletCard;