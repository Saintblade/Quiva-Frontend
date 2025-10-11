// src/hooks/useComicMinting.ts
import { useState } from 'react';
import { useMintComic } from './useMintComic';
import { useAppDispatch } from '@/redux/hook';
import { createFullComic } from '@/redux/slices/comicSlice';

interface ComicMintingParams {
  comicData: {
    title: string;
    description: string;
    genre: string[];
    tags: string[];
    ageRating: string;
    coverImage: File | null;
    pages: Array<{
      name: string;
      blob: Blob;
      preview: string;
    }>;
  };
  monetizationData: {
    publishType: "free" | "paid";
    price?: number;
    mintAsNFT: boolean;
    nftCopies?: number;
    nftPrice?: number;
  };
  user: {
    _id: string;
  };
}

interface IPFSUploadResponse {
  metadataUri: string;
  coverImageUri: string;
  pagesUris: string[];
}

export function useComicMinting() {
  const [isUploading, setIsUploading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mintingProgress, setMintingProgress] = useState(0);
  const dispatch = useAppDispatch();
  
  const {
    mintComic,
    hash: mintHash,
    tokenId,
    isWritePending,
    isConfirming,
    isSuccess: isMintSuccess,
    writeError: mintError,
  } = useMintComic();

  // Upload comic data to IPFS and get metadata URI
  const uploadToIPFS = async (comicData: ComicMintingParams['comicData']): Promise<IPFSUploadResponse> => {
    setIsUploading(true);
    setUploadProgress(10);

    try {
      // Create FormData for IPFS upload
      const formData = new FormData();
      
      // Add cover image if exists
      if (comicData.coverImage) {
        formData.append('coverImage', comicData.coverImage);
      }
      
      // Add all comic pages
      comicData.pages.forEach((page, index) => {
        const file = new File([page.blob], page.name, { 
          type: page.blob.type || 'image/jpeg' 
        });
        formData.append('pages', file);
      });

      setUploadProgress(30);
      
      // Add metadata
      formData.append('title', comicData.title);
      formData.append('description', comicData.description);
      formData.append('genre', JSON.stringify(comicData.genre));
      formData.append('tags', JSON.stringify(comicData.tags));
      formData.append('ageRating', comicData.ageRating);

      setUploadProgress(50);

      // Upload to IPFS via backend endpoint
      const response = await fetch('/api/comics/:comicId/nft/prepare', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to upload to IPFS');
      }

      const data = await response.json();
      setUploadProgress(100);
      
      return {
        metadataUri: data.metadataUri,
        coverImageUri: data.coverImageUri,
        pagesUris: data.pagesUris,
      };
    } catch (error) {
      console.error('IPFS upload failed:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  // Main function to publish comic with optional NFT minting
  const publishComic = async (params: ComicMintingParams) => {
    const { comicData, monetizationData, user } = params;
    
    try {
      let ipfsData: IPFSUploadResponse | null = null;
      let blockchainTokenId: bigint | null = null;

      // Step 1: If it's a paid comic or NFT, upload to IPFS first
      if (monetizationData.publishType === 'paid' || monetizationData.mintAsNFT) {
        console.log('📤 Uploading comic to IPFS...');
        ipfsData = await uploadToIPFS(comicData);
        console.log('✅ IPFS upload complete:', ipfsData.metadataUri);
      }

      // Step 2: If NFT minting is enabled, mint on blockchain
      if (monetizationData.mintAsNFT && ipfsData && monetizationData.nftPrice && monetizationData.nftCopies) {
        console.log('🔗 Minting NFT on blockchain...');
        setIsMinting(true);
        setMintingProgress(20);

        try {
          await mintComic({
            comicId: `comic_${Date.now()}_${user._id}`, // Unique comic ID
            metadataUri: ipfsData.metadataUri,
            price: monetizationData.nftPrice,
            maxSupply: monetizationData.nftCopies,
            royaltyPercentage: 10, // 10% royalty to creator
          });

          setMintingProgress(60);
          
          // Wait for blockchain confirmation
          // Note: The useMintComic hook handles the transaction confirmation
          console.log('⏳ Waiting for blockchain confirmation...');
          
        } catch (error) {
          console.error('Blockchain minting failed:', error);
          throw new Error('Failed to mint NFT on blockchain');
        }
      }

      // Step 3: Save comic to backend database
      console.log('💾 Saving comic to database...');
      setMintingProgress(80);

      const backendFormData = new FormData();
      
      // Add creator ID
      backendFormData.append('creatorId', user._id);
      
      // Add basic comic data
      backendFormData.append('title', comicData.title.trim());
      backendFormData.append('description', comicData.description.trim());
      
      // Add genres and tags
      comicData.genre.forEach(genre => {
        backendFormData.append('genre', genre);
      });
      comicData.tags.forEach(tag => {
        backendFormData.append('tags', tag);
      });
      
      backendFormData.append('ageRating', comicData.ageRating);
      backendFormData.append('status', 'published');
      
      // Add monetization data
      backendFormData.append('publishType', monetizationData.publishType);
      if (monetizationData.publishType === 'paid' && monetizationData.price) {
        backendFormData.append('price', monetizationData.price.toString());
      }
      
      // Add NFT and blockchain data
      backendFormData.append('mintAsNFT', monetizationData.mintAsNFT.toString());
      if (monetizationData.mintAsNFT) {
        if (monetizationData.nftCopies) {
          backendFormData.append('nftCopies', monetizationData.nftCopies.toString());
        }
        if (monetizationData.nftPrice) {
          backendFormData.append('nftPrice', monetizationData.nftPrice.toString());
        }
        
        // Add blockchain and IPFS data
        if (ipfsData) {
          backendFormData.append('metadataUri', ipfsData.metadataUri);
          backendFormData.append('coverImageUri', ipfsData.coverImageUri);
          backendFormData.append('pagesUris', JSON.stringify(ipfsData.pagesUris));
        }
        
        // Add blockchain data when available
        if (tokenId) {
          backendFormData.append('blockchainTokenId', tokenId.toString());
        }
        if (mintHash) {
          backendFormData.append('blockchainTxHash', mintHash);
        }
      }
      
      // Add cover image if not already uploaded to IPFS
      if (comicData.coverImage && !ipfsData) {
        backendFormData.append('coverImage', comicData.coverImage);
      }
      
      // Add comic pages if not already uploaded to IPFS
      if (!ipfsData) {
        comicData.pages.forEach((page) => {
          const file = new File([page.blob], page.name, { 
            type: page.blob.type || 'image/jpeg' 
          });
          backendFormData.append('pages', file);
        });
      }

      // Save to backend
      const response = await dispatch(createFullComic(backendFormData as any)).unwrap();
      setMintingProgress(100);
      
      console.log('🎉 Comic published successfully!');
      
      return {
        success: true,
        comicId: response._id,
        tokenId: blockchainTokenId,
        metadataUri: ipfsData?.metadataUri,
        txHash: mintHash,
      };

    } catch (error) {
      console.error('Comic publishing failed:', error);
      throw error;
    } finally {
      setIsMinting(false);
      setMintingProgress(0);
    }
  };

  return {
    publishComic,
    isUploading,
    isMinting,
    uploadProgress,
    mintingProgress,
    isWritePending,
    isConfirming,
    isMintSuccess,
    mintError,
    tokenId,
    mintHash,
  };
}