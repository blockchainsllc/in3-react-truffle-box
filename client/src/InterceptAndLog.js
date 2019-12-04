const truncationNote = '"***RESPONSE HAS BEEN TRANCATED BECAUSE IT IS VERY LARGE (Just to ease showing it on the page!)***"';

class InterceptAndLog {
    constructor() {
        if (window.JsonRpcLogs === undefined)
            window.JsonRpcLogs = {};
    }

    interceptingAllHttpCalls = () => {
        XMLHttpRequest.prototype.realSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function (request) {
            this.addEventListener("load", function () { // Note: this.addEventListener("progress",... is the same but "progress" willl have a truncated response, if it is large!
                if (!request)
                    return;
                let requestObject = JSON.parse(request);
                if (Array.isArray(requestObject))
                    if (requestObject.length !== 0)
                        requestObject = requestObject[0];
                    else
                        return;
                if (requestObject.jsonrpc !== undefined && requestObject.in3 === undefined) {
                    console.log('In3 is not used as a provider for Web3. The method "' + requestObject.method + '" will be called without verification!');
                    return;
                }

                // If In3 is used, the object `requestObject` has a value similar to the following (note the "in3"):
                // [{"jsonrpc":"2.0","id":3,"method":"eth_getBlockByNumber","params":["latest",false],"in3":{"latestBlock":6,"verification":"proofWithSignature","signatures":["0x945F75c0408C0026a3CD204d36f5e47745182fd4","0x1Fe2E9bf29aa1938859Af64C413361227d04059a"],"version":"2.0.0"}}]

                // The `truncateAndFixLargJson` is used because this.response could be very large. This is because in3 section could be more than 100KB.
                let { response, responseObject } = InterceptAndLog.truncateAndFixLargJson(this.response, 1000000);


                if (window.JsonRpcLogs[requestObject.method] === undefined)
                    window.JsonRpcLogs[requestObject.method] = [];
                console.log('Calling ' + requestObject.method + ' for the ' + (window.JsonRpcLogs[requestObject.method].length + 1) + '-th time(s).')
                window.JsonRpcLogs[requestObject.method].push({ Url: this.responseURL, Request: requestObject, Response: responseObject ? responseObject : response, OriginalResponse: this.response });
            }, false);

            this.realSend(request);
        };
    }

    static truncateAndFixLargJson(originalResponse, maxLength) {
        let responseObject = {};
        if (originalResponse === 'Internal Server Error')
            return originalResponse;
        let response;
        if (originalResponse.length > maxLength) {
            response = originalResponse.slice(0, maxLength);
            let note = '"Note": ' + truncationNote + ', ';
            let position = response.indexOf('{') + 1;
            response = [response.slice(0, position), note, response.slice(position)].join('');
        }
        else
            response = originalResponse;
        try {
            const indexOfColonAfterComman = response.indexOf(':', response.lastIndexOf(","));
            if (indexOfColonAfterComman === -1) { // Not greate for handling arrays but still working!
                response = response.slice(0, response.lastIndexOf(","));
            }
            responseObject = JSON.parse(response);
        }
        catch (error) {
            console.log("Response length: " + originalResponse.length);
            if ((response.match(new RegExp("\"", "g")) || []).length % 2 === 1)
                response += '"';
            let ending = '';
            for (let i = 0; i < response.length; i++) {
                switch (response[i]) {
                    case '[':
                        ending = ']' + ending;
                        break;
                    case ']':
                        ending = ending.slice(1);
                        break;
                    case '{':
                        ending = '}' + ending;
                        break;
                    case '}':
                        ending = ending.slice(1);
                        break;
                    default:
                        ;
                }
            }
            if (ending[0] === '}')
                response += ', "Note": ' + truncationNote;
            else if (ending[0] === ']')
                response += ', ' + truncationNote;
            response += ending;
            try {
                responseObject = JSON.parse(response);
            }
            catch (error) {
                debugger;
            }
        }

        if (Array.isArray(responseObject))
            if (responseObject.length !== 0)
                responseObject = responseObject[0];

        try {
            if (responseObject.result && responseObject.result.transactions && responseObject.result.transactions.length > 3) {
                responseObject.result.transactions = responseObject.result.transactions.slice(0, 3);
                responseObject.result.transactions.push(truncationNote);
            }
        }
        catch (error) {
            debugger;
        }
        try {
            if (responseObject.in3 && responseObject.in3.proof && responseObject.in3.proof.transactions && responseObject.in3.proof.transactions.length > 3) {
                responseObject.in3.proof.transactions = responseObject.in3.proof.transactions.slice(0, 3);
                responseObject.in3.proof.transactions.push(truncationNote);
            }
        }
        catch (error) {
            debugger;
        }

        return { response, responseObject };
    }
}

export default InterceptAndLog;