import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import InterceptAndLog from "./InterceptAndLog";

import "./App.css";
import BehindTheScenes from "./BehindTheScenes.js";

class App extends Component {

  state = { web3: null, transactionReceipt: '<<loading>>', transactionHash: '0xb68a3b5ea9b7b39314b5da7f3983e21ec1df4ef2daeca34a9178612ee26c690f' };
  functionName = 'eth_getTransactionReceipt';

  static getHeadOrBody() {
    return document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0];
  }

  componentDidMount = async () => {

    new InterceptAndLog().interceptingAllHttpCalls();

    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3(true);

      // Set web3 to the state.
      this.setState({ web3 }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  };


  runExample = async () => {

    const web3 = this.state.web3;

    this.setState({ transactionReceipt: 'Calling `web3.eth.getTransactionReceipt(\'' + this.state.transactionHash + '\');` ...' });

    window.JsonRpcLogs[this.functionName] = [];
    try {
      // getting a Transaction Receipt by Transaction Hash
      web3.eth.getTransactionReceipt(this.state.transactionHash).then(
        (transactionReceipt) => {
          console.log('Transaction Receipt for the Transaction Receipt for ' + this.state.transactionHash + ':');
          console.log(transactionReceipt);
          this.setState({ transactionReceipt: transactionReceipt });
        }, (error) => {
          console.log('Error happen when getting the Transaction Receipt for ' + this.state.transactionHash + '!');
          console.log(error);
          this.setState({ transactionReceipt: 'Error happen when getting the Transaction Receipt! Try refresh the page or open the Console for more information.' });
        });
    }
    catch (error) {
      alert(error)
      console.log(error)
    }
  };

  render() {

    if (!this.state.web3) {
      return <div>Loading Web3 with In3 as a Provider</div>;
    }
    return (

      <div className="App">
        <div className="text-center">
          <div><h2>Good to Go with </h2>
            <h1>  BlockChain for IoT and any other!
          </h1>
          </div>
          <h2>Using Web3 with In3 (Incubed Client) as a provider</h2>
          <p>
            In this sample, your Web3 does not use MetaMask nor any untrusted node as a provider.
            <br />
            It uses In3 Client that connects to an In3 Server. And it will get and validate proofs for any validatable remote call.
        </p>
        </div>
        <hr divor='blue' />

        <div className="div-center" >{this.state.transactionReceipt ?
          typeof this.state.transactionReceipt !== "string" ?
            <div className="div-data">
              <h4>The Data of the inquired Transaction Receipt</h4>
              <div>
                <div>
                  <div>
                    <span>Transaction Hash : </span>{this.state.transactionReceipt.transactionHash}
                  </div>
                </div>
                <div>
                  <div>
                    <span>From: </span><br />{this.state.transactionReceipt.from}
                  </div>
                  <div>
                    <span>To: </span><br />{this.state.transactionReceipt.to}
                  </div>
                </div>
                <div>
                  <div>
                    <span>Gas Used: </span>{this.state.transactionReceipt.gasUsed} Wei
                        </div>
                  <div>
                    <span>Block Number: </span>{this.state.transactionReceipt.blockNumber}
                  </div>
                </div>
                <div>
                  <div></div>
                </div>
                <div>
                  <div>
                    <span className="font-weight-bold">Logs: </span>{this.state.transactionReceipt.logs
                      ? 'Number of emitted events in the inquired transaction: ' + this.state.transactionReceipt.logs.length
                      : 'No events emitted in the transaction'}
                  </div>
                </div>
              </div>
            </div>
            :
            <div>
              <div className="loading">
                <div>
                  {this.state.transactionReceipt}
                </div>
                <br />
                <div>
                  Note: If this took a long time, check the Browser Development Console (F12) or refresh the page!
                </div>
              </div>
            </div>
          :
          <></>
        }
        </div>
        <hr divor='blue' />
        <BehindTheScenes />
      </div>
    );
  }
}

export default App;
