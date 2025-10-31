# Quiva Comic Platform - Complete Documentation

**Version:** 1.0  
**Last Updated:** October 30, 2025  
**Platform:** Web3-Enabled Comic Publishing and NFT Marketplace

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [User Roles and Authentication](#user-roles-and-authentication)
5. [Core Features](#core-features)
6. [Database Architecture](#database-architecture)
7. [Smart Contract Integration](#smart-contract-integration)
8. [API Documentation](#api-documentation)
9. [Frontend Architecture](#frontend-architecture)
10. [NFT and Blockchain Features](#nft-and-blockchain-features)
11. [IPFS Integration](#ipfs-integration)
12. [Monetization System](#monetization-system)
13. [Security and Access Control](#security-and-access-control)
14. [Deployment Guide](#deployment-guide)
15. [Development Workflow](#development-workflow)
16. [Troubleshooting](#troubleshooting)
17. [Future Roadmap](#future-roadmap)
18. Pitch Deck Doc [https://drive.google.com/file/d/1IkCd9hBZkaqNjHMH1npsIUC9pV2Gl038/view?usp=drivesdk]
---

## 1. Executive Summary

### 1.1 What is Quiva?

Quiva is a next-generation comic platform that bridges traditional comic publishing with Web3 technology. It enables creators and fans to engage through decentralized publishing, NFT minting, games, and immersive stories. The platform integrates blockchain technology to allow creators to mint, own, and monetize their comics securely while providing readers with both free and premium content.

### 1.2 Key Differentiators

- **Blockchain Integration**: Comics can be minted as NFTs with built-in royalties
- **Dual Publishing Model**: Support for  (free/paid) which are  NFT-based publishing
- **IPFS Storage**: Decentralized storage ensuring permanent availability
- **Smart Contract Marketplace**: On-chain trading with automated royalties
- **Creator-First Approach**: Tools designed for comic creators' needs
- **Hedera Network**: Leveraging Hedera Testnet for fast, low-cost transactions

### 1.3 Core Value Proposition

For **Creators**:
- Own The copies of content through NFTs.
- Multiple monetization options (free, pay-per-read, NFT sales)
- Automated royalty payments
- Direct connection with fans
- Decentralized content hosting

For **Readers**:
- Access to diverse comic library
- Option to own the NFT version of the comics
- Support favorite creators directly
- No platform lock-in (IPFS-based content)


---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer (Frontend)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Next.js    │  │  React/TSX   │  │  TailwindCSS │      │
│  │   App Router │  │  Components  │  │    Styling   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Wallet Integration Layer                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Hashpack
     RainbowKit
   │ Wagmi     │  │        │      │       Viem  
│  │   Wallet UI  │  │  Web3 Hooks  │  │  Ethereum    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Backend API Layer (Node.js)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Express.js  │  │  TypeScript  │  │   REST API   │      │
│  │   Routing    │  │   Services   │  │  Endpoints   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
┌─────────────────────────┐   ┌─────────────────────────┐
│   Database Layer        │   │   Blockchain Layer      │
│  ┌──────────────────┐   │   │  ┌──────────────────┐   │
│  │    MongoDB       │   │   │  │  Smart Contract  │   │
│  │  User Data       │   │   │  │  (Hedera EVM)    │   │
│  │  Comics Metadata │   │   │  │  ERC-1155 NFTs   │   │
│  │  Transactions    │   │   │  └──────────────────┘   │
│  └──────────────────┘   │   │  ┌──────────────────┐   │
│                         │   │  │  IPFS Storage    │   │
│                         │   │  │  Comic Pages     │   │
│                         │   │  │  Metadata JSON   │   │
│                         │   │  └──────────────────┘   │
└─────────────────────────┘   └─────────────────────────┘
```

### 2.2 Clean Architecture Layers

**Controllers Layer** (`src/controllers/`)
- Handle HTTP requests and responses
- Request validation and sanitization
- Error handling and status codes

**Services Layer** (`src/services/` and `src/features/`)
- Business logic implementation
- Data transformation
- External service integration

**Repository Layer** (`src/models/`)
- Data access abstraction
- MongoDB schema definitions
- Database query operations

**Middleware Layer** (`src/middleware/`)
- Authentication verification
- Rate limiting
- Role-based access control
- Request logging

### 2.3 System Components

1. **Frontend Application** (Next.js 14+ with App Router)
2. **Backend API** (Express.js + TypeScript)
3. **Smart Contracts** (Solidity on Hedera EVM)
4. **IPFS Network** (Pinata Gateway)
5. **Database** (MongoDB Atlas)
6. **Wallet Integration** (Hashpack,RainbowKit + Wagmi)
7. **Blockchain Network** (Hedera Testnet)

---

## 3. Technology Stack

### 3.1 Frontend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.x | React framework with App Router |
| React | 18.x | UI component library |
| TypeScript | 5.x | Type-safe JavaScript |
| TailwindCSS | 3.x | Utility-first CSS framework |
| RainbowKit | 2.x | Wallet connection UI |
| Wagmi | 2.x | React hooks for Ethereum |
| Viem | 2.x | TypeScript Ethereum library |
| Redux Toolkit | 2.x | State management |
| React Query | 5.x | Server state management |
| Lucide React | Latest | Icon library |

### 3.2 Backend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | JavaScript runtime |
| Express.js | 4.x | Web application framework |
| TypeScript | 5.x | Type-safe development |
| MongoDB | 6.x | NoSQL database |
| Mongoose | 8.x | MongoDB object modeling |
| Ethers.js | 6.x | Ethereum library for backend |
| JWT | 9.x | Authentication tokens |
| Bcrypt | 5.x | Password hashing |
| Nodemailer | 6.x | Email service |
| Multer | 1.x | File upload handling |

### 3.3 Blockchain Stack

| Technology | Network | Purpose |
|------------|---------|---------|
| Hedera Testnet | ID: 296 | Primary blockchain network |
| Solidity | 0.8.20 | Smart contract language |
| ERC-1155 | Standard | Multi-token NFT standard |
| IPFS | Decentralized | Content storage |
| Pinata | Gateway | IPFS pinning service |

### 3.4 Development Tools

- **Package Manager**: npm/yarn
- **Version Control**: Git
- **API Testing**: Postman/Thunder Client
- **Linting**: ESLint + Prettier
- **Testing**: Jest (planned)
- **CI/CD**: GitHub Actions (planned)

---

## 4. User Roles and Authentication

### 4.1 User Roles

```typescript
export enum Roles {
  READER = "reader",
  CREATOR = "creator",
  ADMIN = "admin",
  SUPERADMIN = "superadmin"
}
```

#### Role Permissions

**READER**
- Browse and read free comics
- Purchase paid comics
- Buy NFT comics from marketplace
- Manage reading library
- Follow creators

**CREATOR**
- All READER permissions
- Upload and publish comics
- Create NFT collections
- Set pricing and royalties
- View earnings analytics
- Manage comic library
- List NFTs on marketplace

**ADMIN**
- All CREATOR permissions
- Approve creator accounts
- Moderate content
- View platform analytics
- Manage featured content

**SUPERADMIN**
- All ADMIN permissions
- System configuration
- User management
- Platform settings
- Database access

### 4.2 Authentication Methods

#### 4.2.1 Email Authentication (OTP-Based)

```typescript
// Flow:
1. User enters email
2. System generates 6-digit OTP
3. OTP sent via Nodemailer
4. User verifies OTP
5. JWT token issued
```

**Endpoints:**
- `POST /api/auth/send-otp` - Request OTP
- `POST /api/auth/verify-otp` - Verify OTP and login

**OTP Specifications:**
- Length: 6 digits
- Validity: 10 minutes
- Rate Limit: 1 request per minute per email
- Storage: MongoDB with expiry

#### 4.2.2 Wallet Authentication (Web3)

```typescript
// Flow:
1. User connects wallet (RainbowKit)
2. System generates nonce message
3. User signs message with wallet
4. Backend verifies signature
5. JWT token issued
```

**Supported Wallets:**
- MetaMask
- WalletConnect
- Coinbase Wallet
- Rainbow Wallet
- And all RainbowKit supported wallets

**Endpoints:**
- `POST /api/auth/wallet/message` - Get sign message
- `POST /api/auth/wallet/verify` - Verify signature and login

### 4.3 User Model

```typescript
interface IUser {
  email?: string;
  emailVerified: boolean;
  walletAddress?: string;
  username?: string;
  displayName?: string;
  bio?: string;
  nonce?: string;          // For wallet authentication
  avatar?: string;
  banner?: string;
  role: Roles[];           // Array to support multiple roles
  creatorProfile?: {
    penName?: string;
    genres?: string[];
    verified: boolean;
  };
  onboardingCompleted: boolean;
  createdAt: Date;
  lastLogin: Date;
}
```

### 4.4 JWT Token Structure

```typescript
{
  userId: string;         // MongoDB ObjectId
  email?: string;
  walletAddress?: string;
  role: string[];
  iat: number;           // Issued at
  exp: number;           // Expires at (7 days default)
}
```

### 4.5 Onboarding Flow

```typescript
// Required fields during onboarding:
interface OnboardingRequest {
  username: string;       // Unique, 3-30 characters
  displayName?: string;
  bio?: string;
  role: "reader" | "creator";
  // Additional for creators:
  penName?: string;
  genres?: string[];
}
```

**Steps:**
1. User authenticates (email or wallet)
2. Check if `onboardingCompleted === false`
3. Show onboarding form
4. User selects role and provides info
5. System validates username uniqueness
6. Profile created
7. Set `onboardingCompleted = true`

---

## 5. Core Features

### 5.1 Comic Publishing System

#### 5.1.1 Upload Methods

**Method 1: Script-Based Creation**
- AI-assisted comic generation (future feature)
- Script-to-comic conversion
- Automated panel layout

**Method 2: Manual Upload**
- Upload individual pages
- Drag-and-drop interface
- Support formats: PNG, JPG, WEBP
- Max file size: 10MB per page
- Recommended: 1200x1800px resolution

#### 5.1.2 Publishing Flow

```
Step 1: Comic Details
├── Title (required, max 200 chars)
├── Description (required, max 1000 chars)
├── Cover Image (optional)
├── Genres (multi-select, required)
├── Tags (optional)
└── Age Rating (everyone/teen/mature)

Step 2: Upload Pages
├── Upload method selection
├── Page upload (minimum 1 page)
├── Page reordering
└── Preview pages

Step 3: Monetization
├── Publishing Type:
│   ├── Free (accessible to all)
│   └── Pay-Per-Read (set price in HBAR)
├── NFT Minting (optional):
│   ├── Enable/Disable
│   ├── NFT Copies (max supply)
│   ├── Mint Price (in HBAR)
│   └── Royalty % (default 10%)
└── Confirmation

Step 4: IPFS Upload (if NFT enabled)
├── Upload cover image to IPFS
├── Upload all pages to IPFS
├── Generate metadata JSON
├── Upload metadata to IPFS
└── Get IPFS CIDs

Step 5: Blockchain Minting (if NFT enabled)
├── Check creator approval status
├── Approve creator (if needed)
├── Mint NFT on smart contract
├── Receive tokenId
└── Store blockchain data

Step 6: Database Storage
├── Create comic record
├── Store IPFS hashes
├── Store tokenId and contract address
├── Set publishing status
└── Mark as published
```

### 5.2 Reading Experience

#### 5.2.1 Free Comics
- Instant access
- No wallet required
- Page-by-page navigation
- Responsive reader interface

#### 5.2.2 Paid Comics (Pay-Per-Read)
- Wallet connection required
- One-time payment for lifetime access
- Payment in HBAR
- Access tracked on blockchain
- Offline reading (future)

#### 5.2.3 NFT Comics
- Purchase from marketplace
- Own as collectible
- Transfer/resell capability
- Proof of ownership on-chain
- Creator royalties on resales

### 5.3 Marketplace Features

#### 5.3.1 Listing NFT Comics

```typescript
// Creator can list minted NFTs
interface ListingParams {
  tokenId: bigint;
  pricePerToken: bigint;  // in wei (HBAR)
  amount: bigint;         // quantity to list
}

// Smart contract function
function listComic(
  uint256 tokenId,
  uint256 pricePerToken,
  uint256 amount
) external;
```

**Listing Process:**
1. Creator mints NFT
2. Creator calls `listComic()` function
3. NFT becomes available on marketplace
4. Buyers can purchase listed amounts
5. Creator receives payment minus platform fee

#### 5.3.2 Purchasing NFTs

```typescript
// Anyone can purchase listed NFTs
interface PurchaseParams {
  tokenId: bigint;
  seller: address;
  amount: bigint;
}

// Smart contract function
function purchaseComic(
  uint256 tokenId,
  address seller,
  uint256 amount
) external payable;
```

**Purchase Process:**
1. Buyer connects wallet
2. Selects NFT from marketplace
3. Specifies quantity to purchase
4. Approves transaction
5. Smart contract transfers NFT
6. Payment split: (creator - platform fee)
7. Access granted to comic content

#### 5.3.3 Marketplace Filters

- **By Genre**: Action, Adventure, Fantasy, Sci-Fi, etc.
- **By Price**: Free, Paid, NFT
- **By Creator**: Follow favorite creators
- **By Rating**: User ratings
- **By Release Date**: Newest first
- **By Popularity**: Most viewed/liked

### 5.4 Creator Dashboard

#### 5.4.1 My Comics Management
- View all published comics
- Draft management
- Edit comic details
- View statistics per comic
- Mint NFTs for existing comics

#### 5.4.2 Earnings Analytics

```typescript
interface EarningsData {
  totalEarnings: number;      // Total HBAR earned
  readers: number;            // Unique readers count
  recentIncome: number;       // Last 30 days
  topComics: Array<{
    title: string;
    earnings: number;
    readers: number;
  }>;
  transactionHistory: Transaction[];
}
```

**Metrics Displayed:**
- Total lifetime earnings
- Monthly earnings trend
- Top performing comics
- Reader demographics
- Transaction history
- Pending withdrawals

#### 5.4.3 Withdrawal System

```typescript
// Withdraw earnings from smart contract
function withdrawEarnings() external;

// Platform tracks:
- Available balance
- Minimum withdrawal: 10 HBAR
- Transaction history
- Gas fee estimates
```

### 5.5 Games Integration (Future)

Planned features:
- Story-based games tied to comic universes
- Interactive fiction
- Mini-games related to characters
- Reward system for gameplay
- NFT rewards for achievements

---

## 6. Database Architecture

### 6.1 MongoDB Collections

#### 6.1.1 Users Collection

```typescript
{
  _id: ObjectId,
  email: String (optional, unique, sparse),
  emailVerified: Boolean,
  walletAddress: String (optional, unique, sparse),
  username: String (unique, 3-30 chars),
  displayName: String (max 50 chars),
  bio: String (max 500 chars),
  nonce: String (for wallet auth),
  avatar: String (URL),
  banner: String (URL),
  role: [String],  // ["reader", "creator"]
  creatorProfile: {
    penName: String,
    genres: [String],
    verified: Boolean
  },
  onboardingCompleted: Boolean,
  createdAt: Date,
  lastLogin: Date
}
```

**Indexes:**
- `email` (unique, sparse)
- `walletAddress` (unique, sparse)
- `username` (unique)

#### 6.1.2 Comics Collection

```typescript
{
  _id: ObjectId,
  creatorId: ObjectId (ref: Users),
  title: String (required, max 200),
  description: String (required, max 1000),
  coverImage: String (IPFS URI or URL),
  genre: [String] (required),
  tags: [String],
  
  creationType: String ("script" | "upload"),
  
  chapters: [ObjectId] (ref: Chapters),
  totalPages: Number,
  
  status: String ("draft" | "published"),
  publishType: String ("free" | "nft"),
  price: Number (in HBAR, for pay-per-read),
  
  nftDetails: {
    mintStatus: String ("pending" | "minted" | "failed"),
    tokenId: String,
    contractAddress: String,
    maxSupply: Number,
    currentSupply: Number,
    royaltyPercentage: Number,
    metadataURI: String (IPFS URI),
    coverImageIPFS: String (IPFS CID),
    pagesIPFS: [String] (array of IPFS CIDs)
  },
  
  views: Number,
  likes: Number,
  
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date
}
```

**Indexes:**
- `creatorId`
- `status`
- `publishType`
- `genre`
- `createdAt` (descending)
- `publishedAt` (descending)
- `nftDetails.tokenId`

#### 6.1.3 Chapters Collection

```typescript
{
  _id: ObjectId,
  comicId: ObjectId (ref: Comics),
  chapterNumber: Number,
  title: String,
  pages: [{
    pageNumber: Number,
    imageUrl: String,      // Regular URL or IPFS
    ipfsHash: String       // If uploaded to IPFS
  }],
  publishedAt: Date,
  createdAt: Date
}
```

**Indexes:**
- `comicId`
- `chapterNumber`

#### 6.1.4 Transactions Collection

```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  comicId: ObjectId (ref: Comics),
  type: String ("purchase" | "mint" | "list" | "withdraw"),
  
  // Blockchain details
  txHash: String (transaction hash),
  from: String (wallet address),
  to: String (wallet address),
  tokenId: String,
  
  // Financial details
  amount: Number (in HBAR),
  currency: String ("HBAR"),
  platformFee: Number,
  creatorEarnings: Number,
  
  status: String ("pending" | "completed" | "failed"),
  
  createdAt: Date,
  completedAt: Date
}
```

**Indexes:**
- `userId`
- `comicId`
- `txHash` (unique)
- `type`
- `status`
- `createdAt` (descending)

#### 6.1.5 OTP Collection (Temporary)

```typescript
{
  _id: ObjectId,
  email: String,
  code: String (6 digits),
  createdAt: Date,  // Auto-expires after 10 minutes
  expiresAt: Date
}
```

**TTL Index:**
- `createdAt` with expiration: 600 seconds (10 minutes)

---

## 7. Smart Contract Integration

### 7.1 Contract Overview

**Contract Name:** QuivaComics  
**Standard:** ERC-1155 (Multi-Token Standard)  
**Network:** Hedera Testnet (Chain ID: 296)  
**Contract Address:** `0xF5CBD0241D176C6cF35564d2F5b701F74a0756E8`  
**RPC URL:** `https://testnet.hashio.io/api`  
**Block Explorer:** `https://hashscan.io/testnet/`

### 7.2 Key Contract Functions

#### 7.2.1 Creator Management

```solidity
// Approve a creator to mint comics
function approveCreator(address creator) external onlyOwner;

// Check if address is approved creator
mapping(address => bool) public approvedCreators;
```

**Usage:**
- Only contract owner can approve creators
- Required before a creator can mint NFTs
- One-time approval per creator address

#### 7.2.2 Minting Comics

```solidity
function mintComic(
    string memory comicId,
    string memory metadataURI,
    uint256 maxSupply,
    uint256 royaltyBasisPoints
) external returns (uint256 tokenId);
```

**Parameters:**
- `comicId`: Unique identifier for the comic
- `metadataURI`: IPFS URI containing NFT metadata
- `maxSupply`: Maximum number of NFTs that can exist
- `royaltyBasisPoints`: Royalty percentage (1000 = 10%)

**Returns:**
- `tokenId`: Unique token ID for the minted comic

**Events Emitted:**
```solidity
event ComicMinted(
    uint256 indexed tokenId,
    address indexed creator,
    string comicId,
    uint256 maxSupply
);
```

#### 7.2.3 Marketplace Listing

```solidity
function listComic(
    uint256 tokenId,
    uint256 pricePerToken,
    uint256 amount
) external;
```

**Parameters:**
- `tokenId`: The NFT token ID to list
- `pricePerToken`: Price in wei (HBAR) per NFT
- `amount`: Quantity to list for sale

**Requirements:**
- Caller must own the NFTs
- Caller must have sufficient balance
- Listing must not exceed owned amount

**Events Emitted:**
```solidity
event ComicListed(
    uint256 indexed tokenId,
    address indexed seller,
    uint256 pricePerToken,
    uint256 amount
);
```

#### 7.2.4 Purchasing Comics

```solidity
function purchaseComic(
    uint256 tokenId,
    address seller,
    uint256 amount
) external payable;
```

**Parameters:**
- `tokenId`: The NFT to purchase
- `seller`: Address of the seller
- `amount`: Quantity to purchase

**Payment:**
- Must send exact amount: `pricePerToken * amount`
- Platform fee deducted (default: 2.5%)
- Remainder goes to seller
- Royalties paid to original creator on secondary sales

**Events Emitted:**
```solidity
event ComicPurchased(
    uint256 indexed tokenId,
    address indexed buyer,
    address indexed seller,
    uint256 amount
);
```

#### 7.2.5 Canceling Listings

```solidity
function cancelListing(uint256 tokenId) external;
```

**Requirements:**
- Caller must be the seller
- Listing must be active

**Events Emitted:**
```solidity
event ComicListingCancelled(
    uint256 indexed tokenId,
    address indexed seller
);
```

#### 7.2.6 Updating Listings

```solidity
function updateListing(
    uint256 tokenId,
    uint256 newPrice,
    uint256 newAmount
) external;
```

**Requirements:**
- Caller must be the seller
- New amount must not exceed owned balance

#### 7.2.7 Withdrawing Earnings

```solidity
function withdrawEarnings() external;
```

**Functionality:**
- Transfers accumulated earnings to caller
- Tracks earnings per user automatically
- Emits Withdrawal event

### 7.3 Contract Constants

```solidity
uint256 public constant MAX_ROYALTY = 3000;      // 30%
uint256 public constant MAX_PLATFORM_FEE = 1000; // 10%
uint256 public PLATFORM_FEE = 250;                // 2.5% default
```

### 7.4 View Functions

```solidity
// Get comic details
function getComic(uint256 tokenId) 
    external view returns (
        uint256 tokenId,
        address creator,
        string memory metadataURI,
        uint256 maxSupply,
        uint256 currentSupply,
        uint256 royaltyPercentage,
        bool isActive
    );

// Get listing details
function getListing(uint256 tokenId, address seller)
    external view returns (
        address seller,
        uint256 pricePerToken,
        uint256 amount,
        bool isActive
    );

// Check user's NFT balance
function balanceOf(address account, uint256 tokenId)
    external view returns (uint256);

// Get user's earnings
mapping(address => uint256) public earnings;
```

### 7.5 Contract Interaction Examples

#### Frontend: Minting NFT

```typescript
import { useWriteContract } from 'wagmi';
import { QUIVA_COMICS_ABI, QUIVA_COMICS_ADDRESS } from '@/contracts';

const { writeContract } = useWriteContract();

const mintNFT = async () => {
  await writeContract({
    address: QUIVA_COMICS_ADDRESS,
    abi: QUIVA_COMICS_ABI,
    functionName: 'mintComic',
    args: [
      comicId,              // e.g., "comic_1234567_userId"
      metadataURI,          // e.g., "ipfs://QmXXX..."
      BigInt(maxSupply),    // e.g., BigInt(100)
      BigInt(1000)          // 10% royalty
    ],
    account: address,
    chain: hederaTestnet
  });
};
```

#### Backend: Approving Creator

```typescript
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(
  'https://testnet.hashio.io/api'
);
const ownerWallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(
  QUIVA_COMICS_ADDRESS,
  QUIVA_COMICS_ABI,
  ownerWallet
);

const approveCreator = async (creatorAddress: string) => {
  const tx = await contract.approveCreator(creatorAddress);
  await tx.wait();
  console.log('Creator approved:', tx.hash);
};
```

---

## 8. API Documentation

### 8.1 Base URL

```
Development: http://localhost:5000/api
Production: https://api.quiva.io/api
```

### 8.2 Authentication Endpoints

#### Send OTP
```http
POST /auth/send-otp
Content-Type: application/json

{
  "email": "user@example.com"
}

Response 200:
{
  "success": true,
  "message": "OTP sent to email"
}
```

#### Verify OTP
```http
POST /auth/verify-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "code": "123456"
}

Response 200:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "role": ["reader"],
    "username": "johndoe"
  },
  "isNewUser": false
}
```

#### Wallet Sign Message
```http
POST /auth/wallet/message
Content-Type: application/json

{
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
}

Response 200:
{
  "message": "Sign this message to authenticate: <nonce>"
}
```

#### Verify Wallet Signature
```http
POST /auth/wallet/verify
Content-Type: application/json

{
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "message": "Sign this message...",
  "signature": "0x..."
}

Response 200:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... },
  "isNewUser": true
}
```

### 8.3 User Endpoints

#### Complete Onboarding
```http
POST /users/onboarding
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "johndoe",
  "displayName": "John Doe",
  "bio": "Comic enthusiast",
  "role": "creator",
  "penName": "JD Comics",
  "genres": ["action", "sci-fi"]
}

Response 200:
{
  "success": true,
  "user": { ... }
}
```

#### Get User Profile
```http
GET /users/:id
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "displayName": "John Doe",
    "bio": "Comic enthusiast",
    "avatar": "https://...",
    "role": ["creator"],
    "creatorProfile": {
      "penName": "JD Comics",
      "genres": ["action", "sci-fi"],
      "verified": false
    }
  }
}
```

#### Update Profile
```http
PUT /users/:id/profile
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Fields:
- displayName: string
- bio: string
- avatar: file (optional)
- banner: file (optional)
- penName: string (creators only)
- genres: string[] (creators only)

Response 200:
{
  "success": true,
  "message": "Profile updated",
  "user": { ... }
}
```

#### Become Creator
```http
POST /users/become-creator
Authorization: Bearer <token>
Content-Type: application/json

{
  "penName": "JD Comics",
  "genres": ["action", "sci-fi"]
}

Response 200:
{
  "success": true,
  "message": "You are now a creator!"
}
```

### 8.4 Comic Endpoints

#### Create Comic (Draft)
```http
POST /comics
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Comic",
  "description": "An epic adventure...",
  "genre": ["action", "adventure"],
  "tags": ["superhero", "manga"],
  "ageRating": "teen",
  "creationType": "upload"
}

Response 201:
{
  "success": true,
  "comic": {
    "_id": "507f...",
    "title": "My First Comic",
    "status": "draft",
    ...
  }
}
```

#### Upload Comic Pages
```http
POST /comics/:comicId/pages
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Fields:
- pages: file[] (multiple files)
- chapterNumber: number

Response 200:
{
  "success": true,
  "message": "Pages uploaded",
  "uploadedPages": 15
}
```

#### Publish Comic
```http
POST /comics/:comicId/publish
Authorization: Bearer <token>
Content-Type: application/json

{
  "publishType": "free" | "nft",
  "price": 5.00,  // For pay-per-read
  "mintAsNFT": true,
  "nftCopies": 100,
  "nftPrice": 10.00,
  "royaltyPercentage": 10,
  "metadataURI": "ipfs://QmXXX..."  // If NFT
}

Response 200:
{
  "success": true,
  "message": "Comic published",
  "comic": { ... },
  "nft": {
    "tokenId": "1",
    "contractAddress": "0x...",
    "transactionHash": "0x..."
  }
}
```

#### Get All Comics (Public)
```http
GET /comics?
  status=published
  &publishType=free|nft
  &genre=action,adventure
  &sortBy=createdAt
  &order=desc
  &page=1
  &limit=20

Response 200:
{
  "success": true,
  "comics": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

#### Get Comic Details
```http
GET /comics/:comicId

Response 200:
{
  "success": true,
  "comic": {
    "_id": "507f...",
    "title": "My First Comic",
    "description": "...",
    "coverImage": "...",
    "genre": ["action"],
    "chapters": [ ... ],
    "totalPages": 20,
    "views": 1500,
    "likes": 250,
    "creator": {
      "id": "...",
      "username": "johndoe",
      "displayName": "John Doe"
    },
    "nftDetails": { ... }
  }
}
```

#### Get Comic Pages (Chapter)
```http
GET /comics/:comicId/chapters/:chapterNumber/pages

// For free comics: no auth required
// For paid comics: auth required + payment verification

Response 200:
{
  "success": true,
  "pages": [
    {
      "pageNumber": 1,
      "imageUrl": "https://...",
      "ipfsHash": "QmXXX..."
    },
    ...
  ]
}
```

#### Update Comic
```http
PUT /comics/:comicId
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "New description",
  "genre": ["action", "thriller"]
}

Response 200:
{
  "success": true,
  "comic": { ... }
}
```

#### Delete Comic
```http
DELETE /comics/:comicId
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "message": "Comic deleted"
}
```

#### Get Creator's Comics
```http
GET /users/:userId/comics
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "comics": [ ... ]
}
```

### 8.5 Creator Endpoints

#### Approve Creator (Backend)
```http
POST /creator/approve
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json

{
  "creatorAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
}

Response 200:
{
  "success": true,
  "message": "Creator approved",
  "transactionHash": "0x..."
}
```

#### Check Creator Approval Status
```http
GET /creator/status/:address

Response 200:
{
  "success": true,
  "isApproved": true
}
```

### 8.6 Transaction Endpoints

#### Create Transaction Record
```http
POST /transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "comicId": "507f...",
  "type": "purchase",
  "txHash": "0x...",
  "tokenId": "1",
  "amount": 10.00,
  "currency": "HBAR"
}

Response 201:
{
  "success": true,
  "transaction": { ... }
}
```

#### Get User Transactions
```http
GET /transactions?userId=507f...&type=purchase

Response 200:
{
  "success": true,
  "transactions": [
    {
      "_id": "...",
      "type": "purchase",
      "comicId": { ... },
      "amount": 10.00,
      "currency": "HBAR",
      "txHash": "0x...",
      "status": "completed",
      "createdAt": "2025-01-15T10:30:00Z"
    },
    ...
  ]
}
```

### 8.7 IPFS Upload Endpoint

#### Upload to IPFS
```http
POST /ipfs/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Fields:
- coverImage: file
- pages: file[] (array of image files)
- title: string
- description: string
- genre: string (JSON array)
- tags: string (JSON array)
- ageRating: string
- creatorAddress: string

Response 200:
{
  "success": true,
  "data": {
    "metadataURI": "ipfs://QmXXX...",
    "coverImageURI": "ipfs://QmYYY...",
    "pagesURIs": [
      "ipfs://QmZZZ1...",
      "ipfs://QmZZZ2...",
      ...
    ]
  }
}
```

### 8.8 Error Responses

All endpoints follow a consistent error format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  }
}
```

**Common Error Codes:**
- `UNAUTHORIZED`: Missing or invalid authentication
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid request data
- `ALREADY_EXISTS`: Duplicate resource
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error

---

## 9. Frontend Architecture

### 9.1 Project Structure

```
src/
├── app/                         # Next.js App Router
│   ├── (auth)/                 # Auth routes group
│   │   ├── login/
│   │   └── onboarding/
│   ├── (main)/                 # Main app routes
│   │   ├── comics/
│   │   │   ├── [id]/          # Comic detail page
│   │   │   └── page.tsx       # Comics list
│   │   ├── marketplace/
│   │   └── creator-dashboard/
│   ├── comic-pad/             # Creator tools
│   │   ├── upload-comics/
│   │   ├── my-comics/
│   │   ├── earnings/
│   │   └── settings/
│   ├── layout.tsx
│   └── page.tsx               # Home page
│
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Card.tsx
│   ├── comic/                 # Comic-specific components
│   │   ├── ComicCard.tsx
│   │   ├── ComicReader.tsx
│   │   └── ComicGrid.tsx
│   ├── creator/               # Creator components
│   │   ├── ComicUploader.tsx
│   │   ├── ComicPublisher.tsx
│   │   └── EarningsDashboard.tsx
│   └── layout/                # Layout components
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Sidebar.tsx
│
├── hooks/                     # Custom React hooks
│   ├── useComicMinting.ts
│   ├── usePurchaseComic.ts
│   ├── useAuth.ts
│   └── useWallet.ts
│
├── redux/                     # State management
│   ├── slices/
│   │   ├── authSlice.ts
│   │   ├── comicSlice.ts
│   │   └── transactionSlice.ts
│   ├── store.ts
│   └── hooks.ts
│
├── lib/                       # Utility libraries
│   ├── ipfs-metadata.ts      # IPFS helpers
│   ├── api-client.ts         # API wrapper
│   └── utils.ts              # General utilities
│
├── contracts/                 # Smart contract ABIs
│   └── QuivaComics.ts
│
└── providers/                 # Context providers
    ├── RainbowProvider.tsx
    └── ReduxProvider.tsx
```

### 9.2 Key Frontend Components

#### 9.2.1 ComicUploader Component

**Location:** `src/app/comic-pad/upload-comics/_components/`

**Features:**
- Multi-page upload with drag-and-drop
- Page preview and reordering
- Progress tracking
- File validation (size, format)
- Automatic thumbnail generation

```typescript
interface ComicUploaderProps {
  onPagesUploaded: (pages: File[]) => void;
  maxPages?: number;
  acceptedFormats?: string[];
}
```

#### 9.2.2 ComicPublisher Component

**Features:**
- Final review before publishing
- Monetization options selection
- IPFS upload progress
- Blockchain minting progress
- Error handling and retry logic
- Success modal with transaction details

```typescript
interface ComicPublisherProps {
  comicData: ComicData;
  monetizationData: MonetizationData;
  user: User;
  onClose: () => void;
}
```

#### 9.2.3 ComicReader Component

**Features:**
- Page-by-page navigation
- Zoom controls
- Full-screen mode
- Touch gestures support
- Keyboard shortcuts
- Reading progress tracking

#### 9.2.4 Marketplace Component

**Features:**
- NFT listings grid
- Filters and search
- Purchase modal
- Price display in HBAR
- Creator information
- Transaction confirmation

### 9.3 Custom Hooks

#### 9.3.1 useComicMinting Hook

```typescript
const {
  publishComic,
  isUploading,
  isMinting,
  isListing,
  uploadProgress,
  mintingProgress,
  tokenId,
  mintError,
  isComplete
} = useComicMinting();

// Usage
await publishComic({
  comicData,
  monetizationData,
  user
});
```

**Responsibilities:**
1. Upload assets to IPFS
2. Generate metadata
3. Check creator approval
4. Mint NFT on blockchain
5. List on marketplace (optional)
6. Create database record

#### 9.3.2 usePurchaseComic Hook

```typescript
const {
  purchaseComic,
  isPurchasing,
  purchaseError,
  purchaseSuccess
} = useComicPurchase();

// Usage
await purchaseComic({
  tokenId: BigInt(1),
  seller: '0x...',
  amount: BigInt(1),
  pricePerToken: parseEther('10')
});
```

### 9.4 State Management (Redux)

#### 9.4.1 Auth Slice

```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Actions
- login
- logout
- updateProfile
- checkAuth
```

#### 9.4.2 Comic Slice

```typescript
interface ComicState {
  comics: Comic[];
  currentComic: Comic | null;
  loading: boolean;
  error: string | null;
  filters: {
    genre: string[];
    publishType: string;
    sortBy: string;
  };
}

// Actions
- fetchComics
- fetchComicById
- createComic
- updateComic
- deleteComic
- setFilters
```

#### 9.4.3 Transaction Slice

```typescript
interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

// Actions
- createTransaction
- fetchUserTransactions
```

### 9.5 Routing Structure

```
/ (Home)
  → Browse comics
  → Featured content
  → How it works

/comics
  → List all comics
  → Filter and search
  
/comics/[id]
  → Comic details
  → Read/Purchase

/marketplace
  → NFT listings
  → Buy/Sell

/creator-dashboard
  → Overview
  → Analytics

/comic-pad/upload-comics
  → Upload flow
  → Step-by-step

/comic-pad/my-comics
  → Creator's library
  → Edit/Delete

/comic-pad/earnings
  → Revenue analytics
  → Withdraw

/comic-pad/settings
  → Profile
  → Preferences

/login
  → Email/Wallet auth

/onboarding
  → New user setup
```

---

## 10. NFT and Blockchain Features

### 10.1 NFT Metadata Standard

Quiva follows the ERC-1155 metadata standard with additional properties:

```json
{
  "name": "Comic Title - Episode 1",
  "description": "Comic description",
  "image": "ipfs://QmCoverImageHash",
  "attributes": [
    {
      "trait_type": "Creator",
      "value": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
    },
    {
      "trait_type": "Genre",
      "value": "Action, Adventure"
    },
    {
      "trait_type": "Age Rating",
      "value": "Teen (13+)"
    },
    {
      "trait_type": "Page Count",
      "value": 20
    },
    {
      "trait_type": "Type",
      "value": "Comic Book"
    },
    {
      "trait_type": "Format",
      "value": "Digital"
    }
  ],
  "properties": {
    "pages": [
      "ipfs://QmPage1Hash",
      "ipfs://QmPage2Hash",
      ...
    ],
    "genre": ["Action", "Adventure"],
    "tags": ["superhero", "manga", "series"],
    "ageRating": "teen",
    "creator": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "pageCount": 20
  }
}
```

### 10.2 Royalty System

**How it works:**
1. Creator sets royalty percentage during minting (max 30%)
2. Stored in smart contract per tokenId
3. Automatically enforced on marketplace sales
4. Payment split on each secondary sale:
   - Original creator gets royalty %
   - Current seller gets (100% - royalty% - platform fee)
   - Platform gets platform fee (2.5%)

**Example:**
```
Comic minted with 10% royalty
Initial mint: 10 HBAR (100% to creator)

Secondary sale: 20 HBAR
- Creator royalty: 2 HBAR (10%)
- Platform fee: 0.5 HBAR (2.5%)
- Seller receives: 17.5 HBAR (87.5%)
```

### 10.3 Platform Fee Structure

**Current Fees:**
- Platform Fee: 2.5% on all marketplace transactions
- Minting: Gas fees only (paid by creator)
- Withdrawals: Gas fees only (paid by user)
- Reading: Free for free comics, one-time payment for paid comics

**Fee Distribution:**
- Platform operations and development
- Future: Creator rewards program
- Future: Community treasury

### 10.4 Token Economics

**NFT Supply Models:**

1. **Limited Edition**
   - Fixed max supply (e.g., 100 copies)
   - Scarcity creates value
   - Suitable for collectibles

2. **Open Edition**
   - Large max supply (e.g., 10,000)
   - More accessible
   - Focus on utility over scarcity

3. **1-of-1**
   - Single unique copy
   - Ultra-rare
   - Premium pricing

### 10.5 On-Chain vs Off-Chain Data

**On-Chain (Blockchain):**
- Token ownership
- Transfer history
- Listing prices
- Royalty percentages
- Metadata URI pointer
- Contract addresses

**Off-Chain (IPFS):**
- Comic page images
- Cover images
- NFT metadata JSON
- High-resolution assets

**Off-Chain (MongoDB):**
- User profiles
- Comic descriptions
- View counts, likes
- Transaction history copy
- Search indexes
- Analytics data

---

## 11. IPFS Integration

### 11.1 IPFS Overview

**What gets stored on IPFS:**
1. Comic page images
2. Cover images
3. NFT metadata JSON files

**Why IPFS:**
- Decentralized storage
- Content-addressed (permanent links)
- No single point of failure
- Censorship resistant
- Owned by creators forever

### 11.2 Pinning Service

**Provider:** Pinata (Primary)  
**Gateway:** `https://gray-tough-elk-417.mypinata.cloud/ipfs/`

**Alternative Gateways:**
- `https://ipfs.io/ipfs/`
- `https://cloudflare-ipfs.com/ipfs/`
- `https://gateway.pinata.cloud/ipfs/`

### 11.3 Upload Process

```typescript
// Step 1: Upload individual images
const coverResult = await uploadToIPFS(coverImage);
const coverCID = coverResult.IpfsHash;

const pageResults = await Promise.all(
  pages.map(page => uploadToIPFS(page))
);
const pageCIDs = pageResults.map(r => r.IpfsHash);

// Step 2: Create metadata JSON
const metadata = {
  name: `${title} - Episode 1`,
  description,
  image: `ipfs://${coverCID}`,
  attributes: [...],
  properties: {
    pages: pageCIDs.map(cid => `ipfs://${cid}`),
    ...
  }
};

// Step 3: Upload metadata
const metadataResult = await uploadJSONToIPFS(metadata);
const metadataURI = `ipfs://${metadataResult.IpfsHash}`;

// Step 4: Use metadataURI in smart contract
await mintComic(comicId, metadataURI, maxSupply, royalty);
```

### 11.4 Retrieval

```typescript
// Convert IPFS URI to HTTP URL
function ipfsToHttp(ipfsUri: string): string {
  const hash = ipfsUri.replace('ipfs://', '');
  return `https://gray-tough-elk-417.mypinata.cloud/ipfs/${hash}`;
}

// Usage
const imageUrl = ipfsToHttp('ipfs://QmXXX...');
```

### 11.5 Content Verification

**CID (Content Identifier):**
- Cryptographic hash of content
- If content changes, CID changes
- Guarantees content integrity
- Can verify content authenticity

```typescript
// Verify content hasn't been tampered with
const storedCID = 'QmXXX...';
const fetchedContent = await fetch(ipfsUrl);
const actualCID = await calculateCID(fetchedContent);

if (storedCID === actualCID) {
  console.log('Content verified ✓');
} else {
  console.error('Content modified!');
}
```

### 11.6 Performance Optimization

**Strategies:**
1. **CDN Caching**: Use Pinata dedicated gateway
2. **Progressive Loading**: Load pages on-demand
3. **Thumbnail Generation**: Store low-res previews
4. **Preloading**: Prefetch next page while reading
5. **Local Cache**: Browser cache for repeated views

---

## 12. Monetization System

### 12.1 Revenue Streams

#### For Creators:

1. **Pay-Per-Read Comics**
   - One-time payment for lifetime access
   - Set your own price
   - 97.5% revenue (after 2.5% platform fee)

2. **NFT Primary Sales**
   - Initial mint sales
   - 100% revenue to creator (minus gas)

3. **NFT Secondary Sales**
   - Automatic royalties (creator sets %)
   - Passive income on resales
   - No additional work required

4. **Future: Tips/Donations**
   - Direct fan support
   - Optional feature

5. **Future: Subscriptions**
   - Monthly access to all creator's content
   - Recurring revenue

#### For Platform:

1. **Transaction Fees** (2.5%)
2. **Premium Features** (future)
3. **Featured Listings** (future)
4. **Advertising** (future, optional)

### 12.2 Pricing Models

**Free Comics:**
- Claim Free NFT
- Minted by creator generosity
- Great for audience building

**Pay-Per-Read:**
- Typical range: 1-10 HBAR
- Recommended: 2-5 HBAR
- One-time payment
- Lifetime access

**NFT Comics:**
- Mint price: 5-50 HBAR typical
- Scarcity factor
- Collectible value
- Investment potential

### 12.3 Payment Flow

```
Reader Purchase (Pay-Per-Read)
  ↓
Smart Contract receives payment
  ↓
Platform fee deducted (2.5%)
  ↓
Remainder to creator's on-chain balance
  ↓
Creator can withdraw anytime
```

```
NFT Purchase (Marketplace)
  ↓
Smart Contract receives payment
  ↓
Royalty to original creator (if secondary sale)
  ↓
Platform fee deducted (2.5%)
  ↓
Remainder to current seller
  ↓
NFT transferred to buyer
```

### 12.4 Withdrawal System

**Process:**
1. Navigate to Earnings dashboard
2. View available balance
3. Click "Withdraw Earnings"
4. Confirm transaction in wallet
5. Gas fees deducted
6. Funds sent to wallet address

**Minimum Withdrawal:** 10 HBAR  
**Processing Time:** Immediate (on-chain)  
**Fees:** Gas only (typically < 0.1 HBAR)

---

## 13. Security and Access Control

### 13.1 Authentication Security

**JWT Tokens:**
- HS256 algorithm
- 7-day expiration
- Secure secret key (64+ characters)
- Includes role information
- Cannot be forged


**Wallet Authentication:**
- SIWE (Sign-In with Ethereum) standard
- Cryptographic signature verification
- Nonce prevents replay attacks
- No password storage needed

### 13.2 Role-Based Access Control (RBAC)

**Middleware Implementation:**

```typescript
// Require authentication
export const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Require specific role
export const requireRole = (role: Roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role.includes(role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};

// Usage
app.post('/comics', requireAuth, requireRole(Roles.CREATOR), createComic);
```

### 13.3 Rate Limiting

**Limits:**
- Authentication: 15 requests / 15 minutes
- OTP requests: 1 request / 1 minute
- API endpoints: 60 requests / 1 minute
- Uploads: 50 uploads / 1 hour
- Creator endpoints: 120 requests / 1 minute

**Implementation:**
```typescript
import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: 'Too many authentication attempts'
});

app.use('/api/auth', authLimiter);
```

### 13.4 Input Validation

**Validation Rules:**
- Username: 3-30 characters, alphanumeric
- Email: Valid email format
- Wallet Address: Valid Ethereum address
- Files: Size limits, allowed types
- Strings: Max length, sanitization
- Numbers: Range validation

**Example:**
```typescript
const validateComicInput = (data) => {
  if (!data.title || data.title.length > 200) {
    throw new Error('Invalid title');
  }
  if (!data.description || data.description.length > 1000) {
    throw new Error('Invalid description');
  }
  if (!Array.isArray(data.genre) || data.genre.length === 0) {
    throw new Error('At least one genre required');
  }
};
```

### 13.5 Smart Contract Security

**Implemented Protections:**
- Reentrancy guard on payable functions
- Access control (only approved creators can mint)
- Integer overflow protection (Solidity 0.8+)
- Input validation on all parameters
- Pausable contract (emergency stop)
- Ownership transfer protection

**Audit Status:**
- Self-audited ✓
- Community review ✓
- Professional audit: Pending

### 13.6 Data Protection

**Sensitive Data:**
- Passwords: NEVER stored (wallet-based auth)
- Private keys: NEVER stored on servers
- Email: Encrypted in transit (TLS)
- Personal data: GDPR compliant storage

**MongoDB Security:**
- Authentication enabled
- Network access whitelist
- Encrypted at rest
- Regular backups
- No sensitive blockchain data in DB

### 13.7 CORS Configuration

```typescript
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

---

## 14. Deployment Guide

### 14.1 Prerequisites

**Required:**
- Node.js 18+
- MongoDB Atlas account
- Pinata IPFS account
- Hedera wallet with HBAR
- Domain name (optional)

**Environment Variables:**

**Backend (.env):**
```env
# Server
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://quiva.io

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quiva

# JWT
JWT_SECRET=your-super-secret-key-64-characters-minimum

# Email
EMAIL_USER=noreply@quiva.io
EMAIL_PASS=your-app-password

# Blockchain
CONTRACT_ADDRESS=0xF5CBD0241D176C6cF35564d2F5b701F74a0756E8
HEDERA_RPC_URL=https://testnet.hashio.io/api
OWNER_PRIVATE_KEY=your-private-key-for-creator-approval

# IPFS
PINATA_API_KEY=your-pinata-api-key
PINATA_SECRET=your-pinata-secret
PINATA_GATEWAY=https://gray-tough-elk-417.mypinata.cloud

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=15
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=https://api.quiva.io
NEXT_PUBLIC_CONTRACT_ADDRESS=0xF5CBD0241D176C6cF35564d2F5b701F74a0756E8
NEXT_PUBLIC_HEDERA_CHAIN_ID=296
NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID=your-walletconnect-project-id
```

### 14.2 Backend Deployment (Railway/Render)

**Option 1: Railway**

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Initialize project
railway init

# 4. Add environment variables
railway variables set KEY=value

# 5. Deploy
railway up
```

**Option 2: Render**

1. Connect GitHub repository
2. Create new Web Service
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add environment variables in dashboard
6. Deploy

### 14.3 Frontend Deployment (Vercel)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# Production deployment
vercel --prod
```

**Or via Vercel Dashboard:**
1. Import GitHub repository
2. Framework preset: Next.js
3. Add environment variables
4. Deploy

### 14.4 Database Setup (MongoDB Atlas)

1. Create cluster (M0 Free tier or higher)
2. Create database user
3. Whitelist IP addresses (0.0.0.0/0 for dynamic IPs)
4. Get connection string
5. Replace `<password>` with actual password
6. Add to backend env variables

**Collections will be auto-created on first use.**

### 14.5 IPFS Setup (Pinata)

1. Sign up at pinata.cloud
2. Generate API Key (Admin access)
3. Create dedicated gateway (optional)
4. Add credentials to env variables

### 14.6 Domain Configuration

**Backend API:**
```
api.quiva.io → Your backend deployment
```

**Frontend:**
```
quiva.io → Your frontend deployment
www.quiva.io → Redirect to quiva.io
```

### 14.7 SSL/TLS Certificates

- Vercel: Auto-provided
- Railway: Auto-provided
- Custom domain: Use Cloudflare for free SSL

### 14.8 Monitoring and Logging

**Recommended Tools:**
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Datadog**: Performance monitoring
- **MongoDB Atlas**: DB monitoring

---

## 15. Development Workflow

### 15.1 Getting Started

```bash
# Clone repository
# Backend
git clone https://github.com/Saintblade/Quiva-Backend.git
cd backend
# Install dependencies
npm install

# Frontend
git clone https://github.com/Saintblade/Quiva-Frontend.git
cd ../frontend
npm install
```

### 15.2 Running Locally

**Backend:**
```bash
cd backend
npm run dev  # Runs on port 5000
```

**Frontend:**
```bash
cd frontend
npm run dev  # Runs on port 3000
```

**Concurrent (Optional):**
```bash
# From root directory
npm install -g concurrently
concurrently "cd backend && npm run dev" "cd frontend && npm run dev"
```

### 15.3 Testing Smart Contracts

**Using Remix IDE:**
1. Go to remix.ethereum.org
2. Create new file: QuivaComics.sol
3. Paste contract code
4. Compile (Solidity 0.8.20)
5. Deploy to Hedera Testnet
6. Interact with functions

**Using Hardhat (Recommended for testing):**
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

npx hardhat init
npx hardhat test
```

### 15.4 Database Migrations

**No formal migrations needed** (NoSQL flexibility), but:

**Schema Updates:**
1. Update model file
2. Deploy backend
3. Existing documents auto-update on read/write

**For breaking changes:**
- Write migration script
- Run against production DB during low traffic
- Test thoroughly in staging first

### 15.5 Git Workflow

```bash
# Feature branch
git checkout -b feature/new-feature

# Make changes
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature

# Create Pull Request
# Review and merge
```

**Branch Naming:**
- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical production fixes
- `refactor/` - Code improvements

**Commit Messages:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructuring
- `test:` - Tests
- `chore:` - Maintenance

---

## 16. Troubleshooting

### 16.1 Common Issues

#### Issue: "Creator not approved" error when minting

**Solution:**
```bash
# Call approve endpoint from backend
curl -X POST http://localhost:5000/api/creator/approve \
  -H "Content-Type: application/json" \
  -d '{"creatorAddress": "0x..."}'

# Or check status
curl http://localhost:5000/api/creator/status/0x...
```

#### Issue: IPFS upload fails

**Possible causes:**
- Invalid Pinata credentials
- File too large (>100MB)
- Network timeout
- Rate limit exceeded

**Solutions:**
- Verify API keys
- Compress images
- Increase timeout
- Check Pinata dashboard for limits

#### Issue: Wallet connection fails

**Solutions:**
- Ensure correct chain ID (296)
- Add Hedera Testnet to wallet manually
- Clear browser cache
- Try different wallet

**Add Hedera Testnet manually:**
```
Network Name: Hedera Testnet
RPC URL: https://testnet.hashio.io/api
Chain ID: 296
Currency Symbol: HBAR
Block Explorer: https://hashscan.io/testnet
```

#### Issue: Transaction fails on blockchain

**Possible causes:**
- Insufficient gas
- Contract function reverted
- Invalid parameters
- Network congestion

**Solutions:**
- Check wallet has enough HBAR
- Verify all parameters
- Check contract is not paused
- Wait and retry

### 16.2 Debugging Tips

**Backend Debugging:**
```bash
# Enable verbose logging
DEBUG=* npm run dev

# Check specific module
DEBUG=express:* npm run dev

# Database query logging
MONGODB_LOG_LEVEL=debug npm run dev
```

**Frontend Debugging:**
```typescript
// Enable Redux DevTools
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

// Log all Wagmi events
const { connector } = useAccount({
  onConnect: (data) => console.log('Connected', data),
  onDisconnect: () => console.log('Disconnected')
});
```

**Smart Contract Debugging:**
```solidity
// Add events for debugging
event Debug(string message, uint256 value);

function someFunction() public {
  emit Debug("Checkpoint 1", value);
  // ... code ...
  emit Debug("Checkpoint 2", newValue);
}
```

### 16.3 Performance Issues

**Slow page loads:**
- Enable image optimization (Next.js)
- Use CDN for IPFS gateway
- Implement lazy loading
- Add loading skeletons

**Slow database queries:**
- Add indexes to frequently queried fields
- Use projection (select only needed fields)
- Implement pagination
- Cache frequent queries

**High gas fees:**
- Batch transactions when possible
- Use Hedera Testnet (low fees)
- Optimize contract code
- Wait for lower network activity

---

## 18. Support and Resources

### 18.1 Documentation Links
- **Hedera Docs**: https://docs.hedera.com
- **Wagmi Docs**: https://wagmi.sh
- **Next.js Docs**: https://nextjs.org/docs
- **MongoDB Docs**: https://docs.mongodb.com
- **IPFS Docs**: https://docs.ipfs.tech

### 18.2 Community
- **Discord**: discord.gg/quiva (coming soon)
- **Twitter**: @quivacomics (coming soon)
- **GitHub**: github.com/quiva-comics
- **Email**: support@quiva.io

### 18.3 Contributing
We welcome contributions! Please see:
- CONTRIBUTING.md (coming soon)
- CODE_OF_CONDUCT.md (coming soon)

### 18.4 License
This documentation is proprietary to Quiva Platform.
Source code license: TBD

---

## Appendix A: Glossary

**HBAR**: Native cryptocurrency of Hedera network  
**IPFS**: InterPlanetary File System - decentralized storage  
**CID**: Content Identifier - unique hash for IPFS content  
**NFT**: Non-Fungible Token - unique digital asset  
**ERC-1155**: Multi-token standard supporting both fungible and non-fungible tokens  
**Gas**: Transaction fee on blockchain  
**Royalty**: Percentage of sales going to original creator  
**Mint**: Create a new NFT on blockchain  
**Wallet**: Software for managing blockchain assets  
**Smart Contract**: Self-executing code on blockchain  
**OTP**: One-Time Password for authentication  
**JWT**: JSON Web Token for session management

---

## Appendix B: API Response Codes

| Code | Status | Meaning |
|------|--------|---------|
| 200 | OK | Request successful |
| 201 | Created | Resource created |
| 204 | No Content | Success, no response body |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource already exists |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Temporary outage |

---

## Appendix C: Database Indexes

**Users Collection:**
```javascript
db.users.createIndex({ email: 1 }, { unique: true, sparse: true })
db.users.createIndex({ walletAddress: 1 }, { unique: true, sparse: true })
db.users.createIndex({ username: 1 }, { unique: true })
db.users.createIndex({ "creatorProfile.verified": 1 })
```

**Comics Collection:**
```javascript
db.comics.createIndex({ creatorId: 1 })
db.comics.createIndex({ status: 1 })
db.comics.createIndex({ publishType: 1 })
db.comics.createIndex({ genre: 1 })
db.comics.createIndex({ createdAt: -1 })
db.comics.createIndex({ publishedAt: -1 })
db.comics.createIndex({ "nftDetails.tokenId": 1 })
db.comics.createIndex({ title: "text", description: "text" })
```

**Transactions Collection:**
```javascript
db.transactions.createIndex({ userId: 1 })
db.transactions.createIndex({ comicId: 1 })
db.transactions.createIndex({ txHash: 1 }, { unique: true })
db.transactions.createIndex({ type: 1 })
db.transactions.createIndex({ status: 1 })
db.transactions.createIndex({ createdAt: -1 })
```

---

**End of Documentation**

*This documentation is maintained by the Quiva development team and is updated regularly. Last update: October 30, 2025*
