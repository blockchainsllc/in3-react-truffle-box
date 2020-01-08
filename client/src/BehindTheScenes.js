import React from 'react';

class BehindTheScenes extends React.Component {

  render() {
    return (
      <div>
        <div className="div-center">
          <div>
            <h3>
              What Happens Behind the Scenes!
            </h3>
            <p>
              This occurs for every request from the Ethereum network. To use IN3 you do not need to know all those details. But knowing them will give you confidence in this technical invention.
            </p>
            <ul>
              <li>Incubed Client injectes an <strong>"in3"</strong> property at the JSON request.</li>
              <li>Incubed Client sends multiple/single request(s) to multiple/single server(s).</li>
              <li>Incubed Client asks those servers to get the blockhash signed by other servers (specified in the "in3" property).</li>
              <li>Incubed Servers sends back the requested data along with the blockhash that is signed by the requested other servers.</li>
              <li>Incubed Servers adds all the additional proof information in the <strong>"in3"</strong> property.</li>
              <li>Incubed Client receives the data from all the inquired servers, and validates all the responses.</li>
              <li>Incubed Client validates all the proof of the validatable-data received from each server.</li>
            </ul>
            <p>To understand more, you can open the Network tab of the Browser Developer Tools and check the request and response.</p>
            <p>Note: Put into consideration that in addition to the provided proofs and signatures, Incubed Servers (Nodes) cannot provide fake signatures since there are always <strong>`watch-dogs`</strong> who will be pleased to get the node's deposits in such a case (anyone can act as a watchdog!).</p>
          </div>
          <div>
            <div>
              <img
                alt="..."
                className="img-fluid"
                style={{ backgroundColor: 'darkslateblue' }}
                src={require("./incubedclient.svg")}
              /></div>
          </div>
          <div>
            <p>
              <br />
              By using Incubed as a provider for Web3, you can still call all the methods of Web3 as usual.
              {" "}
              <br />
              <b>For more, check the Incubed Verification video, the examples, and the Play Ground at
                {" "} <a className="text-gray-dark font-weight-700"
                  target="_blank" rel="noopener noreferrer"
                  href="https://how-in3-works.slock.it/">How Incubed Works</a>.
              </b>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default BehindTheScenes;