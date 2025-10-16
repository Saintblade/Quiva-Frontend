
import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useChainId, useReadContract, usePublicClient } from 'wagmi';
// import { parseEther } from 'viem';
import axios from 'axios';
import { QUIVA_COMICS_ABI, QUIVA_COMICS_ADDRESS } from '../contracts/QuivaComics';
import { mainnet } from 'wagmi/chains';
import type { Chain } from 'wagmi/chains';
import { parseEther, decodeEventLog } from 'viem';

interface ComicData {
  title: string;
  description: string;
  genre: string[];
  tags: string[];
  ageRating: string;
  coverImage: File | null;
  pages: any[];
}

interface MonetizationData {
  publishType: 'free' | 'paid';
  price?: number;
  mintAsNFT: boolean;
  nftCopies?: number;
  nftPrice?: number;
}

interface User {
  _id: string;
  email: string;
  walletAddress?: string;
}

interface PublishComicParams {
  comicData: ComicData;
  monetizationData: MonetizationData;
  user: User;
}
interface ApprovalStatus {
  isChecking: boolean;
  isApproving: boolean;
  isApproved: boolean;
  error: string | null;
}

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


export const useComicMinting = () => {
  const { address, isConnected } = useAccount();
   const chainId = useChainId();
   const publicClient = usePublicClient();
  const [isUploading, setIsUploading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mintingProgress, setMintingProgress] = useState(0);
  const [mintError, setMintError] = useState<Error | null>(null);
  const [tokenId, setTokenId] = useState<bigint | null>(null);
  const [comicId, setComicId] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>({
    isChecking: false,
    isApproving: false,
    isApproved: false,
    error: null,
  });

  // Wagmi hooks for contract interaction
  const { 
    data: hash, 
    writeContract, 
    error: writeError,
    isPending: isWritePending 
  } = useWriteContract();

  const { 
    isLoading: isConfirming, 
    isSuccess: isMintSuccess, 
    data: receipt
  } = useWaitForTransactionReceipt({
    hash,
  });


// Monitor transaction status
useEffect(() => {
  if (hash) {
    console.log('🔗 Transaction hash received:', hash);
    console.log('⏳ Waiting for blockchain confirmation...');
    setMintingProgress(70);
  }
}, [hash]);

useEffect(() => {
    const extractTokenId = async () => {
      if (isMintSuccess && receipt && !tokenId) {
        console.log('📝 Transaction receipt received:', receipt);

        try {
          // Method 1: Parse logs for ComicMinted event
          const mintedLog = receipt.logs.find((log) => {
            try {
              const decoded = decodeEventLog({
                abi: QUIVA_COMICS_ABI,
                data: log.data,
                topics: log.topics,
              });
              return (decoded as any).eventName === 'ComicMinted';
            } catch {
              return false;
            }
          });

          if (mintedLog) {
            const decoded = decodeEventLog({
              abi: QUIVA_COMICS_ABI,
              data: mintedLog.data,
              topics: mintedLog.topics,
            });

            if ((decoded as any).eventName === 'ComicMinted') {
              const decodedEvent = decoded as { eventName: string; args: { tokenId: bigint } };
              const extractedTokenId = decodedEvent.args.tokenId;
              console.log('✅ Token ID extracted from event:', extractedTokenId.toString());
              setTokenId(extractedTokenId);
              return;
            }
          }

          // Method 2: If event parsing fails, try getting from return value
          if (publicClient && hash) {
            const transaction = await publicClient.getTransaction({ hash });
            console.log('📄 Transaction data:', transaction);
            
            // Some contracts return tokenId directly
            // This depends on your smart contract implementation
          }

          console.warn('⚠️ Could not extract token ID from receipt');
        } catch (error) {
          console.error('❌ Error extracting token ID:', error);
        }
      }
    };

    extractTokenId();
  }, [isMintSuccess, receipt, tokenId, publicClient, hash])



// useEffect(() => {
//   if (isMintSuccess && hash) {
//     console.log('✅ NFT minted successfully!');
//     console.log('Transaction hash:', hash);
//     console.log('Token ID:', tokenId);
//     setMintingProgress(100);
    
//     // Update backend with mint data
//     if (comicId && tokenId) {
//        try {
//                 const result = useReadContract({
//                   address: QUIVA_COMICS_ADDRESS,
//                   abi: QUIVA_COMICS_ABI,
//                   functionName: 'comicIdToTokenId',
//                   args: [comicId],
//                 });
//                 if (result.data) {
//                   setTokenId(result.data as bigint);
//                   console.log('🎫 Token ID from contract:', (result.data as bigint).toString());
//                 }
//               } catch (error) {
//                 console.error('Error reading tokenId from contract:', error);
//               }
     
//     }
//   }
// }, [isMintSuccess, hash, tokenId, comicId]);


 
 // Monitor transaction success and auto-update backend
  useEffect(() => {
    const updateBackend = async () => {
      if (isMintSuccess && hash && comicId && tokenId && !isComplete) {
        console.log('✅ NFT minted successfully!');
        console.log('📝 Transaction hash:', hash);
        console.log('🎫 Token ID:', tokenId.toString());
        setMintingProgress(90);
        
        // Update backend with mint data
        console.log('💾 Updating backend with mint data...');
        try {
          await updateComicWithMintData(comicId, tokenId, hash);
          setMintingProgress(100);
          setIsMinting(false);
          setIsComplete(true);
          console.log('🎉 All done! Comic is now fully live.');
        } catch (error) {
          console.error('❌ Error updating backend:', error);
          setMintError(error as Error);
        }
      }
    };

    updateBackend();
  }, [isMintSuccess, hash, comicId, tokenId, isComplete]);


//Monitor write errors
useEffect(() => {
    if (writeError) {
      console.error('❌ Write contract error:', writeError);
      setMintError(writeError as Error);
      setIsMinting(false);
      setMintingProgress(0);
    }
  }, [writeError]);


 // Monitor confirmation status
  useEffect(() => {
    if (isConfirming) {
      console.log('⏳ Transaction confirming...');
      setMintingProgress(80);
    }
  }, [isConfirming]);




  
  /**
   * Check if the connected wallet is an approved creator
   */
  const checkCreatorApproval = async (): Promise<boolean> => {
    if (!address) return false;
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5000/api/creators/check-approval/${address}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      return response.data.isApproved;
    } catch (error) {
      console.error('Error checking creator approval:', error);
      return false;
    }
  };

  /**
   * Request creator approval from backend
   */
  const requestCreatorApproval = async (): Promise<boolean> => {
    if (!address) return false;
    
    try {
      console.log('🔐 Requesting creator approval...');
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/creators/approve-creator',
        { creatorAddress: address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log('✅ Creator approval successful:', response.data);
      return true;
    } catch (error) {
      console.error('❌ Error requesting creator approval:', error);
      return false;
    }
  };

  /**
   * Main function to publish comic and optionally mint NFT
   */
  const publishComic = async ({
    comicData,
    monetizationData,
    user,
  }: PublishComicParams) => {
    try {
      // setIsUploading(true);
      // setUploadProgress(10);
      // setMintError(null);
      setIsComplete(false);
      setTokenId(null);
      setComicId(null);
      setMintError(null);
      // resetWrite();
      
      setIsUploading(true);
      setUploadProgress(10);

      // Step 1: Create FormData for backend upload
      const formData = new FormData();

      // Add cover image if exists
      // if (comicData.coverImage) {
      //   formData.append('coverImage', comicData.coverImage);
      // }
// Add cover image if exists
if (comicData.coverImage) {
  // If it's already a File, use it directly
  // If it's a Blob, convert it
  if (comicData.coverImage instanceof File) {
    formData.append('coverImage', comicData.coverImage);
  } else {
    const coverFile = new File(
      [comicData.coverImage],
      'cover.jpg',
      { type: (comicData.coverImage as Blob).type || 'image/jpeg' }
    );
    formData.append('coverImage', coverFile);
  }
}
      // Add page images
      // comicData.pages.forEach((page, index) => {
      //   if (page.blob) {
      //     formData.append('pages', page.blob, page.name || `page-${index + 1}.jpg`);
      //   }
      // });
      // Add page images
comicData.pages.forEach((page, index) => {
  if (page.blob) {
    // Ensure proper file name with extension
    const fileName = page.name || `page-${index + 1}.jpg`;
    
    // Create a File object with explicit MIME type
    const file = new File(
      [page.blob], 
      fileName, 
      { type: page.blob.type || 'image/jpeg' }
    );
    
    formData.append('pages', file);
  }
}); 

      // Prepare comic data
      const comicPayload = {
        title: comicData.title,
        description: comicData.description,
        genre: comicData.genre,
        tags: comicData.tags,
        publishType: monetizationData.mintAsNFT ? 'nft' : monetizationData.publishType,
      };

      // Add NFT details if minting
      if (monetizationData.mintAsNFT) {
        (comicPayload as any).nftDetails = {
          price: monetizationData.nftPrice || 0,
          maxSupply: monetizationData.nftCopies || 100,
          royaltyPercentage: 10, // Default 10% royalty
        };
      }

      formData.append('comicData', JSON.stringify(comicPayload));

      setUploadProgress(30);

      // Step 2: Upload to backend (which handles IPFS upload and metadata generation)
      const token = localStorage.getItem('token');
      const response = await axios.post(
        // `${process.env.NEXT_PUBLIC_API_URL}/comic/create-full`,
        // `${process.env.NEXT_LOCAL_API_URL}/comics/full`,
        'http://localhost:5000/api/comics/full',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round((progressEvent.loaded * 70) / progressEvent.total);
              setUploadProgress(30 + progress);
            }
          },
        }
      );

      setUploadProgress(100);
      setIsUploading(false);

      const createdComic = response.data.data.comic;
      const metadataCid = createdComic.nftMetadataCid;
      const dbComicId = createdComic._id;

      setComicId(dbComicId);

      console.log('✅ Comic created:', createdComic);
      console.log('📦 Metadata CID:', metadataCid);

       console.log('🔍 NFT Minting Check:', {
      mintAsNFT: monetizationData.mintAsNFT,
      metadataCid: metadataCid,
      isConnected: isConnected,
      address: address,
      chainId: chainId,
    });

      // Step 3: If NFT minting is enabled, interact with smart contract
      if (monetizationData.mintAsNFT && metadataCid && isConnected && address) {
        setIsMinting(true);
        setMintingProgress(10);
        // Check and request creator approval
     console.log('🔍 Checking creator approval status...');
     const isApproved = await checkCreatorApproval();
     if (!isApproved) {
          console.log('⚠️ Creator not approved. Requesting approval...');
          setMintingProgress(15);
          
          const approvalSuccess = await requestCreatorApproval();
          
          if (!approvalSuccess) {
            throw new Error('Failed to get creator approval. Please contact support.');
          }
          console.log('✅ Creator approved successfully!');
         // Wait for blockchain to process approval
          await new Promise(resolve => setTimeout(resolve, 3000));
        } else {
          console.log('✅ Creator already approved');
        }
          setMintingProgress(20);
        const currentChain = chainId === 296 ? hederaTestnet : mainnet;

        // Construct IPFS gateway URL for metadata
        const metadataURI = `https://gray-tough-elk-417.mypinata.cloud/ipfs/${metadataCid}`;

        // Convert price to Wei (assuming price is in ETH/MATIC)
        const priceInWei = parseEther((monetizationData.nftPrice || 0).toString());

        // Convert royalty to basis points (10% = 1000)
        const royaltyBasisPoints = 10 * 100; // 10% royalty

        setMintingProgress(30);

        console.log('🔄 Minting NFT with params:', {
          comicId: dbComicId,
          metadataURI,
          price: priceInWei.toString(),
          maxSupply: monetizationData.nftCopies || 100,
          royaltyPercentage: royaltyBasisPoints,
           contractAddress: QUIVA_COMICS_ADDRESS,
           currentChain: currentChain,
        });

        // Call smart contract with proper typing
        
        try {
          
          
          await writeContract({
          address: QUIVA_COMICS_ADDRESS,
          abi: QUIVA_COMICS_ABI,
          functionName: 'mintComic',
          args: [
            dbComicId,
            metadataURI,
            priceInWei,
            BigInt(monetizationData.nftCopies || 100),
            BigInt(royaltyBasisPoints),
          ],
          account: address,
          chain: currentChain,
        });

         console.log('✅ writeContract called successfully');
        setMintingProgress(60);
      } catch (contractError) {
        console.error('❌ Contract write error:', contractError);
        throw contractError;
      }
    } else {
      console.log('⚠️ Skipping NFT minting:', {
        reason: !monetizationData.mintAsNFT ? 'mintAsNFT is false' :
                !metadataCid ? 'No metadata CID' :
                !isConnected ? 'Wallet not connected' :
                !address ? 'No wallet address' : 'Unknown'
      });
          //If not minting NFT, mark as complete immediately
        setIsComplete(true);
      }

      return {
        success: true,
        comic: createdComic,
        metadataCid,
        requiresMinting: monetizationData.mintAsNFT && !hash,
      };
    } catch (error: any) {
      console.error('❌ Error publishing comic:', error);
      setMintError(error);
      throw error;
    } finally {
      setIsUploading(false);
      if (!writeError) {
        setIsMinting(false);
      }
    }
  };

  /**
   * Update backend with minting results
   */
  const updateComicWithMintData = async (
    comicId: string,
    tokenId: bigint,
    transactionHash: string
  ) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        // `${process.env.NEXT_PUBLIC_API_URL}/api/comic/${comicId}`,
        `http://localhost:5000/api/comics/${comicId}`,
        {
          nftDetails: {
            mintStatus: 'minted',
            tokenId: tokenId.toString(),
            contractAddress: QUIVA_COMICS_ADDRESS,
            transactionHash,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('✅ Comic updated with mint data');
    } catch (error) {   
      console.error('❌ Error updating comic with mint data:', error);
    }
  };


    // Reset function
  const reset = () => {
    setIsUploading(false);
    setIsMinting(false);
    setUploadProgress(0);
    setMintingProgress(0);
    setMintError(null);
    setTokenId(null);
    setComicId(null);
    setIsComplete(false);
    // resetWrite();
  };

  return {
    publishComic,
    updateComicWithMintData,
    reset,
    isUploading,
    isMinting,
    uploadProgress,
    mintingProgress,
    isWritePending,
    isConfirming,
    isComplete,
    isMintSuccess,
    mintError: writeError || mintError,
    tokenId,
    mintHash: hash,
    comicId,
    setTokenId,
    walletStatus: {
      isConnected,
      address,
      chainId,
    }
  };
};


