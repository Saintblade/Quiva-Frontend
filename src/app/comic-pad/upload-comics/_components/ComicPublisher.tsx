// "use client";

// import { useEffect, useState } from "react";
// import { AlertCircle, CheckCircle, Upload, Zap, Database } from "lucide-react";
// import { ComicNotification } from "./ComicNotification";
// import Picture from "@/components/picture/Index";
// import { createFullComic } from "@/redux/slices/comicSlice";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import { useComicMinting } from "@/hook/useComicMinting";
// import { useAccount } from "wagmi";

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
// }

// interface ComicPublisherProps {
// 	onclose: () => void;
// 	comicData: ComicData;
// 	monetizationData: MonetizationData;
// }

// export default function ComicPublisher({ onclose, comicData, monetizationData }: ComicPublisherProps) {
// 	const [showNotification, setShowNotification] = useState(false);
// 	const [isPublishing, setIsPublishing] = useState(false);
// 	const [error, setError] = useState<string | null>(null);
// 	const [validationErrors, setValidationErrors] = useState<string[]>([]);
// 	const [publishingStep, setPublishingStep] = useState<string>('');
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
	
// 	const dispatch = useAppDispatch();
// 	const {user} = useAppSelector((state) => state.wallet);
// 	const { isConnected } = useAccount();
// 	// Use the new comic minting hook
//   const {
// 	publishComic,
// 	isUploading,
// 	isMinting,
// 	uploadProgress,
// 	mintingProgress,
// 	isWritePending,
// 	isConfirming,
// 	isMintSuccess,
// 	isComplete,    // 👈 ADD THIS
// 	mintError,
// 	tokenId,
// 	mintHash,
// 	comicId,       // 👈 ADD THIS
// } = useComicMinting();

// useEffect(() => {
// 	if (isComplete && tokenId && mintHash) {
// 		console.log('✅ Transaction Complete! Opening success modal...');
// 		console.log('📝 Token ID:', tokenId.toString());
// 		console.log('📝 Transaction Hash:', mintHash);
// 		setShowSuccessModal(true);
// 		setIsPublishing(false);
// 	}

// }, [isComplete, tokenId, mintHash]);

// 	const validateComicData = (): boolean => {
// 		const errors: string[] = [];

// 		// Validate title
// 		if (!comicData.title || comicData.title.trim().length === 0) {
// 			errors.push("Comic title is required");
// 		}

// 		// Validate description
// 		if (!comicData.description || comicData.description.trim().length === 0) {
// 			errors.push("Comic description is required");
// 		}

// 		// Validate genres
// 		if (!comicData.genre || comicData.genre.length === 0) {
// 			errors.push("At least one genre must be selected");
// 		}

// 		// Validate pages
// 		if (!comicData.pages || comicData.pages.length === 0) {
// 			errors.push("At least one comic page is required");
// 		}

// 		// Validate age rating
// 		if (!comicData.ageRating) {
// 			errors.push("Age rating is required");
// 		}

// 		// Validate monetization
// 		if (monetizationData.publishType === "paid") {
// 			if (!monetizationData.price || monetizationData.price <= 0) {
// 				errors.push("Valid price is required for paid comics");
// 			}
// 		}

// 		// Validate NFT data
// 		if (monetizationData.mintAsNFT) {
// 			if (!monetizationData.nftCopies || monetizationData.nftCopies <= 0) {
// 				errors.push("Valid number of NFT copies is required");
// 			}
// 			if (!monetizationData.nftPrice || monetizationData.nftPrice <= 0) {
// 				errors.push("Valid NFT mint price is required");
// 			}
// 		}

// 		setValidationErrors(errors);
// 		return errors.length === 0;
// 	};

// 	const handlePublish = async () => {
// 		// Clear previous errors
// 		setError(null);
// 		setValidationErrors([]);
// 		setPublishingStep('');

// 		// Validate data first
// 		if (!validateComicData()) {
// 			setError("Please fix the validation errors before publishing");
// 			return;
// 		}

// 		if (!user) {
// 			setError("Please connect your wallet to publish your comic");
// 			return;
// 		}

// 		// Additional validation for paid comics and NFTs
// 		if ((monetizationData.publishType === "paid" || monetizationData.mintAsNFT) && !isConnected) {
// 			setError("Please connect your wallet to publish paid comics or mint NFTs");
// 			return;
// 		}

// 		try {
// 			setIsPublishing(true);
//       setShowSuccessModal(false);

// 			// Use the new comic minting hook for enhanced publishing
// 			const result = await publishComic({
// 				comicData,
// 				monetizationData,
// 				user,
// 			});

// 			console.log('🎉 Comic published successfully:', result);

// 			// Show success notification
// 			setShowNotification(true);

// 		} catch (err: any) {
// 			console.error('Error publishing comic:', err);
			
// 			// Extract meaningful error message
// 			let errorMessage = 'Failed to publish comic. Please try again.';
			
// 			if (err?.response?.data?.message) {
// 				errorMessage = err.response.data.message;
// 			} else if (err?.response?.data?.error) {
// 				errorMessage = err.response.data.error;
// 			} else if (err?.message) {
// 				errorMessage = err.message;
// 			} else if (typeof err === 'string') {
// 				errorMessage = err;
// 			}

