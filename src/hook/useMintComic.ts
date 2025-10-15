// src/hooks/useMintComic.ts
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useChainId } from 'wagmi';
import { parseEther, decodeEventLog } from 'viem';
import { mainnet } from 'wagmi/chains';
import type { Chain } from 'wagmi/chains';
import { QUIVA_COMICS_ADDRESS, QUIVA_COMICS_ABI } from '../contracts/QuivaComics';
import { useState } from 'react';




interface MintComicParams {
  comicId: string;
  metadataUri: string;
  price: number;
  maxSupply: number;
  royaltyPercentage: number;
}

// Define Hedera Testnet chain
const hederaTestnet = {
  id: 296,
  name: 'HederaTestnet',
  nativeCurrency: { name: 'Hedera Testnet', symbol: 'HBAR', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet.hashio.io/api'] },
  },
  blockExplorers: {
    default: { name: 'HashScan', url: 'https://hashscan.io/testnet/home' },
  },
} as const satisfies Chain;

export function useMintComic() {
  const [tokenId, setTokenId] = useState<bigint | null>(null);
  const { address } = useAccount();
  const chainId = useChainId();
  
  // Get current chain - default to mainnet if not found
  const currentChain = chainId === 296 ? hederaTestnet : mainnet;

  const {
    data: hash,
    writeContract,
    isPending: isWritePending,
    error: writeError,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
    data: receipt,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const mintComic = async ({
    comicId,
    metadataUri,
    price,
    maxSupply,
    royaltyPercentage,
  }: MintComicParams) => {
    try {
      // Convert price to wei (blockchain native unit)
      const priceInWei = parseEther(price.toString());

      // Convert royalty percentage to basis points (10% = 1000)
      const royaltyBasisPoints = BigInt(royaltyPercentage * 100);

      // Call the contract
      writeContract({
        address: QUIVA_COMICS_ADDRESS,
        abi: QUIVA_COMICS_ABI,
        functionName: 'mintComic',
        args: [
          comicId,
          metadataUri,
          priceInWei,
          BigInt(maxSupply),
          royaltyBasisPoints,
        ],
        account: address,
        chain: currentChain,
      });
    } catch (error) {
      console.error('Error minting comic:', error);
      throw error;
    }
  };

  // Extract tokenId from transaction receipt when confirmed
  if (isSuccess && receipt && !tokenId) {
    try {
      // Find the ComicMinted event in the logs
      const comicMintedLog = receipt.logs.find((log) => {
        try {
          const decoded = decodeEventLog({
            abi: QUIVA_COMICS_ABI,
            data: log.data,
            topics: log.topics,
          });
          return decoded.eventName === 'ComicMinted';
        } catch {
          return false;
        }
      });

      if (comicMintedLog) {
        const decoded = decodeEventLog({
          abi: QUIVA_COMICS_ABI,
          data: comicMintedLog.data,
          topics: comicMintedLog.topics,
        });

        if (decoded.eventName === 'ComicMinted') {
          // The ComicMinted event args: [tokenId, creator, comicId, price, maxSupply]
          const [eventTokenId] = decoded.args as readonly [bigint, string, string, bigint, bigint];
          setTokenId(eventTokenId);
        }
      }
    } catch (error) {
      console.error('Error extracting tokenId:', error);
    }
  }

  return {
    mintComic,
    hash,
    tokenId,
    isWritePending,
    isConfirming,
    isSuccess,
    writeError,
    receipt,
  };
}