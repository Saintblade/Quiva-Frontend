


// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   Search,
//   Heart,
//   Star,
//   Menu,
//   X,
//   Bell,
//   ChevronLeft,
//   ChevronRight,
//   TrendingUp,
//   TrendingDown,
// } from "lucide-react";
// import { MainButton, GradientButton } from "@/components/button";
// import { useDisclosure } from "@heroui/react";
// import GeneralModal from "@/components/modals/GeneralModal";
// import { CreatorOnboardingFlowModal } from "@/components/modals/CreatorOnboarding";
// import { QuivaLogo } from "@/components/utils/function";
// import { canna } from "../../../public/dev_images";

// interface Comic {
//   id: number;
//   title: string;
//   creator: string;
//   price: number;
//   rating: number;
//   thumbnail: string;
//   category: string;
//   isLiked: boolean;
//   isPremium?: boolean;
//   isFree?: boolean;
//   editionSize?: number;
//   mintDate?: string;
//   mintPrice?: number;
//   countdown?: string;
//   floorPrice?: number;
//   priceChange?: number;
//   copies?: number;
//   sales?: number;
//   volume24h?: string;
//   items?: number;
//   mintPriceUSDT?: number;
//   countdownTime?: string;
//   floorPriceETH?: number;
//   readers?: string;
//   issues?: number;
// }

// const TRENDING_COMICS: Comic[] = [
//   {
//     id: 1,
//     title: "Rise of the Slayer",
//     creator: "Young Geek",
//     price: 3,
//     rating: 4.8,
//     thumbnail: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80",
//     category: "Action",
//     isLiked: false,
//     isPremium: true,
//   },
//   {
//     id: 2,
//     title: "Goofy Friend",
//     creator: "Anonymous",
//     price: 0,
//     rating: 4.5,
//     thumbnail: "https://cdn.marvel.com/content/1x/asm2025001_dimeo.jpg",
//     category: "Comedy",
//     isLiked: true,
//     isFree: true,
//   },
//   {
//     id: 3,
//     title: "Kakashi",
//     creator: "Naruto Studios",
//     price: 5,
//     rating: 4.9,
//     thumbnail: "https://i.ebayimg.com/images/g/b6oAAOSwez5l-jYm/s-l1200.jpg",
//     category: "Action",
//     isLiked: false,
//     isPremium: true,
//   },
// ];

// const FEATURED_COMICS: Comic[] = [
//   {
//     id: 4,
//     title: "Rise of the Slayer by Young Geek",
//     creator: "Young Geek",
//     price: 0.07,
//     rating: 4.8,
//     thumbnail: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80",
//     category: "Action",
//     isLiked: false,
//     isPremium: true,
//     floorPrice: 0.07,
//     volume24h: "16.05k USDT",
//   },
//   {
//     id: 5,
//     title: "Rise of the Slayer by Young Geek",
//     creator: "Young Geek",
//     price: 0.07,
//     rating: 4.8,
//     thumbnail: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80",
//     category: "Action",
//     isLiked: false,
//     isPremium: true,
//     floorPrice: 0.07,
//     volume24h: "16.05k USDT",
//   },
//   {
//     id: 6,
//     title: "Rise of the Slayer by Young Geek",
//     creator: "Young Geek",
//     price: 0.07,
//     rating: 4.8,
//     thumbnail: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80",
//     category: "Action",
//     isLiked: false,
//     isPremium: true,
//     floorPrice: 0.07,
//     volume24h: "16.05k USDT",
//   },
//   {
//     id: 7,
//     title: "Rise of the Slayer by Young Geek",
//     creator: "Young Geek",
//     price: 0.07,
//     rating: 4.8,
//     thumbnail: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80",
//     category: "Action",
//     isLiked: false,
//     isPremium: true,
//     floorPrice: 0.07,
//     volume24h: "16.05k USDT",
//   },
// ];