// 			// Handle specific error types
// 			if (errorMessage.toLowerCase().includes('network')) {
// 				errorMessage = 'Network error. Please check your connection and try again.';
// 			} else if (errorMessage.toLowerCase().includes('timeout')) {
// 				errorMessage = 'Request timed out. Your file might be too large. Please try again.';
// 			} else if (errorMessage.toLowerCase().includes('unauthorized')) {
// 				errorMessage = 'Authentication error. Please log in again.';
// 			} else if (errorMessage.toLowerCase().includes('validation')) {
// 				errorMessage = 'Validation error. Please check your comic details.';
// 			} else if (errorMessage.toLowerCase().includes('wallet')) {
// 				errorMessage = 'Wallet connection error. Please check your wallet and try again.';
// 			} else if (errorMessage.toLowerCase().includes('gas')) {
// 				errorMessage = 'Insufficient gas fees. Please add funds to your wallet and try again.';
// 			} else if (errorMessage.toLowerCase().includes('rejected')) {
// 				errorMessage = 'Transaction was rejected. Please approve the transaction in your wallet.';
// 			}

// 			setError(errorMessage);
// 		} finally {
// 			setIsPublishing(false);
// 			setPublishingStep('');
// 		}
// 	};

// 	return (
// 		<>
// 			{!showNotification && (
// 				<div className='relative overflow-y-auto pr-2 max-h-[80vh]'>
// 					{/* Header */}
// 					<div className='px-2 pt-6 pb-4 mx-auto text-center'>
// 						<p className='text-white/80 text-xs font-medium tracking-widest uppercase mb-2'>
// 							PUBLISH YOUR COMIC · STEP 4 OF 4
// 						</p>
// 						<h2 className='text-3xl tracking-wider font-bold text-white/80'>
// 							Almost there!
// 						</h2>

// 						<p className='text-white/50 text-sm leading-relaxed'>
// 							Review your choices one last time. This is it!
// 						</p>
// 					</div>

// 					<div className='bg-black-200 pb-4 rounded-b-lg'>
// 						{/* Comic Preview */}
// 						<div className='bg-gray-900 rounded-t-lg overflow-hidden border border-gray-700 mb-4'>
// 							<Picture
// 								src={comicData.coverImage 
// 									? URL.createObjectURL(comicData.coverImage) 
// 									: comicData.pages[0]?.preview || ''
// 								}
// 								alt='Comic preview'
// 								className='w-full h-48 object-cover'
// 							/>
// 						</div>

// 						{/* Comic Details */}
// 						<div className='mb-6 px-4'>
// 							<h3 className='text-lg font-semibold mb-3 text-white/90 tracking-wider'>
// 								{comicData.title}
// 							</h3>

// 							<div className='space-y-2 text-sm text-white/80 tracking-wide'>
// 								<div className='flex items-center gap-3'>
// 									<span className='text-white/60'>Description:</span>
// 									<span className='line-clamp-2'>{comicData.description}</span>
// 								</div>

// 								<div className='flex items-center gap-3'>
// 									<span className='text-white/60'>Genres:</span>
// 									<span>{comicData.genre.join(', ')}</span>
// 								</div>

// 								{comicData.tags.length > 0 && (
// 									<div className='flex items-center gap-3'>
// 										<span className='text-white/60'>Tags:</span>
// 										<span>{comicData.tags.join(', ')}</span>
// 									</div>
// 								)}

// 								<div className='flex items-center gap-3'>
// 									<span className='text-white/60'>Age Rating:</span>
// 									<span>
// 										{comicData.ageRating === 'all-ages' 
// 											? 'All Ages' 
// 											: comicData.ageRating === 'teen' 
// 											? 'Teen (13+)' 
// 											: 'Mature (18+)'}
// 									</span>
// 								</div>

// 								<div className='flex items-center gap-3'>
// 									<span className='text-white/60'>Reader Access:</span>
// 									<span>
// 										{monetizationData.publishType === 'free' 
// 											? 'Free to Read' 
// 											: `Pay-Per-View ($${monetizationData.price?.toFixed(2)} HBAR)`
// 										}
// 									</span>
// 								</div>

// 								{monetizationData.mintAsNFT && (
// 									<>
// 										<div className='flex items-center gap-3'>
// 											<span className='text-white/60'>NFT Edition:</span>
// 											<span className='flex items-center gap-1'>
// 												<CheckCircle size={14} className='text-green-400' />
// 												Limited Edition
// 											</span>
// 										</div>
// 										<div className='flex items-center gap-3'>
// 											<span className='text-white/60'>NFT Copies:</span>
// 											<span>{monetizationData.nftCopies} editions</span>
// 										</div>
// 										<div className='flex items-center gap-3'>
// 											<span className='text-white/60'>Mint Price:</span>
// 											<span>${monetizationData.nftPrice?.toFixed(2)} HBAR per NFT</span>
// 										</div>
// 									</>
// 								)}

// 								<div className='flex items-center gap-3'>
// 									<span className='text-white/60'>Pages:</span>
// 									<span>{comicData.pages.length} pages (Chapter 1)</span>
// 								</div>