// src/hooks/useComicMinting.ts

// import { useState, useEffect } from 'react';
// import { useAccount, useWriteContract, useWaitForTransactionReceipt, useChainId, usePublicClient } from 'wagmi';
// import { parseEther, decodeEventLog } from 'viem';
// import axios from 'axios';
// import { QUIVA_COMICS_ABI, QUIVA_COMICS_ADDRESS } from '../contracts/QuivaComics';
// import type { Chain } from 'wagmi/chains';

// interface ComicData {
//   title: string;
//   description: string;
//   genre: string[];
//   tags: string[];
//   ageRating: string;
//   coverImage: File | null;
//   pages: any[];
// }

// interface MonetizationData {
//   publishType: 'free' | 'paid';
//   price?: number;
//   mintAsNFT: boolean;
//   nftCopies?: number;
//   nftPrice?: number;
// }

// interface User {
//   _id: string;
//   email: string;
//   walletAddress?: string;
// }

// interface PublishComicParams {
//   comicData: ComicData;
//   monetizationData: MonetizationData;
//   user: User;
// }

// interface ApprovalStatus {
//   isChecking: boolean;
//   isApproving: boolean;
//   isApproved: boolean;
//   error: string | null;
// }

// const hederaTestnet = {
//   id: 296,
//   name: 'HederaTestnet',
//   nativeCurrency: { name: 'Hedera Testnet', symbol: 'HBAR', decimals: 18 },
//   rpcUrls: {
//     default: { http: ['https://testnet.hashio.io/api'] },
//   },
//   blockExplorers: {
//     default: { name: 'HashScan', url: 'https://hashscan.io/testnet/home' },
//   },
// } as const satisfies Chain;

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// export const useComicMinting = () => {
//   const { address, isConnected } = useAccount();
//   const chainId = useChainId();
//   const publicClient = usePublicClient();
  
