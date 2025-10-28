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
									
									{/* {publishType === "paid" && (
										// <div className='mt-3'>
										// 	<input
										// 		type='number'
										// 		placeholder='Enter USDT amount'
										// 		value={price}
										// 		onChange={(e) => setPrice(e.target.value)}
										// 		min='0.01'
										// 		step='0.01'
										// 		className='w-full rounded-full border border-white/80 bg-transparent px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500'
										// 	/>
										// </div>
									)} */}
								</div>
							</label>
						</div>
					</div>

					{/* Pay-per-read Info Box
					{publishType === "paid" && (
						<div className='mb-6 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-lg p-4'>
							<div className='flex items-start gap-3'>
								<div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0'>
									<span className='text-white text-sm font-bold'>💡</span>
								</div>
								<div>
									<h4 className='text-orange-300 font-semibold mb-1'>Smart Integration Enabled!</h4>
									<p className='text-orange-200/80 text-sm leading-relaxed'>
										Since you've chosen "Pay Per Read", your comic will be automatically uploaded to IPFS 
										for decentralized storage and blockchain integration. This ensures permanent availability 
										and enables future NFT features.
									</p>
								</div>
							</div>
						</div>
					)} */}

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
										 {/* <input
											type='number'
											placeholder='Mint price (USDT per NFT)'
											value={nftPrice}
											onChange={(e) => setNftPrice(e.target.value)}
											min='0.01'
											step='0.01'
											className='w-full rounded-full border border-white/80 bg-transparent px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500'
										/>  */}
											 {publishType === "paid" && (
										//  <div className='mt-3'>
										 	<input
												type='number'
												placeholder='Enter USDT amount'
										 		value={price}
										 		onChange={(e) => setPrice(e.target.value)}
											min='0.01'
										 		step='0.01'
												className='w-full rounded-full border border-white/80 bg-transparent px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500'
										 	/>
											 )}
										{/* </div> */}
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


// // src/app/comic-pad/upload-comics/_components/OnboardingPage.tsx
// "use client";

// import { useState } from "react";
// import { X } from "lucide-react";

// interface ExtractedFile {
// 	name: string;
// 	blob: Blob;
// 	preview: string;
// }

// interface ComicData {
// 	title: string;
// 	description: string;
// 	genre: string[];
// 	tags: string[];
// 	ageRating: string;
// 	coverImage: File | null;
// 	pages: ExtractedFile[];
// }

// interface MonetizationData {
// 	publishType: "free" | "paid";
// 	price?: number;
// 	mintAsNFT: boolean;
// 	nftCopies?: number;
// 	nftPrice?: number;
// 	// NEW: Free comic specific fields
// 	isFreeNFT?: boolean;
// 	maxFreeSupply?: number;
// }

// interface OnboardingPageProps {
// 	onclose: () => void;
// 	comicData: ComicData;
// 	onPublish: (monetizationData: MonetizationData) => void;
// }

// export default function OnboardingPage({
// 	onclose,
// 	comicData,
// 	onPublish,
// }: OnboardingPageProps) {
// 	const [publishType, setPublishType] = useState<"free" | "paid">("free");
// 	const [price, setPrice] = useState("");
// 	const [mintAsNFT, setMintAsNFT] = useState(false);
// 	const [nftCopies, setNftCopies] = useState("");
// 	const [nftPrice, setNftPrice] = useState("");
	
// 	// NEW: Free comic NFT state
// 	const [isFreeNFT, setIsFreeNFT] = useState(false);
// 	const [maxFreeSupply, setMaxFreeSupply] = useState("");

// 	const handlePublish = () => {
// 		const monetizationData: MonetizationData = {
// 			publishType,
// 			mintAsNFT: publishType === "paid" ? mintAsNFT : false,
// 			// NEW: Add free NFT data
// 			isFreeNFT: publishType === "free" ? isFreeNFT : false,
// 			maxFreeSupply: publishType === "free" && isFreeNFT ? parseInt(maxFreeSupply) || 100 : undefined,
// 		};

// 		if (publishType === "paid") {
// 			monetizationData.price = parseFloat(price) || 0;
// 			if (mintAsNFT) {
// 				monetizationData.nftCopies = parseInt(nftCopies) || 100;
// 				monetizationData.nftPrice = parseFloat(nftPrice) || 0;
// 			}
// 		}

// 		onPublish(monetizationData);
// 	};