// 								<div className='flex items-center gap-3'>
// 									<span className='text-white/60'>Status:</span>
// 									<span className='flex items-center gap-1'>
// 										<CheckCircle size={14} className='text-green-400' />
// 										Ready to Publish
// 									</span>
// 								</div>
// 							</div>

// 							<p className='mt-3 text-sm text-white/80 tracking-wide leading-relaxed'>
// 								By clicking <b className='text-orange-400'>&quot;PUBLISH COMIC!&quot;</b>, your comic will
// 								become live on Quiva and readers can start enjoying it immediately.
// 								{monetizationData.mintAsNFT && ' Your NFT collection will also be created and available for minting.'}
// 							</p>
// 						</div>
// 					</div>

// 					{/* Validation Errors */}
// 					{validationErrors.length > 0 && (
// 						<div className='mx-6 mb-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3'>
// 							<div className='flex items-start gap-2'>
// 								<AlertCircle size={18} className='text-yellow-400 flex-shrink-0 mt-0.5' />
// 								<div>
// 									<p className='text-orange-400 font-semibold text-sm mb-1'>Validation Errors:</p>
// 									<ul className='list-disc list-inside text-yellow-300 text-sm space-y-1'>
// 										{validationErrors.map((err, idx) => (
// 											<li key={idx}>{err}</li>
// 										))}
// 									</ul>
// 								</div>
// 							</div>
// 						</div>
// 					)}

// 					{/* Error Message */}
// 					{error && (
// 						<div className='mx-6 mb-4 bg-red-500/20 border border-red-500/50 rounded-lg p-3'>
// 							<div className='flex items-start gap-2'>
// 								<AlertCircle size={18} className='text-red-400 flex-shrink-0 mt-0.5' />
// 								<div>
// 									<p className='text-red-400 font-semibold text-sm mb-1'>Error Publishing Comic</p>
// 									<p className='text-red-300 text-sm'>{error}</p>
// 								</div>
// 							</div>
// 						</div>
// 					)}

// 					{/* Publishing Progress */}
// 					{(isUploading || isMinting || isWritePending || isConfirming) && (
// 						<div className='mx-6 mb-4 bg-blue-500/20 border border-blue-500/50 rounded-lg p-4'>
// 							<div className='space-y-3'>
// 								{/* Upload Progress */}
// 								{isUploading && (
// 									<div className='flex items-center gap-3'>
// 										<Upload size={18} className='text-orange-400' />
// 										<div className='flex-1'>
// 											<div className='flex justify-between items-center mb-1'>
// 												<span className='text-blue-300 text-sm font-medium'>Uploading to IPFS...</span>
// 												<span className='text-blue-300 text-xs'>{uploadProgress}%</span>
// 											</div>
// 											<div className='w-full bg-white/10 rounded-full h-2'>
// 												<div 
// 													className='bg-orange-400 h-2 rounded-full transition-all duration-300'
// 													style={{ width: `${uploadProgress}%` }}
// 												/>
// 											</div>
// 										</div>
// 									</div>
// 								)}

// 								{/* Minting Progress */}
// 								{(isMinting || isWritePending || isConfirming) && (
// 									<div className='flex items-center gap-3'>
// 										<Zap size={18} className='text-orange-400' />
// 										<div className='flex-1'>
// 											<div className='flex justify-between items-center mb-1'>
// 												<span className='text-orange-400 text-sm font-medium'>
// 													{isWritePending ? 'Preparing blockchain transaction...' : 
// 													 isConfirming ? 'Confirming on blockchain...' : 
// 													 'Minting NFT...'}
// 												</span>
// 												{isMinting && <span className='text-orange-400 text-xs'>{mintingProgress}%</span>}
// 											</div>
// 											{isMinting && (
// 												<div className='w-full bg-white/10 rounded-full h-2'>
// 													<div 
// 														className='bg-orange-400 h-2 rounded-full transition-all duration-300'
// 														style={{ width: `${mintingProgress}%` }}
// 													/>
// 												</div>
// 											)}
// 											{isWritePending && (
// 												<div className='w-full bg-white/10 rounded-full h-2'>
// 													<div className='bg-orange-400 h-2 rounded-full animate-pulse w-1/3' />
// 												</div>
// 											)}
// 											{isConfirming && (
// 												<div className='w-full bg-white/10 rounded-full h-2'>
// 													<div className='bg-orange-400 h-2 rounded-full animate-pulse w-2/3' />
// 												</div>
// 											)}
// 										</div>
// 									</div>
// 								)}

// 								{/* Success Messages */}
// 								{tokenId && (
// 									<div className='flex items-center gap-2 text-orange-400 text-sm'>
// 										<CheckCircle size={16} />
// 										<span>NFT minted successfully! Token ID: {tokenId.toString()}</span>
// 									</div>
// 								)}

// 								{mintHash && (
// 									<div className='flex items-center gap-2 text-orange-400 text-sm'>
// 										<CheckCircle size={16} />
// 										<span>Transaction: {mintHash.slice(0, 10)}...{mintHash.slice(-8)}</span>
// 									</div>
// 								)}
// 							</div>
// 						</div>
// 					)}

