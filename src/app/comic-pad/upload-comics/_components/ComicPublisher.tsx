"use client";

import { useState } from "react";
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
	
	const dispatch = useAppDispatch();
	const {user} = useAppSelector((state) => state.wallet);
	const { isConnected } = useAccount();
	
	// Use the new comic minting hook
	const {
		publishComic,
		isUploading,
		isMinting,
		uploadProgress,
		mintingProgress,
		isWritePending,
		isConfirming,
		isMintSuccess,
		mintError,
		tokenId,
		mintHash,
	} = useComicMinting();

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
											: `Pay-Per-View ($${monetizationData.price?.toFixed(2)} USDT)`
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
											<span>${monetizationData.nftPrice?.toFixed(2)} USDT per NFT</span>
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
									<p className='text-yellow-400 font-semibold text-sm mb-1'>Validation Errors:</p>
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
					{(isUploading || isMinting || isWritePending || isConfirming) && (
						<div className='mx-6 mb-4 bg-blue-500/20 border border-blue-500/50 rounded-lg p-4'>
							<div className='space-y-3'>
								{/* Upload Progress */}
								{isUploading && (
									<div className='flex items-center gap-3'>
										<Upload size={18} className='text-blue-400' />
										<div className='flex-1'>
											<div className='flex justify-between items-center mb-1'>
												<span className='text-blue-300 text-sm font-medium'>Uploading to IPFS...</span>
												<span className='text-blue-300 text-xs'>{uploadProgress}%</span>
											</div>
											<div className='w-full bg-white/10 rounded-full h-2'>
												<div 
													className='bg-blue-400 h-2 rounded-full transition-all duration-300'
													style={{ width: `${uploadProgress}%` }}
												/>
											</div>
										</div>
									</div>
								)}

								{/* Minting Progress */}
								{(isMinting || isWritePending || isConfirming) && (
									<div className='flex items-center gap-3'>
										<Zap size={18} className='text-yellow-400' />
										<div className='flex-1'>
											<div className='flex justify-between items-center mb-1'>
												<span className='text-yellow-300 text-sm font-medium'>
													{isWritePending ? 'Preparing blockchain transaction...' : 
													 isConfirming ? 'Confirming on blockchain...' : 
													 'Minting NFT...'}
												</span>
												{isMinting && <span className='text-yellow-300 text-xs'>{mintingProgress}%</span>}
											</div>
											{isMinting && (
												<div className='w-full bg-white/10 rounded-full h-2'>
													<div 
														className='bg-yellow-400 h-2 rounded-full transition-all duration-300'
														style={{ width: `${mintingProgress}%` }}
													/>
												</div>
											)}
											{isWritePending && (
												<div className='w-full bg-white/10 rounded-full h-2'>
													<div className='bg-yellow-400 h-2 rounded-full animate-pulse w-1/3' />
												</div>
											)}
											{isConfirming && (
												<div className='w-full bg-white/10 rounded-full h-2'>
													<div className='bg-yellow-400 h-2 rounded-full animate-pulse w-2/3' />
												</div>
											)}
										</div>
									</div>
								)}

								{/* Success Messages */}
								{tokenId && (
									<div className='flex items-center gap-2 text-green-400 text-sm'>
										<CheckCircle size={16} />
										<span>NFT minted successfully! Token ID: {tokenId.toString()}</span>
									</div>
								)}

								{mintHash && (
									<div className='flex items-center gap-2 text-green-400 text-sm'>
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
							disabled={isPublishing || isUploading || isMinting || isWritePending || isConfirming}
							className='w-full bg-secondary-200/80 hover:bg-secondary-200 text-black font-semibold py-3 rounded-full transition disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2'
						>
							{isPublishing || isUploading || isMinting || isWritePending || isConfirming ? (
								<>
									<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-black'></div>
									{isUploading ? 'Uploading to IPFS...' : 
									 isMinting || isWritePending ? 'Minting NFT...' : 
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
							disabled={isPublishing || isUploading || isMinting || isWritePending || isConfirming}
							className='w-full border border-white/20 text-white/70 hover:text-white hover:bg-white/5 py-3 rounded-full transition disabled:cursor-not-allowed disabled:opacity-50'
						>
							{isPublishing || isUploading || isMinting ? 'Please wait...' : 'Go Back'}
						</button>
					</div>
				</div>
			)}

			{showNotification && <ComicNotification onclose={() => setShowNotification(true)} comicData={comicData} />}
		</>
	);
}