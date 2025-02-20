
import { useAccount, useChainId, useDisconnect, useWalletClient, } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { ethers } from "ethers";
import { useEffect } from "react";

export const Login = () => {
    const { address } = useAccount();
    const { open } = useWeb3Modal(); // Opens the Web3Modal
    const { data: walletClient } = useWalletClient();
    const chainId = useChainId();
    const { disconnect } = useDisconnect()

    useEffect(() => {
        console.log("walletClient", walletClient)
    }, [address])

    const handleConnect = async () => {
        try {
            await open(); // Explicitly open the wallet modal
            console.log("Wallet connected!", address);
        } catch (err) {
            console.error("Failed to open wallet modal:", err);
        }
    };

    const handleSignMessage = async () => {
        try {
            if (!walletClient) {
                console.error("No signer available. Please connect a wallet first.");
                return;
            }
          const message = "This is a test";

          // to show you how to get the connected chain Id
          console.log("chainId", chainId)
          console.log("chian Id ", await walletClient.getChainId())

          // To show you how to get a signer, so that you can use to instantiate your contract
          const provider = new ethers.providers.Web3Provider(walletClient.transport)
          const signer = provider.getSigner()
          console.log("signer", signer)


          // This is to sign a message. 
          // NOTE: it should be in this format signMessage({message}). What ever you want to sign put it in a message variable
          const signature = await walletClient.signMessage({message});
          console.log("Signed Hash:", signature);
        } catch (err) {
          console.error("Error signing message:", err);
        }
      };
    

    return(<>
        {address ? (<>
            <div className="flex flex-col space-y-3">
                <button onClick={() => disconnect()} className='bg-purple-400 text-white hover:bg-purple-300'>Disconnect wallet {address}</button>
                <button onClick={() => handleSignMessage()} className='bg-blue-400 text-white hover:bg-purple-300'>Sign Message</button>
            </div>
        </>) : (<>
            <button onClick={() => handleConnect()} className='bg-purple-400 text-white hover:bg-purple-300'>Connect wallet</button>
        </>)}
    </>)
}