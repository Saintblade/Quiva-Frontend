"use client";

import { useState } from "react";
import ComicPublisher from "./ComicPublisher";

interface ExtractedFile {
	name: string;
	blob: Blob;
	preview: string;
}

interface ComicData {
	title: string;
	description: string;
	genre: string[];
	tags: string[];
	ageRating: string;
	coverImage: File | null;
	pages: ExtractedFile[];
}

interface OnboardingPageProps {
	onclose: () => void;
	comicData: ComicData;
}

export default function OnboardingPage({ onclose, comicData }: OnboardingPageProps) {
	const [publishType, setPublishType] = useState<"free" | "paid">("free");
	const [price, setPrice] = useState<string>("");
	const [mintAsNFT, setMintAsNFT] = useState(false);
	const [nftCopies, setNftCopies] = useState<string>("");
	const [nftPrice, setNftPrice] = useState<string>("");
	const [showPublisher, setShowPublisher] = useState(false);

	const handleContinue = () => {
		// Validate reading access
		if (publishType === "paid" && (!price || parseFloat(price) <= 0)) {
			alert("Please enter a valid price for paid content");
			return;
		}

		// Validate NFT fields if minting is enabled
		if (mintAsNFT) {
			if (!nftCopies || parseInt(nftCopies) <= 0) {
				alert("Please enter a valid number of NFT copies");
				return;
			}
			if (!nftPrice || parseFloat(nftPrice) <= 0) {
				alert("Please enter a valid mint price per NFT");
				return;
			}
		}

		setShowPublisher(true);
	};

	const getMonetizationData = () => ({
		publishType,
		price: publishType === "paid" ? parseFloat(price) : undefined,
		mintAsNFT,
		nftCopies: mintAsNFT ? parseInt(nftCopies) : undefined,
		nftPrice: mintAsNFT ? parseFloat(nftPrice) : undefined,
	});

	return (
		<>
			{!showPublisher && (
				<div className='px-4 py-6 max-h-[85vh] overflow-y-auto'>
					{/* Header */}
					<div className='text-center mb-8'>
						<p className='text-white/80 text-sm font-medium tracking-widest uppercase mb-1'>
							PUBLISH YOUR COMIC: STEP 3 OF 4
						</p>
						<h1 className='text-white text-2xl tracking-wider font-semibold mb-2'>
							Choose your path to prosperity
						</h1>
						<p className='text-white/60 text-sm leading-relaxed'>
							Decide how you want to share and potentially earn from your comic.
						</p>
					</div>

					{/* Reading Access Section */}
					<div className='mb-8'>
						<h2 className='text-white font-medium tracking-widest mb-4'>
							Reading Access
						</h2>

						<div className='space-y-4'>
							<label className='flex items-start gap-3 cursor-pointer p-4 rounded-lg border border-white/20 hover:border-orange-500/50 transition'>
								<input
									type='radio'
									name='reading-access'
									value='free'
									checked={publishType === "free"}
									onChange={() => setPublishType("free")}
									className='accent-orange-500 mt-1'
								/>
								<div>
									<h4 className='text-white font-semibold'>Free to read</h4>
									<p className='text-white/60 text-sm mt-1'>
										Make your comic available to everyone at no cost. Perfect for building an audience.
									</p>
								</div>
							</label>

							<label className='flex items-start gap-3 cursor-pointer p-4 rounded-lg border border-white/20 hover:border-orange-500/50 transition'>
								<input
									type='radio'
									name='reading-access'
									value='pay-per-read'
									checked={publishType === "paid"}
									onChange={() => setPublishType("paid")}
									className='accent-orange-500 mt-1'
								/>
								<div className='flex-1'>
									<h4 className='text-white font-semibold'>Pay Per Read</h4>
									<p className='text-white/60 text-sm mt-1'>
										Readers pay to access your comic. Set your own price.
									</p>
									
									{publishType === "paid" && (
										<div className='mt-3'>
											<input
												type='number'
												placeholder='Enter USDT amount'
												value={price}
												onChange={(e) => setPrice(e.target.value)}
												min='0.01'
												step='0.01'
												className='w-full rounded-full border border-white/80 bg-transparent px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500'
											/>
										</div>
									)}
								</div>
							</label>
						</div>
					</div>

					{/* NFT Section */}
					<div className='mb-8'>
						<h2 className='text-white font-medium tracking-widest mb-4'>
							Turn Your Comic into a Collectible NFT!
						</h2>

						<label className='flex items-start gap-3 cursor-pointer p-4 rounded-lg border border-white/20 hover:border-orange-500/50 transition'>
							<input
								type='checkbox'
								checked={mintAsNFT}
								onChange={(e) => setMintAsNFT(e.target.checked)}
								className='accent-orange-500 mt-1 w-4 h-4'
							/>
							<div className='flex-1'>
								<h4 className='text-white font-semibold'>
									Mint this comic episode as a limited NFT Edition.
								</h4>

								{mintAsNFT && (
									<div className='mt-4 space-y-3'>
										<input
											type='number'
											placeholder='How many copies?'
											value={nftCopies}
											onChange={(e) => setNftCopies(e.target.value)}
											min='1'
											step='1'
											className='w-full rounded-full border border-white/80 bg-transparent px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500'
										/>
										<input
											type='number'
											placeholder='Mint price (USDT per NFT)'
											value={nftPrice}
											onChange={(e) => setNftPrice(e.target.value)}
											min='0.01'
											step='0.01'
											className='w-full rounded-full border border-white/80 bg-transparent px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500'
										/>
									</div>
								)}
							</div>
						</label>
					</div>

					{/* Action Buttons */}
					<div className='space-y-3 mt-8'>
						<button
							onClick={handleContinue}
							className='w-full bg-secondary-200/80 hover:bg-secondary-200 text-black font-semibold py-3 rounded-full transition'
						>
							Next
						</button>

						<button 
							onClick={onclose}
							className='w-full border border-white/20 text-white/70 hover:text-white hover:bg-white/5 py-3 rounded-full transition'
						>
							Go back
						</button>
					</div>
				</div>
			)}

			{showPublisher && (
				<ComicPublisher 
					onclose={() => setShowPublisher(false)} 
					comicData={comicData}
					monetizationData={getMonetizationData()}
				/>
			)}
		</>
	);
}