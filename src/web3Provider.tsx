
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { Config, WagmiProvider } from "wagmi";
import { arbitrum, mainnet, arbitrumSepolia, polygonAmoy  } from "wagmi/chains"
import { ReactNode } from 'react'

// 1. Get projectId from https://cloud.reown.com
const projectId = '9e817ad8cdde2f3494050cac3e755b60'

// 2. Create a metadata object - optional
const metadata = {
  name: 'Test',
  description: 'Connect wallet',
  url: 'https://test.io/', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// 4. Create config
const config: Config = defaultWagmiConfig({
    chains: [mainnet, arbitrum, arbitrumSepolia, polygonAmoy ], // required
    projectId, // required
    metadata, // required
  });

// 5. Create modal
createWeb3Modal({
    defaultChain: arbitrumSepolia,
    wagmiConfig: config,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

type Props = {
    children: ReactNode
}

  export function WagmiWrapper({ children }: Props) {
    return (
      <WagmiProvider config={config} reconnectOnMount={false}>
        {children}
      </WagmiProvider>
    );
}
    