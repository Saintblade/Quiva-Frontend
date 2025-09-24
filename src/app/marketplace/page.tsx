"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Heart,
  Star,
  Home,
  BookOpen,
  User,
  Menu,
  X,
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
}

const MOCK_COMICS: Comic[] = [
  {
    id: 1,
    title: "Solo Leveling",
    creator: "Chu-Gong",
    price: 2.5,
    rating: 4.8,
    thumbnail:
      "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80",
    category: "Action",
    isLiked: false,
  },
  {
    id: 2,
    title: "Demon Slayer",
    creator: "Koyoharu Gotouge",
    price: 3.0,
    rating: 4.9,
    thumbnail:
      "https://cdn.marvel.com/content/1x/asm2025001_dimeo.jpg",
    category: "Adventure",
    isLiked: true,
  },
  {
    id: 3,
    title: "Attack on Titan",
    creator: "Hajime Isayama",
    price: 2.8,
    rating: 4.7,
    thumbnail:
      "https://i.ebayimg.com/images/g/b6oAAOSwez5l-jYm/s-l1200.jpg",
    category: "Action",
    isLiked: false,
  },
  {
    id: 4,
    title: "One Piece",
    creator: "Eiichiro Oda",
    price: 3.5,
    rating: 4.9,
    thumbnail:
      "https://images.unsplash.com/photo-1588497859490-85d1c17db96d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbWljfGVufDB8fDB8fHww",
    category: "Adventure",
    isLiked: true,
  },
  {
    id: 5,
    title: "Naruto",
    creator: "Masashi Kishimoto",
    price: 2.7,
    rating: 4.6,
    thumbnail:
      "https://images.unsplash.com/photo-1501432377862-3d0432b87a14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hcnZlbHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Action",
    isLiked: false,
  },
  {
    id: 6,
    title: "Death Note",
    creator: "Tsugumi Ohba",
    price: 2.9,
    rating: 4.8,
    thumbnail:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFydmVsfGVufDB8fDB8fHww",
    category: "Thriller",
    isLiked: true,
  },
  {
    id: 7,
    title: "Avatar: The Last Airbender",
    creator: "Kohei Horikoshi",
    price: 2.6,
    rating: 4.5,
    thumbnail:
      "https://ih1.redbubble.net/image.1897086961.1709/flat%2C750x%2C075%2Cf-pad%2C750x1000%2Cf8f8f8.jpg",
    category: "Action",
    isLiked: false,
  },
  {
    id: 8,
    title: "Dragon Ball Z",
    creator: "Akira Toriyama",
    price: 3.2,
    rating: 4.7,
    thumbnail:
      "https://storage.googleapis.com/pod_public/1300/232565.jpg",
    category: "Action",
    isLiked: true,
  },
  {
    id: 9,
    title: "Spirited Away",
    creator: "Hayao Miyazaki",
    price: 4.0,
    rating: 4.9,
    thumbnail:
      "https://academymuseumstore.org/cdn/shop/files/3f654da1-ae03-4fb3-b22c-bdf74933d365.jpg?v=1754499165",
    category: "Fantasy",
    isLiked: false,
  },
  {
    id: 10,
    title: "Weathering With You",
    creator: "Makoto Shinkai",
    price: 3.8,
    rating: 4.8,
    thumbnail:
      "https://www.lib.ncsu.edu/sites/default/files/Weathering%20With%20You.png",
    category: "Romance",
    isLiked: true,
  },
  {
    id: 11,
    title: "Fullmetal Alchemist",
    creator: "Hiromu Arakawa",
    price: 3.0,
    rating: 4.8,
    thumbnail:
      "https://m.media-amazon.com/images/M/MV5BMzNiODA5NjYtYWExZS00OTc4LTg3N2ItYWYwYTUyYmM5MWViXkEyXkFqcGc%40._V1_.jpg",
    category: "Adventure",
    isLiked: false,
  },
  {
    id: 12,
    title: "Bleach",
    creator: "Tite Kubo",
    price: 2.9,
    rating: 4.5,
    thumbnail:
      "https://dbzbooks.com/cdn/shop/files/4b0460b6e2e5865235197b19a005bcca0e853f3d9a2228be7505b117d0edce5b.jpg?v=1723056120",
    category: "Action",
    isLiked: false,
  },
  {
    id: 13,
    title: "Tokyo Ghoul",
    creator: "Sui Ishida",
    price: 3.1,
    rating: 4.6,
    thumbnail:
      "https://m.media-amazon.com/images/I/615UoMEsDEL.jpg",
    category: "Horror",
    isLiked: false,
  },
  {
  id: 14,
  title: "Ghost in the Shell",
  creator: "Masamune Shirow",
  price: 3.4,
  rating: 4.7,
  thumbnail:
    "https://c4.wallpaperflare.com/wallpaper/555/39/751/ghost-in-the-shell-fan-art-digital-art-artwork-cyberpunk-hd-wallpaper-preview.jpg",
  category: "Sci-Fi",
  isLiked: false,
},
{
  id: 15,
  title: "Death Note",
  creator: "Tsugumi Ohba",
  price: 3.0,
  rating: 4.8,
  thumbnail:
    "https://wallpapers.com/images/featured/death-note-phone-vnp0whbmxr0koupq.jpg",
  category: "Thriller",
  isLiked: true,
},
{
  id: 16,
  title: "My Hero Academia",
  creator: "Kohei Horikoshi",
  price: 3.2,
  rating: 4.7,
  thumbnail:
  "https://myhotposters.com/cdn/shop/products/mR0183_1024x1024.jpeg?v=1748542401",
  category: "Adventure",
  isLiked: false,
},
];