// 					{/* Mint Error */}
// 					{mintError && (
// 						<div className='mx-6 mb-4 bg-red-500/20 border border-red-500/50 rounded-lg p-3'>
// 							<div className='flex items-start gap-2'>
// 								<AlertCircle size={18} className='text-red-400 flex-shrink-0 mt-0.5' />
// 								<div>
// 									<p className='text-red-400 font-semibold text-sm mb-1'>NFT Minting Error</p>
// 									<p className='text-red-300 text-sm'>{mintError.message || 'Failed to mint NFT'}</p>
// 								</div>
// 							</div>
// 						</div>
// 					)}

// 					{/* Action Buttons */}
// 					<div className='px-6 pb-6 space-y-3 mt-4'>
// 						<button
// 							onClick={handlePublish}
// 							disabled={isPublishing || isUploading || isMinting || isWritePending || isConfirming}
// 							className='w-full bg-secondary-200/80 hover:bg-secondary-200 text-black font-semibold py-3 rounded-full transition disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2'
// 						>
// 							{isPublishing || isUploading || isMinting || isWritePending || isConfirming ? (
// 								<>
// 									<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-black'></div>
// 									{isUploading ? 'Uploading to IPFS...' : 
// 									 isMinting || isWritePending ? 'Minting NFT...' : 
// 									 isConfirming ? 'Confirming...' : 
// 									 'Publishing...'}
// 								</>
// 							) : (
// 								<>
// 									<Database size={18} />
// 									{monetizationData.mintAsNFT ? 'Publish & Mint NFT' : 'Publish Comic'}
// 								</>
// 							)}
// 						</button>

// 						<button
// 							onClick={onclose}
// 							disabled={isPublishing || isUploading || isMinting || isWritePending || isConfirming}
// 							className='w-full border border-white/20 text-white/70 hover:text-white hover:bg-white/5 py-3 rounded-full transition disabled:cursor-not-allowed disabled:opacity-50'
// 						>
// 							{isPublishing || isUploading || isMinting ? 'Please wait...' : 'Go Back'}
// 						</button>
// 					</div>
// 				</div>
// 			)}

// 			{/* {showNotification && <ComicNotification onclose={() => setShowNotification(true)} />} */}
//       {/* SUCCESS MODAL */}
// 			{showSuccessModal && isComplete && tokenId && mintHash && (
// 			<div className='fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60]'>
// 				<div className='bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-orange-400/30 shadow-2xl'>
// 					<div className='text-center'>
// 						{/* Success Icon with Animation */}
// 						<div className='mb-6'>
// 							<div className='w-20 h-20 mx-auto bg-orange-400 rounded-full flex items-center justify-center border-4 border-orange-400 animate-bounce'>
// 								<CheckCircle className='w-12 h-12 text-orange-400' />
// 							</div>
// 						</div>

// 						{/* Success Title */}
// 						<h2 className='text-3xl font-bold mb-2 text-white'>
// 							Comic Successfully Minted! 🎉
// 						</h2>
						
// 						{/* Success Description */}
// 						<p className='text-white/70 mb-6 text-sm'>
// 							Your comic has been published and minted as an NFT on the blockchain.
// 						</p>
						
// 						{/* NFT Details Card */}
// 						<div className='bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-xl p-5 mb-6 text-left border border-orange-500/30'>
// 							<p className='text-sm font-semibold text-orange-400 mb-4 tracking-wider uppercase'>
// 								NFT Details
// 							</p>
							
// 							<div className='space-y-3'>
// 								{/* Token ID Display */}
// 								<div className='bg-black/30 rounded-lg p-3'>
// 									<div className='flex justify-between items-center'>
// 										<span className='text-xs text-white/60'>Token ID:</span>
// 										<span className='text-lg font-mono font-bold text-orange-400'>
// 											#{tokenId.toString()}
// 										</span>
// 									</div>
// 								</div>

// 								{/* Transaction Hash Display */}
// 								<div className='bg-black/30 rounded-lg p-3'>
// 									<div>
// 										<span className='text-xs text-white/60 block mb-2'>Transaction Hash:</span>
// 										<span className='text-xs font-mono text-white/90 break-all block'>
// 											{mintHash}
// 										</span>
// 									</div>
// 								</div>
								
// 								{/* Comic Title */}
// 								{comicData?.title && (
// 									<div className='bg-black/30 rounded-lg p-3'>
// 										<div className='flex justify-between items-center'>
// 											<span className='text-xs text-white/60'>Comic:</span>
// 											<span className='text-sm font-medium text-white/90'>
// 												{comicData.title}
// 											</span>
// 										</div>
// 									</div>
// 								)}

// 								{/* NFT Supply */}
// 								{monetizationData?.nftCopies && (
// 									<div className='bg-black/30 rounded-lg p-3'>
// 										<div className='flex justify-between items-center'>
// 											<span className='text-xs text-white/60'>Supply:</span>
// 											<span className='text-sm font-medium text-white/90'>
// 												{monetizationData.nftCopies} copies
// 											</span>
// 										</div>
// 									</div>
// 								)}
// 							</div>

// 							{/* HashScan Explorer Link */}
// 							<a
// 								href={`https://hashscan.io/testnet/transaction/${mintHash}`}
// 								target='_blank'
// 								rel='noopener noreferrer'
// 								className='flex items-center justify-center gap-2 text-xs text-orange-400 hover:text-orange-300 mt-4 pt-4 border-t border-orange-500/20 transition-colors'
// 							>
// 								<span>View Transaction on HashScan</span>
// 								<svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
// 									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
// 								</svg>
// 							</a>
// 						</div>
						
