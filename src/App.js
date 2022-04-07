import logo from './logo.svg';
import './App.css';
// import Web3 from 'web3';
import React, { useEffect } from 'react';
import { init ,sendEthButton} from "./Web3Client"
function App() {
  useEffect(() => {
    init()
  })
  return (
    <div className="App">
        <div onClick={sendEthButton}>sendEthButton </div>
    </div>
  );
}

export default App;