//   const [isUploading, setIsUploading] = useState(false);
//   const [isMinting, setIsMinting] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [mintingProgress, setMintingProgress] = useState(0);
//   const [mintError, setMintError] = useState<Error | null>(null);
//   const [tokenId, setTokenId] = useState<bigint | null>(null);
//   const [comicId, setComicId] = useState<string | null>(null);
//   const [isComplete, setIsComplete] = useState(false);
//   const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>({
//     isChecking: false,
//     isApproving: false,
//     isApproved: false,
//     error: null,
//   });

//   // Wagmi hooks for contract interaction
//   const { 
//     data: hash, 
//     writeContract, 
//     error: writeError,
//     isPending: isWritePending,
//     reset: resetWrite 
//   } = useWriteContract();

//   const { 
//     isLoading: isConfirming, 
//     isSuccess: isMintSuccess,
//     data: receipt 
//   } = useWaitForTransactionReceipt({
//     hash,
//   });

//   // Extract token ID from transaction receipt
//   useEffect(() => {
//     const extractTokenId = async () => {
//       if (isMintSuccess && receipt && !tokenId) {
//         console.log('📝 Transaction receipt received:', receipt);

//         try {
//           // Method 1: Parse logs for ComicMinted event
//           const mintedLog = receipt.logs.find((log) => {
//             try {
//               const decoded = decodeEventLog({
//                 abi: QUIVA_COMICS_ABI,
//                 data: log.data,
//                 topics: log.topics,
//               });
//               return (decoded as any).eventName === 'ComicMinted';
//             } catch {
//               return false;
//             }
//           });

