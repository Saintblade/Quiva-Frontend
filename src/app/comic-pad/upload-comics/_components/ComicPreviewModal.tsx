"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { ComicCreationForm } from "./ComicCreationForm";
import Picture from "@/components/picture/Index";

interface ComicPreviewModalProps {
	isOpen: boolean;
	onClose: () => void;
	onNext: () => void;
	onBackToEditor: () => void;
}

export function ComicPreviewModal({
	isOpen,
	onClose,
	onNext,
	onBackToEditor,
}: ComicPreviewModalProps) {
	const [showForm, setShowForm] = useState(false);
	if (!isOpen) return null;

	return (
		<>
			{/* If not showing form, show preview */}
			{!showForm && (
				<div>
					{/* Comic Preview Image */}
					<Picture
						src='https://images.unsplash.com/photo-1620336655052-b57986f5a26a?w=500&auto=format&fit=crop&q=60'
						alt='Comic preview'
						className='w-full h-60 object-cover'
					/>

					{/* Content */}
					<div className='text-center mt-3 mb-5'>
						<p className='text-white/80 text-sm font-medium tracking-widest uppercase mb-2'>
							PUBLISH YOUR COMIC: Step 1 of 4
						</p>
						<h2 className='text-white text-2xl tracking-wider font-semibold mb-3'>
							Give your masterpiece one last look
						</h2>
						<p className='text-white/60 text-sm leading-relaxed'>
							Scroll through your comic page by page. This is exactly how
							readers will experience it. Spot any last-minute tweaks? Head back
							to the editor!
						</p>
					</div>

					{/* Buttons */}
					<div className='space-y-3'>
						<button
							onClick={() => setShowForm(true)}
							className='w-full bg-secondary-200/80 hover:bg-secondary-200 text-black font-semibold py-3 rounded-full transition disabled:cursor-not-allowed disabled:opacity-50'
						>
							Next
						</button>
						<button
							onClick={onBackToEditor}
							className='w-full border border-white/20 text-white/70 hover:text-white hover:bg-white/5 py-3 rounded-full transition'
						>
							Back to Editor
						</button>
					</div>
				</div>
			)}

			{/* If "Continue" clicked, show form instead */}
			{showForm && <ComicCreationForm />}
		</>
	);
}
