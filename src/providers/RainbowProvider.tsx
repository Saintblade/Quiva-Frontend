"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "f3d83563bb23a44e9e7a1fa7133c740a",
  chains: [mainnet, polygon, optimism, arbitrum, base],
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