// const UPCOMING_COMICS: Comic[] = [
//   {
//     id: 8,
//     title: "Rise of the Slayer",
//     creator: "Young Geek",
//     price: 10,
//     rating: 4.8,
//     thumbnail: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80",
//     category: "Action",
//     isLiked: false,
//     editionSize: 200,
//     mintDate: "30/10/25",
//     mintPrice: 10,
//     countdown: "24days : 10hrs : 60mins : 03secs",
//   },
//   {
//     id: 9,
//     title: "Goofy Friend",
//     creator: "Anonymous",
//     price: 0,
//     rating: 4.5,
//     thumbnail: "https://cdn.marvel.com/content/1x/asm2025001_dimeo.jpg",
//     category: "Comedy",
//     isLiked: true,
//     isFree: true,
//   },
//   {
//     id: 10,
//     title: "Kakashi Chronicles",
//     creator: "Young Geek",
//     price: 10,
//     rating: 4.9,
//     thumbnail: "https://i.ebayimg.com/images/g/b6oAAOSwez5l-jYm/s-l1200.jpg",
//     category: "Action",
//     isLiked: false,
//     editionSize: 200,
//     mintDate: "30/10/25",
//     mintPrice: 10,
//     countdown: "24days : 10hrs : 60mins : 03secs",
//   },
// ];

// const TOP_COMICS_DATA: Comic[] = [
//   {
//     id: 11,
//     title: "NaruHina",
//     creator: "Young Geek",
//     price: 8,
//     rating: 4.8,
//     thumbnail: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80",
//     category: "Romance",
//     isLiked: false,
//     floorPrice: 8,
//     priceChange: 8.40,
//     copies: 500,
//     sales: 30,
//     volume24h: "300k USDT",
//   },
//   {
//     id: 12,
//     title: "NaruHina",
//     creator: "Young Geek",
//     price: 8,
//     rating: 4.8,
//     thumbnail: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80",
//     category: "Romance",
//     isLiked: false,
//     floorPrice: 8,
//     priceChange: -4.40,
//     copies: 500,
//     sales: 30,
//     volume24h: "300k USDT",
//   },
//   // Add more entries for the table
// ];

// const RECOMMENDED_COMIC = {
//   id: 13,
//   title: "Hinata Story Releaved",
//   creator: "Masashi Kishimoto",
//   thumbnail: "https://i.ibb.co/NgjGNdf2/image.png",
//   floorPriceETH: 0.013,
//   items: 9869,
//   mintPriceUSDT: 10.23,
//   countdownTime: "64:10:03:04"
// };

// const CREATORS_DATA = [
//   {
//     id: 1,
//     name: "Auntmae",
//     avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
//     issues: 8,
//     readers: "1.2k"
//   },
//   {
//     id: 2,
//     name: "Auntmae",
//     avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
//     issues: 8,
//     readers: "1.2k"
//   },
//   {
//     id: 3,
//     name: "Auntmae",
//     avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
//     issues: 8,
//     readers: "1.2k"
//   },
//   {
//     id: 4,
//     name: "Auntmae",
//     avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
//     issues: 8,
//     readers: "1.2k"
//   },
// ];

// const ExplorePage = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [selectedTimeframe, setSelectedTimeframe] = useState("10m");

//   const {
//     isOpen: isCreatorModalOpen,
//     onOpen: onOpenCreatorModal,
//     onOpenChange: onOpenChangeCreatorModal,
//     onClose: onCloseCreatorModal,
//   } = useDisclosure();

//   const handleCreatorComplete = () => {
//     onCloseCreatorModal();
//   };

//   const ComicCard = ({ comic, showPrice = true, showMintInfo = false }: { 
//     comic: Comic; 
//     showPrice?: boolean; 
//     showMintInfo?: boolean;
//   }) => (
//     <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:shadow-lg hover:border-yellow-500/50 transition cursor-pointer group min-w-[280px]">
//       <div className="relative w-full aspect-[3/4] bg-black/10">
//         <Image
//           src={comic.thumbnail}
//           alt={`${comic.title} cover`}
//           fill
//           className="object-cover"
//         />
//         {comic.isPremium && (
//           <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
//             Premium ⚡
//           </div>
//         )}
//         {comic.isFree && (
//           <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
//             Free
//           </div>
//         )}
//         <div className="absolute top-2 right-2 z-10">
//           <button className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
//             <Heart
//               size={16}
//               className={
//                 comic.isLiked
//                   ? "fill-red-500 text-red-500"
//                   : "text-white"
//               }
//             />
//           </button>
//         </div>
//       </div>
//       <div className="p-4 flex flex-col flex-1">
//         <h3 className="font-semibold mb-1 group-hover:text-yellow-500 transition">
//           {comic.title}
//         </h3>
//         <p className="text-white/70 text-sm mb-2">
//           by {comic.creator}
//         </p>