// 	const isFormValid = () => {
// 		if (publishType === "paid") {
// 			const priceValid = parseFloat(price) > 0;
// 			if (mintAsNFT) {
// 				return (
// 					priceValid &&
// 					parseInt(nftCopies) > 0 &&
// 					parseFloat(nftPrice) > 0
// 				);
// 			}
// 			return priceValid;
// 		}
		
// 		// NEW: Validation for free comic NFTs
// 		if (publishType === "free" && isFreeNFT) {
// 			return parseInt(maxFreeSupply) > 0;
// 		}
		
// 		return true;
// 	};

// 	return (
// 		<div className='fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4'>
// 			<div className='bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10'>
// 				{/* Header */}
// 				<div className='sticky top-0 bg-gradient-to-r from-orange-600 to-yellow-600 p-6 flex justify-between items-center z-10'>
// 					<h2 className='text-2xl font-bold text-white tracking-wider'>
// 						Monetization & Publishing
// 					</h2>
// 					<button
// 						onClick={onclose}
// 						className='text-white hover:bg-white/20 p-2 rounded-full transition'
// 					>
// 						<X size={24} />
// 					</button>
// 				</div>

// 				<div className='p-8 space-y-6'>
// 					{/* Reading Access Section */}
// 					<div className='mb-8'>
// 						<h2 className='text-white font-medium tracking-widest mb-4'>
// 							Reading Access
// 						</h2>

// 						<div className='space-y-4'>
// 							{/* Free to Read Option */}
// 							<label className='flex items-start gap-3 cursor-pointer p-4 rounded-lg border border-white/20 hover:border-orange-500/50 transition'>
// 								<input
// 									type='radio'
// 									name='reading-access'
// 									value='free'
// 									checked={publishType === "free"}
// 									onChange={() => {
// 										setPublishType("free");
// 										setMintAsNFT(false);
// 									}}
// 									className='accent-orange-500 mt-1'
// 								/>
// 								<div className='flex-1'>
// 									<h4 className='text-white font-semibold'>Free to read</h4>
// 									<p className='text-white/60 text-sm mt-1'>
// 										Make your comic available to everyone at no cost. Perfect for building an audience.
// 									</p>
									
// 									{/* NEW: Free Comic NFT Option */}
// 									{publishType === "free" && (
// 										<div className='mt-4 pl-6 border-l-2 border-orange-500/30'>
// 											<label className='flex items-center gap-2 cursor-pointer mb-3'>
// 												<input
// 													type='checkbox'
// 													checked={isFreeNFT}
// 													onChange={(e) => setIsFreeNFT(e.target.checked)}
// 													className='accent-orange-500'
// 												/>
// 												<span className='text-white font-medium'>
// 													Mint as Free Claimable NFT
// 												</span>
// 											</label>
											
// 											{isFreeNFT && (
// 												<>
// 													<p className='text-white/60 text-sm mb-3'>
// 														Readers can claim your comic as an NFT for free (gas fees only). 
// 														Each user can claim once.
// 													</p>
// 													<div className='space-y-2'>
// 														<label className='block text-white/80 text-sm'>
// 															Maximum Claims Allowed
// 														</label>
// 														<input
// 															type='number'
// 															placeholder='e.g., 1000'
// 															value={maxFreeSupply}
// 															onChange={(e) => setMaxFreeSupply(e.target.value)}
// 															min='1'
// 															step='1'
// 															className='w-full rounded-full border border-white/80 bg-transparent px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500'
// 														/>
// 														<p className='text-white/40 text-xs'>
// 															Total number of users who can claim this comic as an NFT
// 														</p>
// 													</div>
// 												</>
// 											)}
// 										</div>
// 									)}
// 								</div>
// 							</label>

// 							{/* Pay Per Read Option */}
// 							<label className='flex items-start gap-3 cursor-pointer p-4 rounded-lg border border-white/20 hover:border-orange-500/50 transition'>
// 								<input
// 									type='radio'
// 									name='reading-access'
// 									value='pay-per-read'
// 									checked={publishType === "paid"}
// 									onChange={() => setPublishType("paid")}
// 									className='accent-orange-500 mt-1'
// 								/>
// 								<div className='flex-1'>
// 									<h4 className='text-white font-semibold'>Pay Per Read</h4>
// 									<p className='text-white/60 text-sm mt-1'>
// 										Readers pay to access your comic. Set your own price.
// 									</p>
									
