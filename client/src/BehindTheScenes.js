import React from 'react';

class BehindTheScenes extends React.Component {

    render() {
        return (
            <div>
                <div className="bg-gradient-gray-dark shadow-lg border-0">
                  <div className="p-5">
                    <div className="align-items-center">
                      <div>
                        <div className="display-4">
                          What Happens Behind the Scenes!
                      </div>
                        <p className="lead text-white mt-3">
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
                    <div className="justify-content-start">
                      <div className="div-5">
                        <div className="shadow shadow-lg--hover mt--100">
                          <div className="div-body px-md-4 px-lg-4 px-xl-5 px-2">
                            <div>
                              <div className="justify-content-start align-items-center">
                                <div className="div-md-auto px-0">
                                  <div className="icon icon-shape bg-gradient-gray-dark rounded-circle text-white">
                                    <i className="fa fa-book" />
                                  </div>
                                </div>
    
                              </div>
                              <div className="justify-content-start">
                                <div className="text-primary px-2 pt-3">
                                  <div>
                                    What you see here is enough for start using Incubed.
                                  </div>
                                  <div>
                                    However, it alway recommended to {" "}
                                    <a className="text-gray-dark font-weight-700"
                                      target="_blank" rel="noopener noreferrer" 
                                      href="https://in3.readthedocs.io/en/latest/">Read the Docs</a>.
                                    </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        );
    }
}

export default BehindTheScenes;