//           if (mintedLog) {
//             const decoded = decodeEventLog({
//               abi: QUIVA_COMICS_ABI,
//               data: mintedLog.data,
//               topics: mintedLog.topics,
//             });

//             if ((decoded as any).eventName === 'ComicMinted') {
//               const extractedTokenId = ((decoded as any).args as any).tokenId as bigint;
//               console.log('✅ Token ID extracted from event:', extractedTokenId.toString());
//               setTokenId(extractedTokenId);
//               return;
//             }
//           }

//           // Method 2: If event parsing fails, try getting from return value
//           if (publicClient && hash) {
//             const transaction = await publicClient.getTransaction({ hash });
//             console.log('📄 Transaction data:', transaction);
            
//             // Some contracts return tokenId directly
//             // This depends on your smart contract implementation
//           }

//           console.warn('⚠️ Could not extract token ID from receipt');
//         } catch (error) {
//           console.error('❌ Error extracting token ID:', error);
//         }
//       }
//     };

//     extractTokenId();
//   }, [isMintSuccess, receipt, tokenId, publicClient, hash]);

//   // Auto-update backend after successful mint
//   // useEffect(() => {
//   //   const updateBackend = async () => {
//   //     if (isMintSuccess && tokenId && comicId && hash && !isComplete) {
//   //       console.log('🔄 Updating backend with minting confirmation...');
        
