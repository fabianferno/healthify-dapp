import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Home";
import Register from "./Register";
import Doctor from "./Doctor";
import Patient from "./Patient";
import test2 from "./contract/Test.json";

import "./assets/scss/style.scss";

let Web3 = require("web3");
let ContractKit = require("@celo/contractkit");
// let BigNumber = require("bignumber.js")
let erc20Abi = require("./erc20Abi.json");

function App() {
  // const [id, setId] = useState(0)
  const [address, setAddress] = useState();
  const [web3, setWeb3] = useState(undefined);
  const [contract, setContract] = useState([]);

  let kit;
  let cUSDcontract;
  const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

  useEffect(() => {
    const connectCeloWallet = async function () {
      if (window.celo) {
        try {
          await window.celo.enable();
          const web3 = new Web3(window.celo);
          kit = ContractKit.newKitFromWeb3(web3);
          const accounts = await kit.web3.eth.getAccounts();
          kit.defaultAccount = accounts[0];

          // const Vault=new kit.web3.eth.Contract(test.abi,"0xecEFEcf20Df6cc4954205Ef211a428eAc8C2A6Ed")

          const contr = new kit.web3.eth.Contract(
            test2,
            "0xaAc86611a1AF8cFf09a0b8074fa429dA58D5Fe0C"
          );
          // console.log(kit.defaultAccount);
          setWeb3(web3);
          // const i=await contr.methods.addresstoId(kit.defaultAccount).call();
          setAddress(kit.defaultAccount);
          setContract(contr);
          cUSDcontract = new kit.web3.eth.Contract(
            erc20Abi,
            cUSDContractAddress
          );
        } catch (error) {
          console.log(`⚠️ ${error}.`);
        }
      } else {
        console.log("⚠️ Please install the CeloExtensionWallet.");
      }
    };

    connectCeloWallet();
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <UserContext.Provider value={{ address, web3, contract }}>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/patient" exact component={Patient} />
            <Route path="/doctor" exact component={Doctor} />
          </UserContext.Provider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
