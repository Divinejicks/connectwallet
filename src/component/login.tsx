
import { useAccount, useDisconnect, useConnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect } from "react";
import { ethers } from "ethers";

export const Login = () => {
    const { isConnected } = useAccount();
    const { open } = useWeb3Modal(); // Opens the Web3Modal

    const handleConnect = async () => {
        try {
            await open(); // Explicitly open the wallet modal
            console.log("Wallet connected!");
        } catch (err) {
            console.error("Failed to open wallet modal:", err);
        }
    };

    return(<>
        {isConnected ? (<>
            <button className='bg-purple-400 text-white hover:bg-purple-300'>Disconnect wallet</button>
        </>) : (<>
            <button onClick={() => handleConnect()} className='bg-purple-400 text-white hover:bg-purple-300'>Connect wallet</button>
        </>)}
    </>)
}