//   //       try {
//   //         const response = await axios.post(
//   //           `${API_BASE_URL}/comics/confirm-nft-minting`,
//   //           {
//   //             comicId,
//   //             tokenId: tokenId.toString(),
//   //             transactionHash: hash,
//   //             minterAddress: address,
//   //           }
//   //         );

//   //         if (response.data.success) {
//   //           console.log('✅ Backend updated successfully');
//   //           setIsComplete(true);
//   //           setMintingProgress(100);
//   //         }
//   //       } catch (error: any) {
//   //         console.error('❌ Failed to update backend:', error);
//   //         setMintError(new Error('Minting succeeded but backend update failed'));
//   //       }
//   //     }
//   //   };

//   //   updateBackend();
//   // }, [isMintSuccess, tokenId, comicId, hash, address, isComplete]);

//   useEffect(() => {
//     const updateBackend = async () => {
//       if (isMintSuccess && hash && comicId && tokenId && !isComplete) {
//         console.log('✅ NFT minted successfully!');
//         console.log('📝 Transaction hash:', hash);
//         console.log('🎫 Token ID:', tokenId.toString());
//         setMintingProgress(90);
        
//         // Update backend with mint data
//         console.log('💾 Updating backend with mint data...');
//         try {
//           await updateComicWithMintData(comicId, tokenId, hash);
//           setMintingProgress(100);
//           setIsMinting(false);
//           setIsComplete(true);
//           console.log('🎉 All done! Comic is now fully live.');
//         } catch (error) {
//           console.error('❌ Error updating backend:', error);
//           setMintError(error as Error);
//         }
//       }
//     };

