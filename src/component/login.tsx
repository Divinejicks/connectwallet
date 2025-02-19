
import { useAccount, useWalletClient } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export const Login = () => {
    const { address } = useAccount();
    const { open } = useWeb3Modal(); // Opens the Web3Modal
    const { data: walletClient } = useWalletClient();

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
                alert("hah ahah")
                console.error("No signer available. Please connect a wallet first.");
                return;
            }
        alert("teo")
          const message = "This is a test";
          const signature = await walletClient.signMessage({message});
          alert("4")
          console.log("Signed Hash:", signature);
        } catch (err) {
          console.error("Error signing message:", err);
        }
      };
    

    return(<>
        {address ? (<>
            <div className="flex flex-col space-y-3">
                <button className='bg-purple-400 text-white hover:bg-purple-300'>Disconnect wallet {address}</button>
                <button onClick={() => handleSignMessage()} className='bg-blue-400 text-white hover:bg-purple-300'>Sign Message</button>
            </div>
        </>) : (<>
            <button onClick={() => handleConnect()} className='bg-purple-400 text-white hover:bg-purple-300'>Connect wallet</button>
        </>)}
    </>)
}