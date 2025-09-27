"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MainButton } from "@/components/button";
import { Bell, Search, Plus, Book, PenTool, Wallet, Settings, LogOut } from "lucide-react";

interface DashboardStats {
	totalComics: number;
	totalReads: number;
	totalEarnings: number;
	followers: number;
}

const DashboardPage = () => {
	const [activeTab, setActiveTab] = useState<"reader" | "creator">("reader");
	const [stats] = useState<DashboardStats>({
		totalComics: 12,
		totalReads: 1456,
		totalEarnings: 234.50,
		followers: 89,
	});
	const router = useRouter();

	const handleLogout = () => {
		// TODO: Implement actual logout logic
		console.log("Logging out...");
		router.push("/");
	};

	const handleBecomeCreator = () => {
		router.push("/auth/creator-onboarding");
	};

	return (
		<div className="min-h-screen bg-black text-white">
			{/* Header */}
			<header className="border-b border-white/10 px-4 py-3">
				<div className="max-w-7xl mx-auto flex items-center justify-between">
					{/* Logo */}
					<Link href="/">
						<Image
							src="/logo.png"
							alt="Quiva Logo"
							width={100}
							height={40}
							className="cursor-pointer"
						/>
					</Link>

					{/* Search Bar */}
					<div className="flex-1 max-w-md mx-8">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
							<input
								type="text"
								placeholder="Search comics, creators..."
								className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-yellow-500"
							/>
						</div>
					</div>

					{/* User Actions */}
					<div className="flex items-center gap-4">
						{/* Notifications */}
						<button className="relative text-white/70 hover:text-white transition">
							<Bell size={20} />
							<span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full"></span>
						</button>

						{/* Wallet */}
						<button className="flex items-center gap-2 text-white/70 hover:text-white transition">
							<Wallet size={20} />
							<span className="text-sm">$234.50</span>
						</button>

						{/* User Avatar + Dropdown */}
						<div className="relative group">
							<button className="flex items-center gap-2">
								<Image
									src="/public/dev_images/avatar.png"
									alt="User Avatar"
									width={32}
									height={32}
									className="rounded-full"
									onError={(e) => {
										// Fallback to a default avatar
										e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM0QjVTNjMiLz4KPGF0aHg9IjE2IiBjeT0iMTIiIHI9IjQiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik04IDI0QzggMjAgMTEuNTgyIDE3IDE2IDE3QzIwLjQxOCAxNyAyNCAyMCAyNCAyNCIgZmlsbD0id2hpdGUiLz4KPC9zdmc+";
									}}
								/>
							</button>

							{/* Dropdown Menu */}
							<div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-white/20 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
								<div className="p-2 space-y-1">
									<button className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-white/10 rounded">
										<Settings size={16} />
										Settings
									</button>
									<button 
										onClick={handleLogout}
										className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-white/10 rounded text-red-400"
									>
										<LogOut size={16} />
										Logout
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 py-8">
				{/* Welcome Section */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
					<p className="text-white/70">Ready to dive into some amazing stories?</p>
				</div>

				{/* Tab Navigation */}
				<div className="flex gap-6 mb-8 border-b border-white/10">
					<button
						onClick={() => setActiveTab("reader")}
						className={`pb-4 px-2 border-b-2 transition ${
							activeTab === "reader"
								? "border-yellow-500 text-yellow-500"
								: "border-transparent text-white/70 hover:text-white"
						}`}
					>
						Reader Dashboard
					</button>
					<button
						onClick={() => setActiveTab("creator")}
						className={`pb-4 px-2 border-b-2 transition ${
							activeTab === "creator"
								? "border-yellow-500 text-yellow-500"
								: "border-transparent text-white/70 hover:text-white"
						}`}
					>
						Creator Dashboard
					</button>
				</div>

				{/* Reader Dashboard */}
				{activeTab === "reader" && (
					<div className="space-y-8">
						{/* Stats Cards */}
						<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
							<div className="bg-white/5 border border-white/10 rounded-lg p-6">
								<div className="flex items-center gap-3">
									<Book className="text-yellow-500" size={24} />
									<div>
										<p className="text-white/70 text-sm">Comics Read</p>
										<p className="text-2xl font-bold">{stats.totalComics}</p>
									</div>
								</div>
							</div>
							<div className="bg-white/5 border border-white/10 rounded-lg p-6">
								<div className="flex items-center gap-3">
									<div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
										<span className="text-black text-sm font-bold">T</span>
									</div>
									<div>
										<p className="text-white/70 text-sm">Total Reads</p>
										<p className="text-2xl font-bold">{stats.totalReads.toLocaleString()}</p>
									</div>
								</div>
							</div>
							<div className="bg-white/5 border border-white/10 rounded-lg p-6">
								<div className="flex items-center gap-3">
									<Wallet className="text-yellow-500" size={24} />
									<div>
										<p className="text-white/70 text-sm">Rewards Earned</p>
										<p className="text-2xl font-bold">${stats.totalEarnings}</p>
									</div>
								</div>
							</div>
							<div className="bg-white/5 border border-white/10 rounded-lg p-6">
								<div className="flex items-center gap-3">
									<div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
										<span className="text-black text-sm font-bold">F</span>
									</div>
									<div>
										<p className="text-white/70 text-sm">Following</p>
										<p className="text-2xl font-bold">{stats.followers}</p>
									</div>
								</div>
							</div>
						</div>

						{/* Continue Reading */}
						<div>
							<h2 className="text-xl font-bold mb-4">Continue Reading</h2>
							<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
								{/* Comic placeholders */}
								{[1, 2, 3, 4].map((i) => (
									<div key={i} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-yellow-500/50 transition cursor-pointer">
										<div className="aspect-[3/4] bg-gradient-to-br from-yellow-500/20 to-purple-500/20"></div>
										<div className="p-4">
											<h3 className="font-semibold mb-1">Comic Title {i}</h3>
											<p className="text-white/70 text-sm">Chapter 12</p>
											<div className="w-full bg-white/10 rounded-full h-2 mt-2">
												<div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${25 * i}%` }}></div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Quick Actions */}
						<div className="flex gap-4">
							<Link href="/marketplace">
								<MainButton className="flex items-center gap-2">
									<Search size={18} />
									Browse Marketplace
								</MainButton>
							</Link>
							<button 
								onClick={handleBecomeCreator}
								className="flex items-center gap-2 px-6 py-3 border border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-black transition"
							>
								<PenTool size={18} />
								Become a Creator
							</button>
						</div>
					</div>
				)}

				{/* Creator Dashboard */}
				{activeTab === "creator" && (
					<div className="space-y-8">
						{/* Creator CTA */}
						<div className="text-center py-12 bg-gradient-to-br from-yellow-500/10 to-purple-500/10 border border-white/10 rounded-lg">
							<PenTool className="mx-auto mb-4 text-yellow-500" size={48} />
							<h2 className="text-2xl font-bold mb-4">Ready to Create?</h2>
							<p className="text-white/70 mb-6 max-w-md mx-auto">
								Join thousands of creators sharing their stories and earning from their passion.
							</p>
							<div className="flex gap-4 justify-center">
								<button 
									onClick={handleBecomeCreator}
									className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition font-semibold"
								>
									<Plus size={18} />
									Start Creating
								</button>
								<Link href="/comic-pad">
									<button className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition">
										<Book size={18} />
										ComicPad
									</button>
								</Link>
							</div>
						</div>
					</div>
				)}
			</main>
		</div>
	);
};

export default DashboardPage;