//         {showMintInfo && (
//           <div className="space-y-2 text-sm mb-3">
//             <div className="flex justify-between">
//               <span className="text-white/70">Edition Size:</span>
//               <span className="text-white">{comic.editionSize} PAGES</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-white/70">Mint Date:</span>
//               <span className="text-white">{comic.mintDate}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-white/70">Mint Price:</span>
//               <span className="text-white">{comic.mintPrice} USDT</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-white/70">Countdown:</span>
//               <span className="text-yellow-500">{comic.countdown}</span>
//             </div>
//           </div>
//         )}

//         {comic.floorPrice && (
//           <div className="space-y-1 text-sm mb-3">
//             <div className="flex justify-between">
//               <span className="text-white/70">Floor Price:</span>
//               <span className="text-white">{comic.floorPrice.toFixed(2)} USDT</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-white/70">24h vol:</span>
//               <span className="text-white">{comic.volume24h}</span>
//             </div>
//           </div>
//         )}

//         <div className="flex items-center justify-between mt-auto mb-3">
//           <div className="flex items-center gap-1">
//             <Star
//               size={14}
//               className="fill-yellow-500 text-yellow-500"
//             />
//             <span className="text-sm text-white/80">
//               {comic.rating}
//             </span>
//           </div>
//           {showPrice && (
//             <div className="text-yellow-500 font-semibold">
//               {comic.price === 0 ? "Free" : `${comic.price} USDT`}
//             </div>
//           )}
//         </div>
        
//         <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded-lg transition">
//           {comic.isFree ? "Explore Issue" : showMintInfo ? "Notify Me" : "Read Now"}
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <div className="min-h-screen bg-[#020200] text-white flex">
//         {/* Sidebar */}
//         <div
//           className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1A1A1A] border-r border-white/10 transform transition-transform duration-300 ease-in-out ${
//             sidebarOpen ? "translate-x-0" : "-translate-x-full"
//           } lg:translate-x-0 lg:static lg:inset-0`}
//         >
//           <div className="flex flex-col h-full">
//             <div className="flex items-center justify-between p-6 border-b border-white/10">
//               <Link href="/">
//                 <Image
//                   src="/logo.png"
//                   alt="Quiva Logo"
//                   width={120}
//                   height={40}
//                   className="cursor-pointer"
//                 />
//               </Link>
            
              
//               <button
//                 onClick={() => setSidebarOpen(false)}
//                 className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//             <nav className="flex-1 px-4 py-6 space-y-2">
//               <Link
//                 href="/marketplace"
//                 className="flex items-center px-6 py-4 rounded-lg bg-white/10 text-yellow-500 transition"
//               >
//                 <span className="font-medium text-lg">Explore</span>
//               </Link>
//               <Link
//                 href="/my-library"
//                 className="flex items-center px-6 py-4 rounded-lg hover:bg-white/5 transition"
//               >
//                 <span className="font-medium text-lg">My Library</span>
//               </Link>
//               <GradientButton
//                 onClick={onOpenCreatorModal}
//                 className="w-full flex items-center justify-center px-6 py-4 rounded-lg font-semibold mt-6"
//               >
//                 <span className="font-medium text-lg">Become a Creator</span>
//               </GradientButton>
//             </nav>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 lg:ml-0">
//           {/* Header */}
//           <header className="sticky top-0 z-40 bg-[#020200]/80 backdrop-blur-sm border-b border-white/10 px-4 lg:px-8 py-4">
//             <div className="flex items-center justify-between">
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
//               >
//                 <Menu size={20} />
//               </button>
//               <div className="flex-1 max-w-xl mx-4">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
//                   <input
//                     type="text"
//                     placeholder="Search comics/creators"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white/10 transition"
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <button className="p-2 hover:bg-white/10 rounded-lg transition">
//                   <Bell size={20} />
//                 </button>
//                 <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
//               </div>
//             </div>
//           </header>

//           {/* Page Content */}
//           <main className="px-4 lg:px-8 py-8 space-y-12">
//             {/* Trending Comics */}
//             <section>
//               <h2 className="text-2xl font-bold mb-6">Trending Comics</h2>
//               <div className="flex gap-6 overflow-x-auto pb-4">
//                 {TRENDING_COMICS.map((comic) => (
//                   <ComicCard key={comic.id} comic={comic} />
//                 ))}
//               </div>
//             </section>

