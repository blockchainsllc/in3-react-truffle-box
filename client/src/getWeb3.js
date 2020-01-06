import Web3 from "web3";
import In3Client from 'in3';

const getWeb3 = (withVerification) =>

  new Promise((resolve, reject) => {

    // If withVerification is true, IN3 (Incubed Client) will be used as a provider for Web3.
    // IN3 insures turested communication between the client and the node.
    if (withVerification) {
      try {
        // use the In3Client as Http-Provider
        const web3 = new Web3(new In3Client({
          proof: 'standard',  //‘none’ for no verification, ‘standard’ for verifying all important fields, ‘full’ veryfying all fields even if this means a high payload 
          signatureCount: 2,
          requestCount: 1, // The number of Incubed Servers to inquire the data from. (you can change to 2 or more depending on your requirements)
          chainId: 'mainnet',
          timeout: 30000,
          replaceLatestBlock: 6
        }).createWeb3Provider());

        console.log("Web3 with IN3 (Incubed will be used as a provider for Web3)");
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }
    else {
      console.log("Web3 without IN3 client will be used. There is no way to verify the respose of the remote node (ethereum client).");
      // Wait for loading completion to avoid race conditions with web3 injection timing.
      window.addEventListener("load", async () => {
        // Modern dapp browsers...
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          try {
            // Request account access if needed
            await window.ethereum.enable();
            // Acccounts now exposed
            resolve(web3);
          } catch (error) {
            reject(error);
          }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
          // Use Mist/MetaMask's provider.
          const web3 = window.web3;
          console.log("Injected web3 detected.");
          resolve(web3);
        }
        // Fallback to localhost; use dev console port by default...
        else {
          const provider = new Web3.providers.HttpProvider(
            "http://127.0.0.1:8545"
          );
          const web3 = new Web3(provider);
          console.log("No web3 instance injected, using Local web3.");
          resolve(web3);
        }
      });
    }
  });

export default getWeb3;
