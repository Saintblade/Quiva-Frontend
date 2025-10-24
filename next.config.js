/** @type {import('next').NextConfig} */
const nextConfig = {
   transpilePackages: [
    "@hashgraph/hedera-wallet-connect",
    "@reown/walletkit",
    "@walletconnect/modal",
    "ethers",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