//             {/* Featured Comics */}
//             <section>
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold">Featured Comics</h2>
//                 <div className="flex gap-2">
//                   <button className="p-2 hover:bg-white/10 rounded-lg transition">
//                     <ChevronLeft size={20} />
//                   </button>
//                   <button className="p-2 hover:bg-white/10 rounded-lg transition">
//                     <ChevronRight size={20} />
//                   </button>
//                 </div>
//               </div>
//               <div className="flex gap-6 overflow-x-auto pb-4">
//                 {FEATURED_COMICS.map((comic) => (
//                   <ComicCard key={comic.id} comic={comic} />
//                 ))}
//               </div>
//             </section>

//             {/* Upcoming Comics */}
//             <section>
//               <h2 className="text-2xl font-bold mb-6">Upcoming Comics</h2>
//               <div className="flex gap-6 overflow-x-auto pb-4">
//                 {UPCOMING_COMICS.map((comic) => (
//                   <ComicCard key={comic.id} comic={comic} showMintInfo={!comic.isFree} />
//                 ))}
//               </div>
//             </section>

//             {/* Recommended for You */}
//             <section>
//               <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
//               <div className="relative bg-gradient-to-r from-purple-900/20 to-purple-600/20 rounded-lg overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
//                 <div className="relative flex items-center p-8">
//                   <div className="flex-1 space-y-4">
//                     <h3 className="text-3xl font-bold">{RECOMMENDED_COMIC.title}</h3>
//                     <p className="text-white/70">By {RECOMMENDED_COMIC.creator}</p>
//                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
//                       <div>
//                         <div className="text-white/70">FLOOR PRICE</div>
//                         <div className="text-white font-semibold">{RECOMMENDED_COMIC.floorPriceETH} ETH</div>
//                       </div>
//                       <div>
//                         <div className="text-white/70">ITEMS</div>
//                         <div className="text-white font-semibold">{RECOMMENDED_COMIC.items.toLocaleString()}</div>
//                       </div>
//                       <div>
//                         <div className="text-white/70">MINT PRICE</div>
//                         <div className="text-white font-semibold">{RECOMMENDED_COMIC.mintPriceUSDT} USDT</div>
//                       </div>
//                       <div>
//                         <div className="text-white/70">COUNTDOWN</div>
//                         <div className="text-white font-semibold">{RECOMMENDED_COMIC.countdownTime}</div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="hidden lg:block w-64 h-80 relative ml-8">
//                     <Image
//                       src={RECOMMENDED_COMIC.thumbnail}
//                       alt={RECOMMENDED_COMIC.title}
//                       fill
//                       className="object-cover rounded-lg"
//                     />
//                   </div>
//                 </div>
//                 {/* Carousel indicators */}
//                 <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
//                   {[0, 1, 2, 3, 4, 5].map((_, index) => (
//                     <div 
//                       key={index} 
//                       className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-white' : 'bg-white/30'}`}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </section>