//     updateBackend();
//   }, [isMintSuccess, hash, comicId, tokenId, isComplete]);



  
// //   /**
// //    * Update backend with minting results
// //    */
//   const updateComicWithMintData = async (
//     comicId: string,
//     tokenId: bigint,
//     transactionHash: string
//   ) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.patch(
//         // `${process.env.NEXT_PUBLIC_API_URL}/api/comic/${comicId}`,
//         `${API_BASE_URL}/comics/${comicId}`,
//         {
//           nftDetails: {
//             mintStatus: 'minted',
//             tokenId: tokenId.toString(),
//             contractAddress: QUIVA_COMICS_ADDRESS,
//             transactionHash,
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log('✅ Comic updated with mint data');
//     } catch (error) {
//       console.error('❌ Error updating comic with mint data:', error);
//     }
//   };


//   // Check if creator is approved
//   const checkCreatorApproval = async (): Promise<boolean> => {
//     if (!address) {
//       console.log('❌ No wallet connected');
//       return false;
//     }

//     setApprovalStatus(prev => ({ ...prev, isChecking: true, error: null }));

//     try {
//        const token = localStorage.getItem('token');
//       const response = await axios.get(
//         `${API_BASE_URL}/creators/check-approval/${address}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const isApproved = response.data.data?.isApproved || false;
//       console.log(`✅ Creator approval status: ${isApproved}`);
      
//       setApprovalStatus(prev => ({ 
//         ...prev, 
//         isChecking: false, 
//         isApproved 
//       }));

//       return isApproved;
//     } catch (error: any) {
//       console.error('❌ Error checking creator approval:', error);
//       setApprovalStatus(prev => ({ 
//         ...prev, 
//         isChecking: false, 
//         error: error.message 
//       }));
//       return false;
//     }
//   };

//   // Request creator approval
//   const requestCreatorApproval = async (): Promise<string> => {
//     if (!address) {
//       throw new Error('No wallet connected');
//     }

//     setApprovalStatus(prev => ({ ...prev, isApproving: true, error: null }));

//     try { 
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         `${API_BASE_URL}/creators/approve-creator`,
//         { walletAddress: address },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         console.log('✅ Creator approval requested successfully');
//         setApprovalStatus(prev => ({ 
//           ...prev, 
//           isApproving: false, 
//           isApproved: true 
//         }));
//         return response.data.data.transactionHash;
//       } else {
//         throw new Error(response.data.message || 'Approval failed');
//       }
//     } catch (error: any) {
//       console.error('❌ Error requesting creator approval:', error);
      
//       // Handle already approved case
//       if (error.response?.data?.message?.includes('already approved')) {
//         setApprovalStatus(prev => ({ 
//           ...prev, 
//           isApproving: false, 
//           isApproved: true 
//         }));
//         return 'already-approved';
//       }

//       setApprovalStatus(prev => ({ 
//         ...prev, 
//         isApproving: false, 
//         error: error.message 
//       }));
//       throw error;
//     }
//   };

//   // Main publish function
//   const publishComic = async ({ comicData, monetizationData, user }: PublishComicParams) => {
//     if (!isConnected || !address) {
//       throw new Error('Please connect your wallet first');
//     }

//     if (chainId !== hederaTestnet.id) {
//       throw new Error('Please switch to Hedera Testnet');
//     }

//     try {
//       setMintError(null);
//       setIsComplete(false);
//       setTokenId(null);
      
//       // Step 1: Check and request creator approval if needed
//       console.log('🔍 Step 1: Checking creator approval...');
//       const isApproved = await checkCreatorApproval();

//       if (!isApproved) {
//         console.log('⏳ Requesting creator approval...');
//         await requestCreatorApproval();
//         console.log('✅ Creator approved!');
//       }

//       // Step 2: Upload comic to backend (IPFS)
//       console.log('📤 Step 2: Uploading comic to IPFS...');
//       setIsUploading(true);
//       setUploadProgress(0);

//       const formData = new FormData();
      
//       if (comicData.coverImage) {
//         formData.append('coverImage', comicData.coverImage);
//       }

//       comicData.pages.forEach((page, index) => {
//         if (page.blob) {
//           formData.append('pages', page.blob, page.name || `page-${index + 1}.jpg`);
//         }
//       });