const CATEGORIES = [
  "All",
  "Action",
  "Adventure",
  "Romance",
  "Comedy",
  "Horror",
  "Sci-Fi",
  "Thriller",
  "Fantasy",
];

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [comics] = useState<Comic[]>(MOCK_COMICS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    isOpen: isCreatorModalOpen,
    onOpen: onOpenCreatorModal,
    onOpenChange: onOpenChangeCreatorModal,
    onClose: onCloseCreatorModal,
  } = useDisclosure();

  const handleCreatorComplete = () => {
    onCloseCreatorModal();
  };

  const filteredComics = comics.filter((comic) => {
    const matchesSearch =
      comic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comic.creator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || comic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="min-h-screen bg-[#020200] text-white flex">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1A1A1A] border-r border-white/10 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static lg:inset-0`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Quiva Logo"
                  width={120}
                  height={40}
                  className="cursor-pointer"
                />
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
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition"
              >
                <Home size={20} />
                <span className="font-medium">Explore</span>
              </Link>
              <Link
                href="/my-library"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition"
              >
                <BookOpen size={20} />
                <span className="font-medium">My Library</span>
              </Link>
              <GradientButton
                onClick={onOpenCreatorModal}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg font-semibold mt-2"
              >
                <User size={20} />
                <span className="font-medium">Become Creator</span>
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
                    placeholder="Search comics, creators..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white/10 transition"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="px-4 lg:px-8 py-8">
            <section className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Discover Amazing{" "}
                <span className="text-yellow-500">Comics</span>
              </h1>
              <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                Explore thousands of unique digital comics created by talented
                artists from around the world.
              </p>
            </section>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg transition ${
                      selectedCategory === category
                        ? "bg-yellow-500 text-black"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="relative ml-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Comics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredComics.map((comic) => (
                <div
                  key={comic.id}
                  className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:shadow-lg hover:border-yellow-500/50 transition cursor-pointer group"
                >
                  <div className="relative w-full aspect-[3/4] bg-black/10">
                    <Image
                      src={comic.thumbnail}
                      alt={`${comic.title} cover`}
                      fill
                      className="object-cover"
                    />
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
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1">
                        <Star
                          size={14}
                          className="fill-yellow-500 text-yellow-500"
                        />
                        <span className="text-sm text-white/80">
                          {comic.rating}
                        </span>
                      </div>
                      <div className="text-yellow-500 font-semibold">
                        ${comic.price}
                      </div>
                    </div>
                    <button className="w-full mt-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded-lg transition">
                      Read Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <MainButton className="px-8">Load More Comics</MainButton>
            </div>

            {/* Featured Categories */}
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Featured Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {CATEGORIES.slice(1).map((category) => (
                  <div
                    key={category}
                    className="bg-gradient-to-br from-yellow-500/10 to-purple-500/10 border border-white/10 rounded-lg p-6 text-center hover:border-yellow-500/50 transition cursor-pointer"
                  >
                    <h3 className="font-semibold text-lg">{category}</h3>
                    <p className="text-white/70 text-sm mt-2">
                      {Math.floor(Math.random() * 100) + 50} comics
                    </p>
                  </div>
                ))}
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

export default MarketplacePage;