//             {/* Our Creators */}
//             <section>
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold">Our Creators</h2>
//                 <div className="flex gap-2">
//                   <button className="p-2 hover:bg-white/10 rounded-lg transition">
//                     <ChevronLeft size={20} />
//                   </button>
//                   <button className="p-2 hover:bg-white/10 rounded-lg transition">
//                     <ChevronRight size={20} />
//                   </button>
//                 </div>
//               </div>
//               <div className="flex gap-6 overflow-x-auto pb-4">
//                 {CREATORS_DATA.map((creator) => (
//                   <div key={creator.id} className="bg-white/5 border border-white/10 rounded-lg p-6 min-w-[200px] text-center hover:border-yellow-500/50 transition cursor-pointer">
//                     <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
//                       <span className="text-black font-bold text-lg">{creator.name[0]}</span>
//                     </div>
//                     <h3 className="font-bold text-lg mb-2">{creator.name}</h3>
//                     <p className="text-white/70 text-sm">{creator.issues} Issues | {creator.readers} Readers</p>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Top Comics */}
//             <section>
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold">Top Comics</h2>
//                 <div className="flex gap-2">
//                   {["10m", "1h", "6h", "1d", "7d", "30d"].map((timeframe) => (
//                     <button
//                       key={timeframe}
//                       onClick={() => setSelectedTimeframe(timeframe)}
//                       className={`px-3 py-1 rounded text-sm transition ${
//                         selectedTimeframe === timeframe
//                           ? "bg-white text-black"
//                           : "text-white/70 hover:text-white"
//                       }`}
//                     >
//                       {timeframe}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
//                 <div className="grid grid-cols-5 gap-4 p-4 border-b border-white/10 text-sm font-semibold text-white/70">
//                   <div>Comic</div>
//                   <div>Floor Price</div>
//                   <div>Copies</div>
//                   <div>Sales</div>
//                   <div>24h Volume</div>
//                 </div>
//                 {TOP_COMICS_DATA.map((comic, index) => (
//                   <div key={comic.id} className="grid grid-cols-5 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
//                         <span className="text-black font-bold text-sm">{comic.title[0]}</span>
//                       </div>
//                       <span className="font-medium">{comic.title}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span>{comic.floorPrice} USDT</span>
//                       <span className={`flex items-center gap-1 text-sm ${comic.priceChange! > 0 ? 'text-green-500' : 'text-red-500'}`}>
//                         {comic.priceChange! > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
//                         {Math.abs(comic.priceChange!)}%
//                       </span>
//                     </div>
//                     <div className="flex items-center">
//                       <span>{comic.copies} Copies</span>
//                     </div>
//                     <div className="flex items-center">
//                       <span>{comic.sales} sales</span>
//                     </div>
//                     <div className="flex items-center">
//                       <span>{comic.volume24h}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Mint These Comics */}
//             <section>
//               <h2 className="text-2xl font-bold mb-6">Mint These Comics</h2>
//               <div className="flex gap-6 overflow-x-auto pb-4">
//                 {TRENDING_COMICS.map((comic) => (
//                   <ComicCard key={`mint-${comic.id}`} comic={comic} />
//                 ))}
//               </div>
//               <div className="text-center mt-8">
//                 <MainButton className="px-8">
//                   Explore More Comics
//                 </MainButton>
//               </div>
//             </section>
//           </main>
//         </div>
//       </div>

//       {/* Creator Onboarding Modal */}
//       <GeneralModal
//         isOpen={isCreatorModalOpen}
//         onOpenChange={onOpenChangeCreatorModal}
//         onClose={onCloseCreatorModal}
//         backdrop="blur"
//         size="xl"
//       >
//         <CreatorOnboardingFlowModal
//           onClose={onCloseCreatorModal}
//           onComplete={handleCreatorComplete}
//         />
//       </GeneralModal>
//     </>
//   );
// };

// export default ExplorePage;

"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Heart,
  Star,
  Menu,
  X,
  Bell,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { MainButton, GradientButton } from "@/components/button";
import { useDisclosure } from "@heroui/react";
import GeneralModal from "@/components/modals/GeneralModal";
import { CreatorOnboardingFlowModal } from "@/components/modals/CreatorOnboarding";

interface Comic {
  id: number;
  title: string;
  creator: string;
  price: number;
  rating: number;
  thumbnail: string;
  category: string;
  isLiked: boolean;
  isPremium?: boolean;
  isFree?: boolean;
  editionSize?: number;
  mintDate?: string;
  mintPrice?: number;
  countdown?: string;
  floorPrice?: number;
  priceChange?: number;
  copies?: number;
  sales?: number;
  volume24h?: string;
  items?: number;
  mintPriceUSDT?: number;
  countdownTime?: string;
  floorPriceETH?: number;
  readers?: string;
  issues?: number;
}

const TRENDING_COMICS: Comic[] = [
  {
    id: 1,
    title: "Rise of the Slayer",
    creator: "Young Geek",
    price: 3,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80",
    category: "Action",
    isLiked: false,
    isPremium: true,
  },
  {
    id: 2,
    title: "Goofy Friend",
    creator: "Anonymous",
    price: 0,
    rating: 4.5,
    thumbnail: "https://cdn.marvel.com/content/1x/asm2025001_dimeo.jpg",
    category: "Comedy",
    isLiked: true,
    isFree: true,
  },
  {
    id: 3,
    title: "Kakashi",
    creator: "Naruto Studios",
    price: 5,
    rating: 4.9,
    thumbnail: "https://i.ebayimg.com/images/g/b6oAAOSwez5l-jYm/s-l1200.jpg",
    category: "Action",
    isLiked: false,
    isPremium: true,
  },
];

