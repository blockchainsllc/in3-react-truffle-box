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
              This occurs for every request from the Ethereum network. You can check the captured request and response above to understand more.
                        {/* It could do so as it is the provider of the Web3 object. */}
            </p>
            <ul>
              <li>Incubed Client injectes an <strong>"in3"</strong> attribute at the JSON request.</li>
              <li>Incubed Client sends multiple/single request(s) to multiple/single server(s).</li>
              <li>Incubed Client asks those servers to get the blockhash signed by other servers (specified in the "in3" section).</li>
              <li>Incubed Servers sends back the requested data along with the blockhash that is signed by the requested other servers.</li>
              <li>Incubed Servers adds all the additional proof information in the <strong>"in3"</strong> section.</li>
              <li>Incubed Client receives the data from all the inquired servers, and validates all the responses.</li>
              <li>Incubed Client validate all the proof of the validatable-data received from each server.</li>
            </ul>
            <p>Note: Incubed Servers (Nodes) cannot provide fake signatures since there are always <strong>`watch-dogs`</strong> who will be pleased to get the node's deposits in such a case (anyone can act as a watchdog!).</p>
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
              <span>
                By using Incubed as a provider for Web3, you can still call all the methods of Web3 as usual.
              </span>{" "}
              <span>
                For more, {" "}
                <a className="text-gray-dark font-weight-700"
                  target="_blank" rel="noopener noreferrer"
                  href="https://in3.readthedocs.io/en/latest/">read the Docs</a>.
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default BehindTheScenes;