// 						{/* Action Buttons */}
// 						<div className='space-y-3'>
// 							{/* View Comic Button */}
// 							<button
// 								onClick={() => {
// 									// Navigate to the published comic
// 									window.location.href = `/comic-pad/my-comics`;
// 								}}
// 								className='w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-orange-500/50'
// 							>
// 								View Comic
// 							</button>
							
// 							{/* Create Another Comic Button */}
// 							<button
// 								onClick={() => {
// 									setShowSuccessModal(false);
// 									onclose();
// 								}}
// 								className='w-full py-2 px-6 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-full transition-colors border border-white/10'
// 							>
// 								Create Another Comic
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		)}

// 		{showNotification && <ComicNotification onclose={() => setShowNotification(true)} />}
		
// 		</>
// 	);
// }


"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Upload, Zap, Database } from "lucide-react";
import { ComicNotification } from "./ComicNotification";
import Picture from "@/components/picture/Index";
import { createFullComic } from "@/redux/slices/comicSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useComicMinting } from "@/hook/useComicMinting";
import { useAccount } from "wagmi";

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

interface MonetizationData {
	publishType: "free" | "paid";
	price?: number;
	mintAsNFT: boolean;
	nftCopies?: number;
	nftPrice?: number;
}

interface ComicPublisherProps {
	onclose: () => void;
	comicData: ComicData;
	monetizationData: MonetizationData;
}

