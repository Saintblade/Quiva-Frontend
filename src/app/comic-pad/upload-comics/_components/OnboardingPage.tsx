"use client";

import { X } from "lucide-react";
import { useState } from "react";
import ComicPublisher from "./ComicPublisher";

interface OnboardingPageProps {
	onclose: () => void;
}

export default function OnboardingPage({ onclose }: OnboardingPageProps) {
	const [selectedOption, setSelectedOption] = useState("free");
	const [showForm, setShowForm] = useState(false);

	return (
		<>
			{!showForm && (
				<div className=''>
					{/* Header */}
					<div className='text-center mb-8 py-3'>
						<p className='text-white/80 text-sm font-medium tracking-widest uppercase mb-1'>
							PUBLISH YOUR COMIC: Step 3 of 4
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

						<div className='flex items-center gap-3'>
							<label className='flex items-center gap-1 cursor-pointer'>
								<input
									type='radio'
									name='reading-access'
									value='free'
									checked={selectedOption === "free"}
									onChange={() => setSelectedOption("free")}
									className='accent-orange-500'
								/>
								<h4 className='text-white'>Free to read</h4>
							</label>

							<label className='flex items-center gap-1 cursor-pointer'>
								<input
									type='radio'
									name='reading-access'
									value='pay-per-read'
									checked={selectedOption === "pay-per-read"}
									onChange={() => setSelectedOption("pay-per-read")}
									className='accent-orange-500'
								/>
								<h4 className='text-white'>Pay Per Read</h4>
							</label>
						</div>
					</div>

					{/* Action Buttons */}
					<div className='space-y-3'>
						<button
							onClick={() => setShowForm(true)}
							className='w-full bg-secondary-200/80 hover:bg-secondary-200 text-black font-semibold py-3 rounded-full transition disabled:cursor-not-allowed disabled:opacity-50'
						>
							Next
						</button>

						<button className='w-full border border-white/20 text-white/70 hover:text-white hover:bg-white/5 py-3 rounded-full transition'>
							Go back
						</button>
					</div>
				</div>
			)}

			{showForm && <ComicPublisher onclose={() => setShowForm(true)} />}
		</>
	);
}
