const Web3 = require("../client/node_modules/web3");
const In3Client = require("../client/node_modules/in3");

describe('Web3 using IN3 as a provider', async () => {

  let web3;
  before(async () => {
    // use the In3Client as Http-Provider
    web3 = new Web3(new In3Client.default({
      proof: 'standard',  //‘none’ for no verification, ‘standard’ for verifying all important fields, ‘full’ veryfying all fields even if this means a high payloaad 
      signatureCount: 2,
      requestCount: 1, // The number of Incubed Servers to inquire the data from. (you can change to 2 or more depending on your requirements)
      chainId: 'mainnet',
      timeout: 30000,
      replaceLatestBlock: 6
    }).createWeb3Provider());
  });
  
  const transactionHash = '0xb68a3b5ea9b7b39314b5da7f3983e21ec1df4ef2daeca34a9178612ee26c690f';

  // In next, if you do not need the `accounts`, you may also use the original https://mochajs.org `describe` instead of 'contract`
  contract('Get a transaction receipt', async (accounts) => {
    it('Verfing that a correct data is retrived for the transaction receipt \n\tby the Transaction Hash: ' + transactionHash, async () => {
      // getting a Transaction Receipt by Transaction Hash
      const transactionReceipt = await web3.eth.getTransactionReceipt(transactionHash);
      
      assert.equal(transactionReceipt.from, '0x00d936ef12a4fde33ab0fcf08f18d6a9babb6b97', "Wrong value for `from`!");
      assert.equal(transactionReceipt.to, '0xb22c1c159d12461ea124b0deb4b5b93020e6ad16', "Wrong value for `to`!");
      assert.equal(transactionReceipt.blockNumber,   9013558, "Wrong value for `blockNumber`!");
      assert.equal(transactionReceipt.logs.length, 4, "Wrong number of events emitted during the transaction!");

    });
  });
});
