import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useChainId, useReadContract } from 'wagmi';
import { parseEther } from 'viem';
import { QUIVA_COMICS_ABI, QUIVA_COMICS_ADDRESS } from '../contracts/QuivaComics';
import { mainnet } from 'wagmi/chains';
import type { Chain } from 'wagmi/chains';
import { useComicMinting } from './useComicMinting';

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

interface PurchaseParams {
  tokenId: bigint;
  seller: string;
  amount: bigint;
  pricePerToken: bigint;
}

interface ListingData {
  seller: string;
  pricePerToken: bigint;
  amount: bigint;
  isActive: boolean;
}

export const useComicPurchase = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseError, setPurchaseError] = useState<Error | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  // Wagmi hooks for contract interaction
  const { 
    data: hash, 
    writeContract, 
    error: writeError,
    isPending: isWritePending 
  } = useWriteContract();

  const { 
    isLoading: isConfirming, 
    isSuccess: isPurchaseComplete,
    data: receipt
  } = useWaitForTransactionReceipt({
    hash,
  });

   const { sellerAddress, tokenId } = useComicMinting();

  /**
   * Get listing details for a specific comic and seller
   */
  const getListing = (tokenId: bigint, sellerAddress: string) => {
    return useReadContract({
      address: QUIVA_COMICS_ADDRESS,
      abi: QUIVA_COMICS_ABI,
      functionName: 'getListing',
      args: [tokenId, sellerAddress as `0x${string}`],
    });
  };

  /**
   * Get comic details from blockchain
   */
  const getComicDetails = (tokenId: bigint) => {
    return useReadContract({
      address: QUIVA_COMICS_ADDRESS,
      abi: QUIVA_COMICS_ABI,
      functionName: 'getComic',
      args: [tokenId],
    });
  };

  /**
   * Check user's NFT balance
   */
  const getUserBalance = (tokenId: bigint, userAddress: string) => {
    return useReadContract({
      address: QUIVA_COMICS_ADDRESS,
      abi: QUIVA_COMICS_ABI,
      functionName: 'balanceOf',
      args: [userAddress as `0x${string}`, tokenId],
    });
  };

  /**
   * Purchase comic NFT from marketplace
   */
  const purchaseComic = async ({
    tokenId,
    seller,
    amount,
    pricePerToken,
  }: PurchaseParams) => {
    if (!isConnected || !address) {
      throw new Error('Please connect your wallet first');
    }

    if (chainId !== 296) {
      throw new Error('Please switch to Hedera Testnet');
    }

    try {
      setIsPurchasing(true);
      setPurchaseError(null);
      setPurchaseSuccess(false);

      const currentChain = chainId === 296 ? hederaTestnet : mainnet;
      
      // Calculate total price
      const totalPrice = pricePerToken * amount;

      console.log('💰 Purchasing comic:', {
        tokenId: tokenId.toString(),
        seller,
        // sellerAddress,
        amount: amount.toString(),
        pricePerToken: pricePerToken.toString(),
        totalPrice: totalPrice.toString(),
      });

      // Call smart contract
      await writeContract({
        address: QUIVA_COMICS_ADDRESS,
        abi: QUIVA_COMICS_ABI,
        functionName: 'purchaseComic',
        args: [tokenId, seller as `0x${string}`, amount],
        value: totalPrice,
        account: address,
        chain: currentChain,
      });

      console.log('✅ Purchase transaction sent');

    } catch (error: any) {
      console.error('❌ Purchase error:', error);
      setPurchaseError(error);
      setIsPurchasing(false);
      throw error;
    }
  };

  /**
   * Batch purchase multiple comics
   */
  const batchPurchaseComics = async (purchases: PurchaseParams[]) => {
    if (!isConnected || !address) {
      throw new Error('Please connect your wallet first');
    }

    if (chainId !== 296) {
      throw new Error('Please switch to Hedera Testnet');
    }

    try {
      setIsPurchasing(true);
      setPurchaseError(null);
      setPurchaseSuccess(false);

      const currentChain = chainId === 296 ? hederaTestnet : mainnet;

      const tokenIds = purchases.map(p => p.tokenId);
      const sellers = purchases.map(p => p.seller);
      const amounts = purchases.map(p => p.amount);

      // Calculate total cost
      const totalCost = purchases.reduce((sum, p) => {
        return sum + (p.pricePerToken * p.amount);
      }, BigInt(0));

      console.log('💰 Batch purchasing comics:', {
        count: purchases.length,
        totalCost: totalCost.toString(),
      });

      await writeContract({
        address: QUIVA_COMICS_ADDRESS,
        abi: QUIVA_COMICS_ABI,
        functionName: 'batchPurchase',
        args: [tokenIds, sellers as `0x${string}`[], amounts],
        value: totalCost,
        account: address,
        chain: currentChain,
      });

      console.log('✅ Batch purchase transaction sent');

    } catch (error: any) {
      console.error('❌ Batch purchase error:', error);
      setPurchaseError(error);
      setIsPurchasing(false);
      throw error;
    }
  };

  // Monitor purchase completion
  if (isPurchaseComplete && !purchaseSuccess) {
    console.log('✅ Purchase completed successfully!');
    setIsPurchasing(false);
    setPurchaseSuccess(true);
  }

  // Monitor errors
  if (writeError && !purchaseError) {
    setPurchaseError(writeError as Error);
    setIsPurchasing(false);
  }

  // Reset function
  const reset = () => {
    setIsPurchasing(false);
    setPurchaseError(null);
    setPurchaseSuccess(false);
  };

  return {
    purchaseComic,
    batchPurchaseComics,
    getListing,
    getComicDetails,
    getUserBalance,
    isPurchasing,
    isWritePending,
    isConfirming,
    isPurchaseComplete,
    purchaseSuccess,
    purchaseError: writeError || purchaseError,
    purchaseHash: hash,
    reset,
    walletStatus: {
      isConnected,
      address,
      chainId,
    },
  };
};