const FEATURED_COMICS: Comic[] = [
  {
    id: 4,
    title: "Rise of the Slayer by Young Geek",
    creator: "Young Geek",
    price: 0.07,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80",
    category: "Action",
    isLiked: false,
    isPremium: true,
    floorPrice: 0.07,
    volume24h: "16.05k USDT",
  },
  {
    id: 5,
    title: "Rise of the Slayer by Young Geek",
    creator: "Young Geek",
    price: 0.07,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80",
    category: "Action",
    isLiked: false,
    isPremium: true,
    floorPrice: 0.07,
    volume24h: "16.05k USDT",
  },
  {
    id: 6,
    title: "Rise of the Slayer by Young Geek",
    creator: "Young Geek",
    price: 0.07,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80",
    category: "Action",
    isLiked: false,
    isPremium: true,
    floorPrice: 0.07,
    volume24h: "16.05k USDT",
  },
  {
    id: 7,
    title: "Rise of the Slayer by Young Geek",
    creator: "Young Geek",
    price: 0.07,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80",
    category: "Action",
    isLiked: false,
    isPremium: true,
    floorPrice: 0.07,
    volume24h: "16.05k USDT",
  },
];

const UPCOMING_COMICS: Comic[] = [
  {
    id: 8,
    title: "Rise of the Slayer",
    creator: "Young Geek",
    price: 10,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80",
    category: "Action",
    isLiked: false,
    editionSize: 200,
    mintDate: "30/10/25",
    mintPrice: 10,
    countdown: "24days : 10hrs : 60mins : 03secs",
  },
  {
    id: 9,
    title: "Goofy Friend",
    creator: "Anonymous",
    price: 0,
    rating: 4.5,
    thumbnail: "https://cdn.marvel.com/content/1x/asm2025001_dimeo.jpg",
    category: "Comedy",
    isLiked: true,
    isFree: true,
  },
  {
    id: 10,
    title: "Kakashi Chronicles",
    creator: "Young Geek",
    price: 10,
    rating: 4.9,
    thumbnail: "https://i.ebayimg.com/images/g/b6oAAOSwez5l-jYm/s-l1200.jpg",
    category: "Action",
    isLiked: false,
    editionSize: 200,
    mintDate: "30/10/25",
    mintPrice: 10,
    countdown: "24days : 10hrs : 60mins : 03secs",
  },
];

const TOP_COMICS_DATA: Comic[] = [
  {
    id: 11,
    title: "NaruHina",
    creator: "Young Geek",
    price: 8,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80",
    category: "Romance",
    isLiked: false,
    floorPrice: 8,
    priceChange: 8.40,
    copies: 500,
    sales: 30,
    volume24h: "300k USDT",
  },
  {
    id: 12,
    title: "NaruHina",
    creator: "Young Geek",
    price: 8,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80",
    category: "Romance",
    isLiked: false,
    floorPrice: 8,
    priceChange: -4.40,
    copies: 500,
    sales: 30,
    volume24h: "300k USDT",
  },
  // Add more entries for the table
];

const RECOMMENDED_COMIC = {
  id: 13,
  title: "Hinata Story Releaved",
  creator: "Masashi Kishimoto",
  thumbnail: "https://i.ibb.co/NgjGNdf2/image.png",
  floorPriceETH: 0.013,
  items: 9869,
  mintPriceUSDT: 10.23,
  countdownTime: "64:10:03:04"
};

