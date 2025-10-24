# Comic NFT Minting Integration

This document explains the comprehensive integration of NFT minting functionality for comics when creators select "Pay Per Read" or enable NFT minting.

## Overview

The integration provides a seamless flow for creators to:
1. Upload comic files (images/ZIP)
2. Set monetization preferences (free/paid)
3. Enable NFT minting (optional)
4. Automatically handle IPFS upload for paid comics
5. Mint NFTs on blockchain when enabled
6. Save all data to backend database

## Key Components

### 🔧 Core Hooks

#### `useMintComic.ts`
- Handles blockchain NFT minting using wagmi
- Interacts with QuivaComics smart contract
- Manages transaction states and error handling

#### `useComicMinting.ts` (NEW)
- Orchestrates the complete publishing flow
- Handles IPFS uploads for paid comics
- Coordinates blockchain minting and database storage
- Provides comprehensive progress tracking

### 🎨 UI Components

#### `ComicPublisher.tsx` (ENHANCED)
- Enhanced with NFT minting progress indicators
- Shows IPFS upload progress
- Displays blockchain transaction status
- Provides detailed error handling

#### `OnboardingPage.tsx` (ENHANCED)
- Added smart integration info for paid comics
- Better UX for NFT options
- Clear indication of automatic IPFS integration

## Workflow

### For Free Comics
1. **Upload** → Direct to backend database
2. **Store** → Traditional file storage
3. **Publish** → Available immediately

### For Paid Comics (Pay Per Read)
1. **Upload** → IPFS storage (automatic)
2. **Metadata** → Generate and store on IPFS
3. **Database** → Save with IPFS references
4. **Publish** → Available with blockchain benefits

### For NFT Comics
1. **Upload** → IPFS storage (required)
2. **Metadata** → Generate NFT-compliant metadata
3. **Mint** → Create NFT on blockchain
4. **Database** → Save with blockchain references
5. **Publish** → Available as collectible NFT

## Backend Requirements

### IPFS Upload Endpoint
```
POST /api/ipfs/upload-comic
```

**Required Fields:**
- `coverImage`: File (optional)
- `pages`: File[] (required)
- `title`: string
- `description`: string
- `genre`: JSON string array
- `tags`: JSON string array
- `ageRating`: string

**Response:**
```json
{
  "success": true,
  "data": {
    "metadataUri": "ipfs://QmXXX...", // Main metadata JSON
    "coverImageUri": "ipfs://QmYYY...", // Cover image hash
    "pagesUris": ["ipfs://QmZZZ1...", "ipfs://QmZZZ2..."] // Page hashes
  }
}
```

### Enhanced Comics Database Schema
```javascript
{
  // Existing fields...
  title: String,
  description: String,
  genre: [String],
  tags: [String],
  ageRating: String,
  publishType: String, // 'free' | 'paid'
  price: Number,
  
  // New NFT fields
  mintAsNFT: Boolean,
  nftCopies: Number,
  nftPrice: Number,
  
  // Blockchain integration fields
  metadataUri: String, // IPFS metadata URI
  coverImageUri: String, // IPFS cover image URI
  pagesUris: [String], // IPFS page URIs
  blockchainTokenId: String, // NFT token ID
  blockchainTxHash: String, // Minting transaction hash
  
  // Status tracking
  ipfsUploaded: Boolean,
  nftMinted: Boolean,
  blockchainConfirmed: Boolean
}
```

## Smart Contract Integration

### Contract: QuivaComics
**Address:** `0xF5CBD0241D176C6cF35564d2F5b701F74a0756E8`

**Key Functions:**
- `mintComic(comicId, metadataURI, price, maxSupply, royaltyPercentage)`
- `purchaseComic(tokenId, amount)`
- `getComic(tokenId)`

**Events:**
- `ComicMinted(tokenId, creator, comicId, price, maxSupply)`
- `ComicPurchased(tokenId, buyer, creator, price)`

## Progress Tracking

The integration provides real-time progress tracking:

1. **IPFS Upload** (0-100%)
   - File validation and preparation
   - Individual file uploads
   - Metadata generation and upload

2. **Blockchain Minting** (0-100%)
   - Transaction preparation
   - Wallet interaction
   - Block confirmation

3. **Database Storage** (Final step)
   - Save all references
   - Update comic status

## Error Handling

### Common Error Scenarios
- **Wallet not connected** → Prompt connection
- **Insufficient gas** → Clear error message
- **IPFS upload failure** → Retry mechanism
- **Transaction rejected** → User-friendly explanation
- **Network issues** → Appropriate fallbacks

### Error Display
- Color-coded error messages
- Specific error types with solutions
- Progress preservation on retry

## Features

### ✅ Implemented
- [x] Complete IPFS integration for paid comics
- [x] Blockchain NFT minting with progress tracking
- [x] Enhanced UI with real-time progress
- [x] Comprehensive error handling
- [x] Automatic metadata generation
- [x] Transaction hash and token ID tracking

### 🚧 Backend Requirements
- [ ] IPFS upload endpoint implementation
- [ ] Database schema updates
- [ ] Metadata generation service
- [ ] IPFS pinning service integration

### 🔮 Future Enhancements
- [ ] Batch minting for series
- [ ] Royalty distribution system
- [ ] Secondary market integration
- [ ] Advanced metadata customization
- [ ] Cross-chain support

## Usage Example

```typescript
// In ComicPublisher component
const {
  publishComic,
  isUploading,
  isMinting,
  uploadProgress,
  mintingProgress,
  tokenId,
  mintHash,
} = useComicMinting();

// Publish with NFT minting
const result = await publishComic({
  comicData: {
    title: "My Awesome Comic",
    description: "An epic adventure...",
    // ... other fields
  },
  monetizationData: {
    publishType: "paid",
    price: 5.99,
    mintAsNFT: true,
    nftCopies: 100,
    nftPrice: 0.1,
  },
  user: { _id: "user123" }
});
```

## Security Considerations

1. **IPFS Pinning** - Ensure content permanence
2. **Metadata Validation** - Prevent malicious content
3. **Price Validation** - Prevent manipulation
4. **Wallet Verification** - Ensure authorized minting
5. **Rate Limiting** - Prevent spam minting

## Testing

### Test Scenarios
1. Free comic publishing (traditional flow)
2. Paid comic with IPFS upload
3. NFT minting with blockchain confirmation
4. Error handling for each step
5. Progress tracking accuracy
6. Wallet connection edge cases

---

This integration provides a comprehensive solution for comic creators to seamlessly transition from traditional publishing to blockchain-enabled, NFT-mintable comics with decentralized storage.