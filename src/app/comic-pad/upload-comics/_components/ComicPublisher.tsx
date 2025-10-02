"use client";

import { useState } from "react";
import { ComicNotification } from "./ComicNotification";
import Picture from "@/components/picture/Index";
import {createFullComic} from "@/redux/slices/comicSlice"
import { useAppDispatch } from "@/redux/hook";

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
	const dispatch = useAppDispatch();

	const handlePublish = async () => {
		try {
			setIsPublishing(true);
			setError(null);

			// Create FormData for multipart/form-data upload
			const formData = new FormData();

			// Add text fields
			formData.append('title', comicData.title);
			formData.append('description', comicData.description);
			
			// Add genres as array
			comicData.genre.forEach(genre => {
				formData.append('genre', genre);
			});

			// Add tags as array
			comicData.tags.forEach(tag => {
				formData.append('tags', tag);
			});

			// Add status
			formData.append('status', 'published');

			// Add publish type and price
			formData.append('publishType', monetizationData.publishType);
			if (monetizationData.price) {
				formData.append('price', monetizationData.price.toString());
			}

			// Add cover image if provided, otherwise first page will be used
			if (comicData.coverImage) {
				formData.append('coverImage', comicData.coverImage);
			}

			// Add all pages
			// comicData.pages.forEach((page, index) => {
			// 	// Convert blob to file with proper name
			// 	const file = new File([page.blob], page.name, { type: page.blob.type });
			// 	formData.append('pages', file);
			// });

			// formData.append('pages', comicData.pages)
			comicData.pages.forEach((page, index) => {
				// If you already have a File
				if (page instanceof File) {
					formData.append("pages", page);
				} else {
					// If it's a Blob, wrap it in a File so backend receives a filename
					const file = new File([page.blob], page.name, { type: page.blob.type });
					formData.append("pages", file);
				}
			});

			// Make API request
			const response = await dispatch(createFullComic(formData as any));

			console.log(response)

			const result = await response;
			console.log('Comic published successfully:', result);

			// Show success notification
			setShowNotification(true);

		} catch (err) {
			console.error('Error publishing comic:', err);
			setError(err instanceof Error ? err.message : 'Failed to publish comic. Please try again.');
		} finally {
			setIsPublishing(false);
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
									<span className='text-white/60'>Reader Access:</span>
									<span>
										{monetizationData.publishType === 'free' 
											? 'Free to Read' 
											: `Pay-Per-View ($${monetizationData.price?.toFixed(2)})`
										}
									</span>
								</div>

								<div className='flex items-center gap-3'>
									<span className='text-white/60'>Pages:</span>
									<span>{comicData.pages.length} pages (Chapter 1)</span>
								</div>

								<div className='flex items-center gap-3'>
									<span className='text-white/60'>Status:</span>
									<span>Published</span>
								</div>
							</div>

							<p className='mt-3 text-sm text-white/80 tracking-wide leading-relaxed'>
								By clicking <b className='text-orange-400'>&quot;PUBLISH COMIC!&quot;</b>, your comic will
								become live on Quiva and readers can start enjoying it immediately.
							</p>
						</div>
					</div>

					{/* Error Message */}
					{error && (
						<div className='mx-6 mb-4 bg-red-500/20 border border-red-500/50 rounded-lg p-3'>
							<p className='text-red-400 text-sm'>{error}</p>
						</div>
					)}

					{/* Action Buttons */}
					<div className='px-6 pb-6 space-y-3 mt-4'>
						<button
							onClick={handlePublish}
							disabled={isPublishing}
							className='w-full bg-secondary-200/80 hover:bg-secondary-200 text-black font-semibold py-3 rounded-full transition disabled:cursor-not-allowed disabled:opacity-50'
						>
							{isPublishing ? 'Publishing...' : 'Publish Comic'}
						</button>

						<button
							onClick={onclose}
							disabled={isPublishing}
							className='w-full border border-white/20 text-white/70 hover:text-white hover:bg-white/5 py-3 rounded-full transition disabled:cursor-not-allowed disabled:opacity-50'
						>
							Cancel
						</button>
					</div>
				</div>
			)}

			{showNotification && <ComicNotification onclose={() => setShowNotification(true)} />}
		</>
	);
}