//       const comicPayload = {
//         title: comicData.title,
//         description: comicData.description,
//         genre: comicData.genre,
//         tags: comicData.tags,
//         ageRating: comicData.ageRating,
//         publishType: monetizationData.mintAsNFT ? 'nft' : monetizationData.publishType,
//         authorId: user._id,
//       };

//       if (monetizationData.mintAsNFT) {
//         (comicPayload as any).nftDetails = {
//           price: monetizationData.nftPrice || 0,
//           maxSupply: monetizationData.nftCopies || 100,
//           royaltyPercentage: 10,
//         };
//       }

//       formData.append('comicData', JSON.stringify(comicPayload));
//        const token = localStorage.getItem('token');
//       const uploadResponse = await axios.post(
//         `${API_BASE_URL}/comics/full`,
//         formData,
//         {
//           headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
//           onUploadProgress: (progressEvent) => {
//             const percentCompleted = progressEvent.total
//               ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
//               : 0;
//             setUploadProgress(percentCompleted);
//           },
//         }
//       );

//       if (!uploadResponse.data.success) {
//         throw new Error(uploadResponse.data.message || 'Upload failed');
//       }

//       const dbComicId = uploadResponse.data.data.comic._id;
//       const metadataURI = uploadResponse.data.data.comic.metadataURI;

//       setComicId(dbComicId);
//       setIsUploading(false);
//       setUploadProgress(100);

//       console.log('✅ Comic uploaded successfully');
//       console.log('📝 Comic ID:', dbComicId);
//       console.log('📝 Metadata URI:', metadataURI);

//       // Step 3: Mint NFT if required
//       if (monetizationData.mintAsNFT && metadataURI) {
//         console.log('🎨 Step 3: Minting NFT on blockchain...');
//         setIsMinting(true);
//         setMintingProgress(0);

//         const priceInWei = parseEther((monetizationData.nftPrice || 0).toString());
//         const royaltyBasisPoints = 1000; // 10%
//          const currentChain = chainId === 296 ? hederaTestnet : null;

//         console.log('📝 Minting parameters:');
//         console.log('  - Comic ID:', dbComicId);
//         console.log('  - Metadata URI:', metadataURI);
//         console.log('  - Price:', priceInWei.toString(), 'wei');
//         console.log('  - Max Supply:', monetizationData.nftCopies);
//         console.log('  - Royalty:', royaltyBasisPoints, 'basis points');

//         const mintArgs = [
//           dbComicId,
//           metadataURI,
//           priceInWei,
//           BigInt(monetizationData.nftCopies || 100),
//           BigInt(royaltyBasisPoints),
//         ] as const;

//         writeContract({
//           address: QUIVA_COMICS_ADDRESS,
//           abi: QUIVA_COMICS_ABI,
//           functionName: 'mintComic',
//           args: mintArgs,
//            account: address,
//           chain: currentChain,
//         });

//         setMintingProgress(33);
//       } else {
//         // Free comic - no minting required
//         setIsComplete(true);
//         setComicId(dbComicId);
//       }

//     } catch (error: any) {
//       console.error('❌ Publishing error:', error);
//       setMintError(error);
//       setIsUploading(false);
//       setIsMinting(false);
//       throw error;
//     }
//   };

//   // Reset function
//   const reset = () => {
//     setIsUploading(false);
//     setIsMinting(false);
//     setUploadProgress(0);
//     setMintingProgress(0);
//     setMintError(null);
//     setTokenId(null);
//     setComicId(null);
//     setIsComplete(false);
//     setApprovalStatus({
//       isChecking: false,
//       isApproving: false,
//       isApproved: false,
//       error: null,
//     });
//     resetWrite();
//   };

//   return {
//     publishComic,
//     reset,
//     isUploading,
//     isMinting,
//     uploadProgress,
//     mintingProgress,
//     isWritePending,
//     isConfirming,
//     isMintSuccess,
//     isComplete,
//     mintError: writeError || mintError,
//     approvalStatus,
//     tokenId,
//     mintHash: hash,
//     comicId,
//     setTokenId,
//     walletStatus: {
//       isConnected,
//       address,
//       chainId,
//     },
//   };
// };

// export default useComicMinting;
