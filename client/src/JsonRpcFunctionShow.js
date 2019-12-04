import React from 'react';

class JsonRpcFunctionShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <div style={{ textAlign: 'left' }} >
                {window.JsonRpcLogs && window.JsonRpcLogs[this.props.functionName] !== undefined ?
                    <div>
                        <div>Number of calles to Incubed Servers: {window.JsonRpcLogs[this.props.functionName].length}</div>
                        {window.JsonRpcLogs[this.props.functionName].map((item, index) => (
                            <div key={index}><div> Incubed Server: {item.Url} </div>
                                <div>
                                    <pre className="prettyprint">
                                        Request:
                                            {JSON.stringify(item.Request, null, 4)} {window.PR.prettyPrint()}
                                    </pre>
                                </div>
                                <div>
                                    {typeof item.Response !== "string" ?
                                        <pre className="prettyprint">
                                            Response:
                                                {JSON.stringify(item.Response, null, 4)} {window.PR.prettyPrint()}
                                        </pre> :
                                        <div>Response: item.Response</div>
                                    }
                                </div>
                                <br />
                            </div>
                        ))}
                    </div>
                    : <div>loading...</div>}
            </div>
        );
    }
}

export default JsonRpcFunctionShow;