export default function ComicPublisher({ onclose, comicData, monetizationData }: ComicPublisherProps) {
	const [showNotification, setShowNotification] = useState(false);
	const [isPublishing, setIsPublishing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [validationErrors, setValidationErrors] = useState<string[]>([]);
	const [publishingStep, setPublishingStep] = useState<string>('');
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	
	const dispatch = useAppDispatch();
	const {user} = useAppSelector((state) => state.wallet);
	const { isConnected } = useAccount();
	
	// Use the new comic minting hook
	const {
		publishComic,
		isUploading,
		isMinting,
		isListing,
		uploadProgress,
		mintingProgress,
		isWritePending,
		isConfirming,
		isMintSuccess,
		isComplete,
		mintError,
		tokenId,
		mintHash,
		comicId,
	} = useComicMinting();

	useEffect(() => {
		if (isComplete && tokenId && mintHash) {
			console.log('✅ Transaction Complete! Opening success modal...');
			console.log('🎫 Token ID:', tokenId.toString());
			console.log('🔗 Transaction Hash:', mintHash);
			setShowSuccessModal(true);
			setIsPublishing(false);
		}
	}, [isComplete, tokenId, mintHash]);

	const validateComicData = (): boolean => {
		const errors: string[] = [];

		// Validate title
		if (!comicData.title || comicData.title.trim().length === 0) {
			errors.push("Comic title is required");
		}

		// Validate description
		if (!comicData.description || comicData.description.trim().length === 0) {
			errors.push("Comic description is required");
		}

		// Validate genres
		if (!comicData.genre || comicData.genre.length === 0) {
			errors.push("At least one genre must be selected");
		}

		// Validate pages
		if (!comicData.pages || comicData.pages.length === 0) {
			errors.push("At least one comic page is required");
		}

		// Validate age rating
		if (!comicData.ageRating) {
			errors.push("Age rating is required");
		}

		// Validate monetization
		if (monetizationData.publishType === "paid") {
			if (!monetizationData.price || monetizationData.price <= 0) {
				errors.push("Valid price is required for paid comics");
			}
		}

		// Validate NFT data
		if (monetizationData.mintAsNFT) {
			if (!monetizationData.nftCopies || monetizationData.nftCopies <= 0) {
				errors.push("Valid number of NFT copies is required");
			}
			if (!monetizationData.nftPrice || monetizationData.nftPrice <= 0) {
				errors.push("Valid NFT mint price is required");
			}
		}

		setValidationErrors(errors);
		return errors.length === 0;
	};

	const handlePublish = async () => {
		// Clear previous errors
		setError(null);
		setValidationErrors([]);
		setPublishingStep('');

		// Validate data first
		if (!validateComicData()) {
			setError("Please fix the validation errors before publishing");
			return;
		}

		if (!user) {
			setError("Please connect your wallet to publish your comic");
			return;
		}

		// Additional validation for paid comics and NFTs
		if ((monetizationData.publishType === "paid" || monetizationData.mintAsNFT) && !isConnected) {
			setError("Please connect your wallet to publish paid comics or mint NFTs");
			return;
		}

		try {
			setIsPublishing(true);
			setShowSuccessModal(false);

			// Use the new comic minting hook for enhanced publishing
			const result = await publishComic({
				comicData,
				monetizationData,
				user,
			});

			console.log('🎉 Comic published successfully:', result);

			// Show success notification
			setShowNotification(true);

		} catch (err: any) {
			console.error('Error publishing comic:', err);
			
			// Extract meaningful error message
			let errorMessage = 'Failed to publish comic. Please try again.';
			
			if (err?.response?.data?.message) {
				errorMessage = err.response.data.message;
			} else if (err?.response?.data?.error) {
				errorMessage = err.response.data.error;
			} else if (err?.message) {
				errorMessage = err.message;
			} else if (typeof err === 'string') {
				errorMessage = err;
			}

			// Handle specific error types
			if (errorMessage.toLowerCase().includes('network')) {
				errorMessage = 'Network error. Please check your connection and try again.';
			} else if (errorMessage.toLowerCase().includes('timeout')) {
				errorMessage = 'Request timed out. Your file might be too large. Please try again.';
			} else if (errorMessage.toLowerCase().includes('unauthorized')) {
				errorMessage = 'Authentication error. Please log in again.';
			} else if (errorMessage.toLowerCase().includes('validation')) {
				errorMessage = 'Validation error. Please check your comic details.';
			} else if (errorMessage.toLowerCase().includes('wallet')) {
				errorMessage = 'Wallet connection error. Please check your wallet and try again.';
			} else if (errorMessage.toLowerCase().includes('gas')) {
				errorMessage = 'Insufficient gas fees. Please add funds to your wallet and try again.';
			} else if (errorMessage.toLowerCase().includes('rejected')) {
				errorMessage = 'Transaction was rejected. Please approve the transaction in your wallet.';
			}

			setError(errorMessage);
		} finally {
			setIsPublishing(false);
			setPublishingStep('');
		}
	};

	const handleCloseSuccessModal = () => {
		setShowSuccessModal(false);
		setIsPublishing(false);
		onclose();
	};

	return (
		<>
			{!showNotification && (
				<div className='relative overflow-y-auto pr-2 max-h-[80vh]'>
					{/* Header */}
					<div className='px-2 pt-6 pb-4 mx-auto text-center'>
						<p className='text-white/80 text-xs font-medium tracking-widest uppercase mb-2'>
							PUBLISH YOUR COMIC · STEP 4 OF 4
						</p>
						<h2 className='text-3xl tracking-wider font-bold text-white/80'>
							Almost there!
						</h2>

						<p className='text-white/50 text-sm leading-relaxed'>
							Review your choices one last time. This is it!
						</p>
					</div>

					<div className='bg-black-200 pb-4 rounded-b-lg'>
						{/* Comic Preview */}
						<div className='bg-gray-900 rounded-t-lg overflow-hidden border border-gray-700 mb-4'>
							<Picture
								src={comicData.coverImage 
									? URL.createObjectURL(comicData.coverImage) 
									: comicData.pages[0]?.preview || ''
								}
								alt='Comic preview'
								className='w-full h-48 object-cover'
							/>
						</div>

						{/* Comic Details */}
						<div className='mb-6 px-4'>
							<h3 className='text-lg font-semibold mb-3 text-white/90 tracking-wider'>
								{comicData.title}
							</h3>

							<div className='space-y-2 text-sm text-white/80 tracking-wide'>
								<div className='flex items-center gap-3'>
									<span className='text-white/60'>Description:</span>
									<span className='line-clamp-2'>{comicData.description}</span>
								</div>

								<div className='flex items-center gap-3'>
									<span className='text-white/60'>Genres:</span>
									<span>{comicData.genre.join(', ')}</span>
								</div>

								{comicData.tags.length > 0 && (
									<div className='flex items-center gap-3'>
										<span className='text-white/60'>Tags:</span>
										<span>{comicData.tags.join(', ')}</span>
									</div>
								)}

								<div className='flex items-center gap-3'>
									<span className='text-white/60'>Age Rating:</span>
									<span>
										{comicData.ageRating === 'all-ages' 
											? 'All Ages' 
											: comicData.ageRating === 'teen' 
											? 'Teen (13+)' 
											: 'Mature (18+)'}
									</span>
								</div>

								<div className='flex items-center gap-3'>
									<span className='text-white/60'>Reader Access:</span>
									<span>
										{monetizationData.publishType === 'free' 
											? 'Free to Read' 
											: `Pay-Per-View ($${monetizationData.price?.toFixed(2)} HBAR)`
										}
									</span>
								</div>

								{monetizationData.mintAsNFT && (
									<>
										<div className='flex items-center gap-3'>
											<span className='text-white/60'>NFT Edition:</span>
											<span className='flex items-center gap-1'>
												<CheckCircle size={14} className='text-green-400' />
												Limited Edition
											</span>
										</div>
										<div className='flex items-center gap-3'>
											<span className='text-white/60'>NFT Copies:</span>
											<span>{monetizationData.nftCopies} editions</span>
										</div>
										<div className='flex items-center gap-3'>
											<span className='text-white/60'>Mint Price:</span>
											<span>${monetizationData.nftPrice?.toFixed(2)} HBAR per NFT</span>
										</div>
									</>
								)}

								<div className='flex items-center gap-3'>
									<span className='text-white/60'>Pages:</span>
									<span>{comicData.pages.length} pages (Chapter 1)</span>
								</div>

								<div className='flex items-center gap-3'>
									<span className='text-white/60'>Status:</span>
									<span className='flex items-center gap-1'>
										<CheckCircle size={14} className='text-green-400' />
										Ready to Publish
									</span>
								</div>
							</div>

							<p className='mt-3 text-sm text-white/80 tracking-wide leading-relaxed'>
								By clicking <b className='text-orange-400'>&quot;PUBLISH COMIC!&quot;</b>, your comic will
								become live on Quiva and readers can start enjoying it immediately.
								{monetizationData.mintAsNFT && ' Your NFT collection will also be created and available for minting.'}
							</p>
						</div>
					</div>

					{/* Validation Errors */}
					{validationErrors.length > 0 && (
						<div className='mx-6 mb-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3'>
							<div className='flex items-start gap-2'>
								<AlertCircle size={18} className='text-yellow-400 flex-shrink-0 mt-0.5' />
								<div>
									<p className='text-orange-400 font-semibold text-sm mb-1'>Validation Errors:</p>
									<ul className='list-disc list-inside text-yellow-300 text-sm space-y-1'>
										{validationErrors.map((err, idx) => (
											<li key={idx}>{err}</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					)}

					{/* Error Message */}
					{error && (
						<div className='mx-6 mb-4 bg-red-500/20 border border-red-500/50 rounded-lg p-3'>
							<div className='flex items-start gap-2'>
								<AlertCircle size={18} className='text-red-400 flex-shrink-0 mt-0.5' />
								<div>
									<p className='text-red-400 font-semibold text-sm mb-1'>Error Publishing Comic</p>
									<p className='text-red-300 text-sm'>{error}</p>
								</div>
							</div>
						</div>
					)}

					{/* Publishing Progress */}
					{(isUploading || isMinting || isListing || isWritePending || isConfirming) && (
						<div className='mx-6 mb-4 bg-blue-500/20 border border-blue-500/50 rounded-lg p-4'>
							<div className='space-y-3'>
								{/* Upload Progress */}
								{isUploading && (
									<div className='flex items-center gap-3'>
										<Upload size={18} className='text-orange-400' />
										<div className='flex-1'>
											<div className='flex justify-between items-center mb-1'>
												<span className='text-blue-300 text-sm font-medium'>Uploading to IPFS...</span>
												<span className='text-blue-300 text-xs'>{uploadProgress}%</span>
											</div>
											<div className='w-full bg-white/10 rounded-full h-2'>
												<div 
													className='bg-orange-400 h-2 rounded-full transition-all duration-300'
													style={{ width: `${uploadProgress}%` }}
												/>
											</div>
										</div>
									</div>
								)}

								{/* Minting Progress */}
								{(isMinting || isWritePending || isConfirming) && !isListing && (
									<div className='flex items-center gap-3'>
										<Zap size={18} className='text-orange-400' />
										<div className='flex-1'>
											<div className='flex justify-between items-center mb-1'>
												<span className='text-orange-400 text-sm font-medium'>
													{isWritePending ? 'Preparing blockchain transaction...' : 
													 isConfirming ? 'Confirming on blockchain...' : 
													 'Minting NFT...'}
												</span>
												{isMinting && <span className='text-orange-400 text-xs'>{mintingProgress}%</span>}
											</div>
											{isMinting && (
												<div className='w-full bg-white/10 rounded-full h-2'>
													<div 
														className='bg-orange-400 h-2 rounded-full transition-all duration-300'
														style={{ width: `${mintingProgress}%` }}
													/>
												</div>
											)}
											{isWritePending && (
												<div className='w-full bg-white/10 rounded-full h-2'>
													<div className='bg-orange-400 h-2 rounded-full animate-pulse w-1/3' />
												</div>
											)}
											{isConfirming && (
												<div className='w-full bg-white/10 rounded-full h-2'>
													<div className='bg-orange-400 h-2 rounded-full animate-pulse w-2/3' />
												</div>
											)}
										</div>
									</div>
								)}

								{/* Listing Progress */}
								{isListing && (
									<div className='flex items-center gap-3'>
										<Database size={18} className='text-green-400' />
										<div className='flex-1'>
											<div className='flex justify-between items-center mb-1'>
												<span className='text-green-400 text-sm font-medium'>
													Listing NFT on marketplace...
												</span>
												<span className='text-green-400 text-xs'>{mintingProgress}%</span>
											</div>
											<div className='w-full bg-white/10 rounded-full h-2'>
												<div 
													className='bg-green-400 h-2 rounded-full transition-all duration-300'
													style={{ width: `${mintingProgress}%` }}
												/>
											</div>
										</div>
									</div>
								)}

								{/* Success Messages */}
								{tokenId && (
									<div className='flex items-center gap-2 text-orange-400 text-sm'>
										<CheckCircle size={16} />
										<span>NFT minted successfully! Token ID: {tokenId.toString()}</span>
									</div>
								)}

								{mintHash && (
									<div className='flex items-center gap-2 text-orange-400 text-sm'>
										<CheckCircle size={16} />
										<span>Transaction: {mintHash.slice(0, 10)}...{mintHash.slice(-8)}</span>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Mint Error */}
					{mintError && (
						<div className='mx-6 mb-4 bg-red-500/20 border border-red-500/50 rounded-lg p-3'>
							<div className='flex items-start gap-2'>
								<AlertCircle size={18} className='text-red-400 flex-shrink-0 mt-0.5' />
								<div>
									<p className='text-red-400 font-semibold text-sm mb-1'>NFT Minting Error</p>
									<p className='text-red-300 text-sm'>{mintError.message || 'Failed to mint NFT'}</p>
								</div>
							</div>
						</div>
					)}

					{/* Action Buttons */}
					<div className='px-6 pb-6 space-y-3 mt-4'>
						<button
							onClick={handlePublish}
							disabled={isPublishing || isUploading || isMinting || isListing || isWritePending || isConfirming}
							className='w-full bg-secondary-200/80 hover:bg-secondary-200 text-black font-semibold py-3 rounded-full transition disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2'
						>
							{isPublishing || isUploading || isMinting || isListing || isWritePending || isConfirming ? (
								<>
									<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-black'></div>
									{isUploading ? 'Uploading to IPFS...' : 
									 isMinting || isWritePending ? 'Minting NFT...' : 
									 isListing ? 'Listing on marketplace...' :
									 isConfirming ? 'Confirming...' : 
									 'Publishing...'}
								</>
							) : (
								<>
									<Database size={18} />
									{monetizationData.mintAsNFT ? 'Publish & Mint NFT' : 'Publish Comic'}
								</>
							)}
						</button>

						<button
							onClick={onclose}
							disabled={isPublishing || isUploading || isMinting || isListing || isWritePending || isConfirming}
							className='w-full border border-white/20 text-white/70 hover:text-white hover:bg-white/5 py-3 rounded-full transition disabled:cursor-not-allowed disabled:opacity-50'
						>
							{isPublishing || isUploading || isMinting || isListing ? 'Please wait...' : 'Go Back'}
						</button>
					</div>
				</div>
			)}

			{/* SUCCESS MODAL */}
			{showSuccessModal && isComplete && tokenId && mintHash && (
				<div className='fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60]'>
					<div className='bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-orange-400/30 shadow-2xl relative'>
						{/* Close Button */}
						<button
							onClick={handleCloseSuccessModal}
							className='absolute top-4 right-4 text-white/50 hover:text-white transition-colors'
						>
							<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
							</svg>
						</button>

						<div className='text-center'>
							{/* Success Icon with Animation */}
							<div className='mb-6'>
								<div className='w-20 h-20 mx-auto bg-orange-400/20 rounded-full flex items-center justify-center border-4 border-orange-400 animate-bounce'>
									<CheckCircle className='w-12 h-12 text-orange-400' />
								</div>
							</div>

							{/* Success Title */}
							<h2 className='text-3xl font-bold mb-2 text-white'>
								Comic Successfully Minted! 🎉
							</h2>
							
							{/* Success Description */}
							<p className='text-white/70 mb-6 text-sm'>
								Your comic has been published and minted as an NFT on the blockchain.
							</p>
							
							{/* NFT Details Card */}
							<div className='bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-xl p-5 mb-6 text-left border border-orange-500/30'>
								<p className='text-sm font-semibold text-orange-400 mb-4 tracking-wider uppercase'>
									NFT Details
								</p>
								
								<div className='space-y-3'>
									{/* Token ID Display */}
									<div className='bg-black/30 rounded-lg p-3'>
										<div className='flex justify-between items-center'>
											<span className='text-xs text-white/60'>Token ID:</span>
											<span className='text-lg font-mono font-bold text-orange-400'>
												#{tokenId.toString()}
											</span>
										</div>
									</div>

									{/* Transaction Hash Display */}
									<div className='bg-black/30 rounded-lg p-3'>
										<div>
											<span className='text-xs text-white/60 block mb-2'>Transaction Hash:</span>
											<span className='text-xs font-mono text-white/90 break-all block'>
												{mintHash}
											</span>
										</div>
									</div>
									
									{/* Comic Title */}
									{comicData?.title && (
										<div className='bg-black/30 rounded-lg p-3'>
											<div className='flex justify-between items-center'>
												<span className='text-xs text-white/60'>Comic:</span>
												<span className='text-sm font-medium text-white/90'>
													{comicData.title}
												</span>
											</div>
										</div>
									)}

									{/* NFT Supply */}
									{monetizationData?.nftCopies && (
										<div className='bg-black/30 rounded-lg p-3'>
											<div className='flex justify-between items-center'>
												<span className='text-xs text-white/60'>Supply:</span>
												<span className='text-sm font-medium text-white/90'>
													{monetizationData.nftCopies} copies
												</span>
											</div>
										</div>
									)}
								</div>

								{/* HashScan Explorer Link */}
								<a
									href={`https://hashscan.io/testnet/transaction/${mintHash}`}
									target='_blank'
									rel='noopener noreferrer'
									className='flex items-center justify-center gap-2 text-xs text-orange-400 hover:text-orange-300 mt-4 pt-4 border-t border-orange-500/20 transition-colors'
								>
									<span>View Transaction on HashScan</span>
									<svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
									</svg>
								</a>
							</div>
							
							{/* Action Buttons */}
							<div className='space-y-3'>
								{/* View Comic Button */}
								<button
									onClick={() => {
										window.location.href = `/comic-pad/my-comics`;
									}}
									className='w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-orange-500/50'
								>
									View Comic
								</button>
								
								{/* Create Another Comic Button */}
								<button
									onClick={handleCloseSuccessModal}
									className='w-full py-2 px-6 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-full transition-colors border border-white/10'
								>
									Create Another Comic
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{showNotification && <ComicNotification onclose={() => setShowNotification(true)} />}
		</>
	);
}