const CREATORS_DATA = [
  {
    id: 1,
    name: "Auntmae",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    issues: 8,
    readers: "1.2k"
  },
  {
    id: 2,
    name: "Auntmae",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    issues: 8,
    readers: "1.2k"
  },
  {
    id: 3,
    name: "Auntmae",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    issues: 8,
    readers: "1.2k"
  },
  {
    id: 4,
    name: "Auntmae",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    issues: 8,
    readers: "1.2k"
  },
];

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("10m");

  const {
    isOpen: isCreatorModalOpen,
    onOpen: onOpenCreatorModal,
    onOpenChange: onOpenChangeCreatorModal,
    onClose: onCloseCreatorModal,
  } = useDisclosure();

  const handleCreatorComplete = () => {
    onCloseCreatorModal();
  };

  const ComicCard = ({ comic, showPrice = true, showMintInfo = false }: { 
    comic: Comic; 
    showPrice?: boolean; 
    showMintInfo?: boolean;
  }) => (
    <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:shadow-lg hover:border-yellow-500/50 transition cursor-pointer group min-w-[280px]">
      <div className="relative w-full aspect-[3/4] bg-black/10">
        <Image
          src={comic.thumbnail}
          alt={`${comic.title} cover`}
          fill
          className="object-cover"
        />
        {comic.isPremium && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
            Premium ⚡
          </div>
        )}
        {comic.isFree && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
            Free
          </div>
        )}
        <div className="absolute top-2 right-2 z-10">
          <button className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
            <Heart
              size={16}
              className={
                comic.isLiked
                  ? "fill-red-500 text-red-500"
                  : "text-white"
              }
            />
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold mb-1 group-hover:text-yellow-500 transition">
          {comic.title}
        </h3>
        <p className="text-white/70 text-sm mb-2">
          by {comic.creator}
        </p>

        {showMintInfo && (
          <div className="space-y-2 text-sm mb-3">
            <div className="flex justify-between">
              <span className="text-white/70">Edition Size:</span>
              <span className="text-white">{comic.editionSize} PAGES</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Mint Date:</span>
              <span className="text-white">{comic.mintDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Mint Price:</span>
              <span className="text-white">{comic.mintPrice} USDT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Countdown:</span>
              <span className="text-yellow-500">{comic.countdown}</span>
            </div>
          </div>
        )}

        {comic.floorPrice && (
          <div className="space-y-1 text-sm mb-3">
            <div className="flex justify-between">
              <span className="text-white/70">Floor Price:</span>
              <span className="text-white">{comic.floorPrice.toFixed(2)} USDT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">24h vol:</span>
              <span className="text-white">{comic.volume24h}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto mb-3">
          <div className="flex items-center gap-1">
            <Star
              size={14}
              className="fill-yellow-500 text-yellow-500"
            />
            <span className="text-sm text-white/80">
              {comic.rating}
            </span>
          </div>
          {showPrice && (
            <div className="text-yellow-500 font-semibold">
              {comic.price === 0 ? "Free" : `${comic.price} USDT`}
            </div>
          )}
        </div>
        
        <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded-lg transition">
          {comic.isFree ? "Explore Issue" : showMintInfo ? "Notify Me" : "Read Now"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-[#020200] text-white flex">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-96 bg-[#1A1A1A] border-r border-white/10 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static lg:inset-0`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <Link href="/">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">Q</span>
                  </div>
                  <span className="text-xl font-bold">Quiva</span>
                </div>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
              <Link
                href="/marketplace"
                className="flex items-center px-6 py-4 rounded-lg bg-white/10 text-yellow-500 transition"
              >
                <span className="font-medium text-lg">Explore</span>
              </Link>
              <Link
                href="/my-library"
                className="flex items-center px-6 py-4 rounded-lg hover:bg-white/5 transition"
              >
                <span className="font-medium text-lg">My Library</span>
              </Link>
              <GradientButton
                onClick={onOpenCreatorModal}
                className="w-full flex items-center justify-center px-6 py-4 rounded-lg font-semibold mt-6"
              >
                <span className="font-medium text-lg">Become a Creator</span>
              </GradientButton>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-[#020200]/80 backdrop-blur-sm border-b border-white/10 px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
              >
                <Menu size={20} />
              </button>
              <div className="flex-1 max-w-xl mx-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search comics/creators"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white/10 transition"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-white/10 rounded-lg transition">
                  <Bell size={20} />
                </button>
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="px-4 lg:px-8 py-8 space-y-12">
            {/* Trending Comics */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Trending Comics</h2>
              <div className="flex gap-6 overflow-x-auto pb-4">
                {TRENDING_COMICS.map((comic) => (
                  <ComicCard key={comic.id} comic={comic} />
                ))}
              </div>
            </section>

            {/* Featured Comics */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Featured Comics</h2>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              <div className="flex gap-6 overflow-x-auto pb-4">
                {FEATURED_COMICS.map((comic) => (
                  <ComicCard key={comic.id} comic={comic} />
                ))}
              </div>
            </section>

            {/* Upcoming Comics */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Upcoming Comics</h2>
              <div className="flex gap-6 overflow-x-auto pb-4">
                {UPCOMING_COMICS.map((comic) => (
                  <ComicCard key={comic.id} comic={comic} showMintInfo={!comic.isFree} />
                ))}
              </div>
            </section>

            {/* Recommended for You */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
              <div 
                className="relative rounded-lg  justify-between overflow-hidden min-h-[400px]"
                style={{
                  backgroundImage: `url(${RECOMMENDED_COMIC.thumbnail})`,
                  backgroundSize: 'cover center',
                  backgroundPosition: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
                <div className="relative flex items-center p-8 min-h-[400px]">
                  <div className="flex-1 space-y-4 max-w-2xl">
                    <h3 className="text-3xl font-bold text-white">{RECOMMENDED_COMIC.title}</h3>
                    <p className="text-white/80">By {RECOMMENDED_COMIC.creator}</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-white/70">FLOOR PRICE</div>
                        <div className="text-white font-semibold">{RECOMMENDED_COMIC.floorPriceETH} ETH</div>
                      </div>
                      <div>
                        <div className="text-white/70">ITEMS</div>
                        <div className="text-white font-semibold">{RECOMMENDED_COMIC.items.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-white/70">MINT PRICE</div>
                        <div className="text-white font-semibold">{RECOMMENDED_COMIC.mintPriceUSDT} USDT</div>
                      </div>
                      <div>
                        <div className="text-white/70">COUNTDOWN</div>
                        <div className="text-white font-semibold">{RECOMMENDED_COMIC.countdownTime}</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Carousel indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {[0, 1, 2, 3, 4, 5].map((_, index) => (
                    <div 
                      key={index} 
                      className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-white' : 'bg-white/30'}`}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Our Creators */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Our Creators</h2>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              <div className="flex gap-6 overflow-x-auto pb-4">
                {CREATORS_DATA.map((creator) => (
                  <div key={creator.id} className="bg-white/5 border border-white/10 rounded-lg p-6 min-w-[200px] text-center hover:border-yellow-500/50 transition cursor-pointer">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-black font-bold text-lg">{creator.name[0]}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{creator.name}</h3>
                    <p className="text-white/70 text-sm">{creator.issues} Issues | {creator.readers} Readers</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Top Comics */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Top Comics</h2>
                <div className="flex gap-2">
                  {["10m", "1h", "6h", "1d", "7d", "30d"].map((timeframe) => (
                    <button
                      key={timeframe}
                      onClick={() => setSelectedTimeframe(timeframe)}
                      className={`px-3 py-1 rounded text-sm transition ${
                        selectedTimeframe === timeframe
                          ? "bg-white text-black"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {timeframe}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="grid grid-cols-5 gap-4 p-4 border-b border-white/10 text-sm font-semibold text-white/70">
                  <div>Comic</div>
                  <div>Floor Price</div>
                  <div>Copies</div>
                  <div>Sales</div>
                  <div>24h Volume</div>
                </div>
                {TOP_COMICS_DATA.map((comic, index) => (
                  <div key={comic.id} className="grid grid-cols-5 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-black font-bold text-sm">{comic.title[0]}</span>
                      </div>
                      <span className="font-medium">{comic.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{comic.floorPrice} USDT</span>
                      <span className={`flex items-center gap-1 text-sm ${comic.priceChange! > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {comic.priceChange! > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {Math.abs(comic.priceChange!)}%
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span>{comic.copies} Copies</span>
                    </div>
                    <div className="flex items-center">
                      <span>{comic.sales} sales</span>
                    </div>
                    <div className="flex items-center">
                      <span>{comic.volume24h}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Mint These Comics */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Mint These Comics</h2>
              <div className="flex gap-6 overflow-x-auto pb-4">
                {TRENDING_COMICS.map((comic) => (
                  <ComicCard key={`mint-${comic.id}`} comic={comic} />
                ))}
              </div>
              <div className="text-center mt-8">
                <MainButton className="px-8">
                  Explore More Comics
                </MainButton>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Creator Onboarding Modal */}
      <GeneralModal
        isOpen={isCreatorModalOpen}
        onOpenChange={onOpenChangeCreatorModal}
        onClose={onCloseCreatorModal}
        backdrop="blur"
        size="xl"
      >
        <CreatorOnboardingFlowModal
          onClose={onCloseCreatorModal}
          onComplete={handleCreatorComplete}
        />
      </GeneralModal>
    </>
  );
};

export default ExplorePage;