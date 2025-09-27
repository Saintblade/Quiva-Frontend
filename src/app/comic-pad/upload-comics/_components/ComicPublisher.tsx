"use client";

import { useState } from "react";
import Image from "next/image";
import { Router, X } from "lucide-react";
import { ComicNotification } from "./ComicNotification";
import { useRouter } from "next/navigation";
import Picture from "@/components/picture/Index";

interface ComicPublisherProps {
	onclose: () => void;
}

export default function ComicPublisher({ onclose }: ComicPublisherProps) {
	const [showForm, setShowForm] = useState(false);

	const router = useRouter();

	const handlePublish = () => {
		console.log("Publishing comic...");
		// router.push("/comic-pad/my-comics")
	};

	return (
		<>
			{!showForm && (
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
								src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ni0qWkVruUmu4S5lnGMYklXHhVPLqO.png'
								alt='Comic preview'
								className='w-full h-48 object-cover'
							/>
						</div>

						{/* Comic Details */}
						<div className='mb-6 px-4'>
							<h3 className='text-lg font-semibold mb-3 text-white/90 tracking-wider'>
								Degen&apos;s Dilemmas – Just One More Pump
							</h3>

							<div className='space-y-2 text-sm text-white/80 tracking-wide'>
								<div className='flex items-center gap-3'>
									<span className=''>Visibility:</span>
									<span>Public</span>
								</div>

								<div className='flex items-center gap-3'>
									<span className=''>Reader Access:</span>
									<span>Pay-Per-View (USD)</span>
								</div>

								<div className='flex items-center gap-3'>
									<span className=''>NFT Edition:</span>
									<span>Yes · Edition Size: 100 · Mint Price: 0.05 ETH</span>
								</div>

								<div className='flex items-center gap-3'>
									<span className=''>Launch:</span>
									<span>Immediately</span>
								</div>
							</div>

							<p className='mt-3 text-sm text-white/80 tracking-wide leading-relaxed'>
								By clicking "<b>PUBLISH COMIC!</b>", your comic will become live
								on Quiva and cannot be easily undone.
							</p>
						</div>
					</div>

					{/* Action Buttons */}
					<div className='px-6 pb-6 space-y-3 mt-4'>
						<button
							onClick={() => setShowForm(true)}
							className='w-full bg-secondary-200/80 hover:bg-secondary-200 text-black font-semibold py-3 rounded-full transition disabled:cursor-not-allowed disabled:opacity-50'
						>
							Publish Comic
						</button>

						<button
							onClick={onclose}
							className='w-full border border-white/20 text-white/70 hover:text-white hover:bg-white/5 py-3 rounded-full transition'
						>
							Cancel
						</button>
					</div>
				</div>
			)}

			{showForm && <ComicNotification onclose={() => setShowForm(true)} />}
		</>
	);
}
