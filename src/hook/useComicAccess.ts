// import { useState, useEffect } from 'react';
// import { useAccount, useReadContract } from 'wagmi';
// import { QUIVA_COMICS_ABI, QUIVA_COMICS_ADDRESS } from '../contracts/QuivaComics';
// import axios from 'axios';

// interface ComicAccessResult {
//   hasAccess: boolean;
//   accessType: 'free' | 'nft_owner' | 'purchased' | 'none';
//   nftBalance?: number;
//   isLoading: boolean;
//   error: Error | null;
// }

// export const useComicAccess = (comicId: string, tokenId?: string) => {
//   const { address, isConnected } = useAccount();
//   const [accessResult, setAccessResult] = useState<ComicAccessResult>({
//     hasAccess: false,
//     accessType: 'none',
//     isLoading: true,
//     error: null,
//   });

//   // Check NFT balance if tokenId exists
//   const { data: nftBalance, isLoading: isLoadingBalance } = useReadContract({
//     address: QUIVA_COMICS_ADDRESS,
//     abi: QUIVA_COMICS_ABI,
//     functionName: 'balanceOf',
//     args: address && tokenId ? [address, BigInt(tokenId)] : undefined,
//     query: {
//       enabled: !!address && !!tokenId && isConnected,
//     },
//   });

//   useEffect(() => {
//     const checkAccess = async () => {
//       try {
//         setAccessResult(prev => ({ ...prev, isLoading: true }));

//         // Fetch comic details from backend


//          const token = localStorage.getItem('token');
//         const response = await axios.get(`http://localhost:5000/api/comics/${comicId}`, {
//           headers: token ? { Authorization: `Bearer ${token}` } : {},
//         });

//         const comic = response.data.data.comic;

//         // Case 1: Free Comic
//         if (comic.publishType === 'free') {
//           setAccessResult({
//             hasAccess: true,
//             accessType: 'free',
//             isLoading: false,
//             error: null,
//           });
//           return;
//         }

//         // Case 2: NFT Comic - Check blockchain ownership
//         if (comic.publishType === 'nft' && comic.nftDetails?.tokenId) {
//           if (!isConnected || !address) {
//             setAccessResult({
//               hasAccess: false,
//               accessType: 'none',
//               isLoading: false,
//               error: new Error('Please connect wallet to access NFT comic'),
//             });
//             return;
//           }
//         }
//         //   const balance = nftBalance ? Number(nftBalance) : 0;

//         //   if (balance > 0) {
//         //     setAccessResult({
//         //       hasAccess: true,
//         //       accessType: 'nft_owner',
//         //       nftBalance: balance,
//         //       isLoading: false,
//         //       error: null,
//         //     });
//         //     return;
//         //   } else {
//         //     setAccessResult({
//         //       hasAccess: false,
//         //       accessType: 'none',
//         //       nftBalance: 0,
//         //       isLoading: false,
//         //       error: new Error('You must own this NFT to read'),
//         //     });
//         //     return;
//         //   }
//         // }

//         // Case 3: Paid Per-Read - Check database for purchase
//     //     if (comic.publishType === 'paid') {
//     //       if (!token) {
//     //         setAccessResult({
//     //           hasAccess: false,
//     //           accessType: 'none',
//     //           isLoading: false,
//     //           error: new Error('Please login to access paid comic'),
//     //         });
//     //         return;
//     //       }

//     //       // Check if user has purchased
//     //       const purchaseCheck = await axios.get(
//     //         `http://localhost:5000/api/library/check-access/${comicId}`,
//     //         {
//     //           headers: { Authorization: `Bearer ${token}` },
//     //         }
//     //       );

//     //       if (purchaseCheck.data.hasAccess) {
//     //         setAccessResult({
//     //           hasAccess: true,
//     //           accessType: 'purchased',
//     //           isLoading: false,
//     //           error: null,
//     //         });
//     //       } else {
//     //         setAccessResult({
//     //           hasAccess: false,
//     //           accessType: 'none',
//     //           isLoading: false,
//     //           error: new Error('Please purchase this comic to read'),
//     //         });
//     //       }
//     //       return;
//     //     }

//     //     // Default: No access
//     //     setAccessResult({
//     //       hasAccess: false,
//     //       accessType: 'none',
//     //       isLoading: false,
//     //       error: null,
//     //     });
//      const purchaseCheck = await  axios.get(`http://localhost:5000/api/transactions/user/verify_nft/${comicId}`, {
//           headers: token ? { Authorization: `Bearer ${token}` } : {
            
//           },
//         });
        
//       } catch (error: any) {
//         console.error('Error checking access:', error);
//         setAccessResult({
//           hasAccess: false,
//           accessType: 'none',
//           isLoading: false,
//           error: error,
//         });
//       }
//     }

//     checkAccess();
//   }, [comicId, tokenId, address, isConnected]);

//   return accessResult;
// };


import axios from 'axios';
import axiosInstance from '../redux/axios-instance';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface VerifyNFTResponse {
  success: boolean;
  data: {
    hasPurchased: boolean;
    message: string;
  };
}

/**
 * Verify if user has purchased the NFT for a specific comic
 */
export const verifyNFTOwnership = async (
  comicId: string,
  token: string
): Promise<boolean> => {
  try {
    const response = await axiosInstance.get<VerifyNFTResponse>(
      `/transactions/user/verify_nft/${comicId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.success && response.data.data.hasPurchased;
  } catch (error: any) {
    console.error('Error verifying NFT ownership:', error);
    
    // If error is 404 or user hasn't purchased, return false
    if (error.response?.status === 404 || error.response?.status === 403) {
      return false;
    }
    
    throw error;
  }
};

export default {
  verifyNFTOwnership,
};