// 									{publishType === "paid" && (
// 										<div className='mt-3'>
// 											<input
// 												type='number'
// 												placeholder='Enter HBAR amount'
// 												value={price}
// 												onChange={(e) => setPrice(e.target.value)}
// 												min='0.01'
// 												step='0.01'
// 												className='w-full rounded-full border border-white/80 bg-transparent px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500'
// 											/>
// 										</div>
// 									)}
// 								</div>
// 							</label>
// 						</div>
// 					</div>

// 					{/* Pay-per-read NFT Info */}
// 					{publishType === "paid" && (
// 						<>
// 							<div className='mb-6 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-lg p-4'>
// 								<div className='flex items-start gap-3'>
// 									<div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0'>
// 										<span className='text-white text-sm font-bold'>💡</span>
// 									</div>
// 									<div>
// 										<h4 className='text-orange-300 font-semibold mb-1'>Smart Integration Enabled!</h4>
// 										<p className='text-orange-200/80 text-sm leading-relaxed'>
// 											Your comic will be automatically uploaded to IPFS for decentralized storage 
// 											and blockchain integration.
// 										</p>
// 									</div>
// 								</div>
// 							</div>

// 							{/* NFT Edition Section (Pay-per-read) */}
// 							<div>
// 								<h2 className='text-white font-medium tracking-widest mb-4'>
// 									NFT Edition (Optional)
// 								</h2>
// 								<label className='flex items-start gap-3 cursor-pointer p-4 rounded-lg border border-white/20 hover:border-green-500/50 transition'>
// 									<input
// 										type='checkbox'
// 										checked={mintAsNFT}
// 										onChange={(e) => setMintAsNFT(e.target.checked)}
// 										className='accent-green-500 mt-1'
// 									/>
// 									<div className='flex-1'>
// 										<h4 className='text-white font-semibold'>
// 											Create Limited Edition NFTs
// 										</h4>
// 										<p className='text-white/60 text-sm mt-1 mb-3'>
// 											Mint your comic as collectible NFTs. Fans can purchase 
// 											and own a piece of your work.
// 										</p>

// 										{mintAsNFT && (
// 											<div className='space-y-4 mt-4'>
// 												<div>
// 													<label className='block text-white/80 text-sm mb-2'>
// 														Number of NFT Copies
// 													</label>
// 													<input
// 														type='number'
// 														placeholder='e.g., 100'
// 														value={nftCopies}
// 														onChange={(e) => setNftCopies(e.target.value)}
// 														min='1'
// 														className='w-full rounded-full border border-white/80 bg-transparent px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500'
// 													/>
// 												</div>

// 												<div>
// 													<label className='block text-white/80 text-sm mb-2'>
// 														NFT Price (HBAR)
// 													</label>
// 													<input
// 														type='number'
// 														placeholder='e.g., 5.00'
// 														value={nftPrice}
// 														onChange={(e) => setNftPrice(e.target.value)}
// 														min='0.01'
// 														step='0.01'
// 														className='w-full rounded-full border border-white/80 bg-transparent px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500'
// 													/>
// 												</div>
// 											</div>
// 										)}
// 									</div>
// 								</label>
// 							</div>
// 						</>
// 					)}

// 					{/* NEW: Free NFT Info Box */}
// 					{publishType === "free" && isFreeNFT && (
// 						<div className='mb-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-4'>
// 							<div className='flex items-start gap-3'>
// 								<div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0'>
// 									<span className='text-white text-sm font-bold'>🎁</span>
// 								</div>
// 								<div>
// 									<h4 className='text-green-300 font-semibold mb-1'>Free Claimable NFT</h4>
// 									<p className='text-green-200/80 text-sm leading-relaxed'>
// 										Your comic will be minted as an NFT that readers can claim for free! 
// 										Each reader can claim one copy until the maximum supply is reached. 
// 										This is perfect for building an engaged community of collectors.
// 									</p>
// 								</div>
// 							</div>
// 						</div>
// 					)}

// 					{/* Action Buttons */}
// 					<div className='flex gap-4 pt-4'>
// 						<button
// 							onClick={onclose}
// 							className='flex-1 py-3 px-6 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors border border-white/10'
// 						>
// 							Cancel
// 						</button>
// 						{/* <button
// 							onClick={handlePublish}
// 							disabled={!isFormValid()}
// 							className='flex-1 py-3 px-6 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed'
// 						>
// 							Continue to Publish
// 						</button> */}
// 						{showPublisher && (
// 				<ComicPublisher 
// 					onclose={() => setShowPublisher(false)} 
// 					comicData={comicData}
// 					monetizationData={getMonetizationData()}
// 				/>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }