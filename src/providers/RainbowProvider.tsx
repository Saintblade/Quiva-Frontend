"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import type { Chain } from "wagmi/chains";

//testnet.hashio.io/api
// const avalanche = {
//   id: 43_114,
//   name: 'Avalanche',
//   iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
//   iconBackground: '#fff',
//   nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
//   rpcUrls: {
//     default: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
//   },
//   blockExplorers: {
//     default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
//   },
//   // contracts: {
//   // //   multicall3: {
//   //     address: '0xca11bde05977b3631167028862be2a173976ca11',
//   //     blockCreated: 11_907_934,
//   //   },
//   // },
// } as const satisfies Chain;
const hederaTestnet = {
  id: 296,
  name: 'HederaTestnet',
  iconUrl: 'https://assets.coingecko.com/coins/images/3688/standard/hbar.png?1696504364',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Hedera Testnet', symbol: 'HBAR', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet.hashio.io/api'] },
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://hashscan.io/testnet/home' },
  },
  
} as const;
const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "f3d83563bb23a44e9e7a1fa7133c740a",
  chains: [ hederaTestnet, mainnet  ],
  ssr: false, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();

export default function RainbowProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact"> {children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
