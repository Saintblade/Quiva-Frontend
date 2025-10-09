export const QUIVA_COMICS_ADDRESS = '0xF5CBD0241D176C6cF35564d2F5b701F74a0756E8';

// Contract ABI - only include the functions we need
export const QUIVA_COMICS_ABI = [
  "function mintComic(string comicId, string metadataURI, uint256 price, uint256 maxSupply, uint256 royaltyPercentage) returns (uint256)",
  "function purchaseComic(uint256 tokenId, uint256 amount) payable",
  "function getComic(uint256 tokenId) view returns (tuple(uint256 tokenId, address creator, string metadataURI, uint256 price, uint256 maxSupply, uint256 currentSupply, uint256 royaltyPercentage, bool isActive))",
  "function approveCreator(address creator)",
  "function withdrawEarnings()",
  "function comicIdToTokenId(string) view returns (uint256)",
  "event ComicMinted(uint256 indexed tokenId, address indexed creator, string comicId, uint256 price, uint256 maxSupply)",
  "event ComicPurchased(uint256 indexed tokenId, address indexed buyer, address indexed creator, uint256 price)"
];