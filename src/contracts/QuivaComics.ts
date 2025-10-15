// export const QUIVA_COMICS_ADDRESS = '0xF5CBD0241D176C6cF35564d2F5b701F74a0756E8' as `0x${string}`;

// // Contract ABI - only include the functions we need
// export const QUIVA_COMICS_ABI = [
//   "function mintComic(string comicId, string metadataURI, uint256 price, uint256 maxSupply, uint256 royaltyPercentage) returns (uint256)",
//   "function purchaseComic(uint256 tokenId, uint256 amount) payable",
//   "function getComic(uint256 tokenId) view returns (tuple(uint256 tokenId, address creator, string metadataURI, uint256 price, uint256 maxSupply, uint256 currentSupply, uint256 royaltyPercentage, bool isActive))",
//   "function approveCreator(address creator)",
//   "function withdrawEarnings()",
//   "function comicIdToTokenId(string) view returns (uint256)",
//   "event ComicMinted(uint256 indexed tokenId, address indexed creator, string comicId, uint256 price, uint256 maxSupply)",
//   "event ComicPurchased(uint256 indexed tokenId, address indexed buyer, address indexed creator, uint256 price)"
// ] as const;

export const QUIVA_COMICS_ADDRESS = '0xF5CBD0241D176C6cF35564d2F5b701F74a0756E8' as `0x${string}`;

// Contract ABI in JSON format (required by wagmi v2)
export const QUIVA_COMICS_ABI = [
  {
    type: 'function',
    name: 'mintComic',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'comicId', type: 'string' },
      { name: 'metadataURI', type: 'string' },
      { name: 'price', type: 'uint256' },
      { name: 'maxSupply', type: 'uint256' },
      { name: 'royaltyPercentage', type: 'uint256' }
    ],
    outputs: [
      { name: '', type: 'uint256' }
    ]
  },
  {
    type: 'function',
    name: 'purchaseComic',
    stateMutability: 'payable',
    inputs: [
      { name: 'tokenId', type: 'uint256' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: []
  },
  {
    type: 'function',
    name: 'getComic',
    stateMutability: 'view',
    inputs: [
      { name: 'tokenId', type: 'uint256' }
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        components: [
          { name: 'tokenId', type: 'uint256' },
          { name: 'creator', type: 'address' },
          { name: 'metadataURI', type: 'string' },
          { name: 'price', type: 'uint256' },
          { name: 'maxSupply', type: 'uint256' },
          { name: 'currentSupply', type: 'uint256' },
          { name: 'royaltyPercentage', type: 'uint256' },
          { name: 'isActive', type: 'bool' }
        ]
      }
    ]
  },
  {
    type: 'function',
    name: 'approveCreator',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'creator', type: 'address' }
    ],
    outputs: []
  },
  {
    type: 'function',
    name: 'withdrawEarnings',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: []
  },
  {
    type: 'function',
    name: 'comicIdToTokenId',
    stateMutability: 'view',
    inputs: [
      { name: '', type: 'string' }
    ],
    outputs: [
      { name: '', type: 'uint256' }
    ]
  },
  {
    type: 'event',
    name: 'ComicMinted',
    inputs: [
      { name: 'tokenId', type: 'uint256', indexed: true },
      { name: 'creator', type: 'address', indexed: true },
      { name: 'comicId', type: 'string', indexed: false },
      { name: 'price', type: 'uint256', indexed: false },
      { name: 'maxSupply', type: 'uint256', indexed: false }
    ]
  },
  {
    type: 'event',
    name: 'ComicPurchased',
    inputs: [
      { name: 'tokenId', type: 'uint256', indexed: true },
      { name: 'buyer', type: 'address', indexed: true },
      { name: 'creator', type: 'address', indexed: true },
      { name: 'price', type: 'uint256', indexed: false }
    ]
  }
] as const;