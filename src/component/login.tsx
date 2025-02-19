
import { useAccount, useChainId, useDisconnect, useWalletClient, } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export const Login = () => {
    const { address } = useAccount();
    const { open } = useWeb3Modal(); // Opens the Web3Modal
    const { data: walletClient } = useWalletClient();
    const chainId = useChainId();
    const { disconnect } = useDisconnect()
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log("walletClient", walletClient)
    }, [address, count])

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
          console.log("chainId", chainId)
          const provider = new ethers.providers.Web3Provider(walletClient.transport)
          const signer = provider.getSigner()
          console.log("signer", signer)
          console.log("signer hh", await walletClient.getChainId())
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
                <button onClick={() => setCount(count + 1)} className='bg-blue-400 text-white hover:bg-purple-300'>Count</button>
            </div>
        </>) : (<>
            <button onClick={() => handleConnect()} className='bg-purple-400 text-white hover:bg-purple-300'>Connect wallet</button>
        </>)}
    </>)
}