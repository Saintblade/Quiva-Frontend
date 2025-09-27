"use client";
import React, { useEffect, useState } from "react";
import { X, Upload, Pause, Folder } from "lucide-react";
import { ComicUploadModal } from "./ComicUploadModal";
import { ComicPreviewModal } from "./ComicPreviewModal";
import Picture from "@/components/picture/Index";
import { UploadImage } from "../../../../../public/dev_images";

interface UploadModalProps {
	onClose: () => void;
}

const UploadModal = ({ onClose }: UploadModalProps) => {
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [step, setStep] = useState<"upload" | "progress" | "preview">("upload");
	const [isLoading, setIsLoading] = useState(false);

	const [progress, setProgress] = useState(65); // starting at 65 for demo
	const [timeLeft, setTimeLeft] = useState(30); // seconds remaining
	const [paused, setPaused] = useState(false);

	useEffect(() => {
		if (!paused && progress < 100) {
			const interval = setInterval(() => {
				setProgress((p) => Math.min(p + 1, 100));
				setTimeLeft((t) => Math.max(t - 1, 0));
			}, 500);
			return () => clearInterval(interval);
		}
	}, [paused, progress]);

	useEffect(() => {
		if (progress === 100) {
			setIsLoading(false); // switch from progress bar to completed view
		}
	}, [progress]);

	// File selection
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const selected = e.target.files[0];
			setFile(selected);
			if (selected.type.startsWith("image/")) {
				setPreview(URL.createObjectURL(selected));
			}
		}
	};

	const handleStepClick = () => {
		if (!isLoading && progress === 100) {
			setStep("preview");
		} else {
			setIsLoading(true);
		}
	};

	return (
		<div className='p-6'>
			{/* Step 1: Upload */}
			{step === "upload" && (
				<div className=''>
					<div className='text-white space-y-1 mb-6'>
						<h2 className='text-lg font-semibold'>Comic Upload</h2>
						<p className='tracking-wider text-white/70 text-xs'>
							Add your documents here, and you can upload up to 5 files max
						</p>
					</div>

					<div className='border-2 border-dashed border-primary-100/40 rounded-xl p-6 flex w-full flex-col items-center justify-center text-center space-y-3'>
						{!preview ? (
							<>
								{/* Orange folder icon */}
								<Picture
									src={UploadImage}
									alt='Preview'
									className='size-10 object-contain'
								/>

								{/* Drag text */}
								<p className='text-white/80 font-medium tracking-wider'>
									Drag your file(s) to start uploading
								</p>

								{/* OR separator */}
								<div className='flex items-center my-2 w-48'>
									<div className='flex-[.6] border-t-2 border-white/60'></div>
									<span className='mx-3 text-white/80 text-sm'>OR</span>
									<div className='flex-[.6] border-t-2 border-white/60'></div>
								</div>

								{/* Browse button */}
								<label className='inline-block border border-secondary-200 text-white/90 hover:bg-secondary-200 hover:text-black-100 rounded-full px-5 py-1.5 cursor-pointer font-semibold transition-[.3]'>
									Browse files
									<input
										type='file'
										accept='.jpg,.png,.svg,.zip'
										className='hidden'
										onChange={handleFileChange}
									/>
								</label>
							</>
						) : (
							<Picture
								src={preview}
								alt='Preview'
								className='rounded-lg max-h-48 mx-auto object-contain'
							/>
						)}
					</div>

					<h4 className='text-white/50 text-xs my-1 tracking-wider'>
						Only support .jpg, .png and .svg and zip files
					</h4>
					{isLoading && (
						<>
							<div className='bg-black rounded-xl border border-white/20 px-3 py-2 w-full max-w-2xl'>
								{/* Top row with text and icons */}
								<div className='flex items-center justify-between mb-3'>
									<div>
										<p className='text-white text-sm font-semibold'>
											Uploading...
										</p>
										<p className='text-white/80 text-sm'>
											{progress}% • {timeLeft} seconds remaining
										</p>
									</div>

									<div className='flex items-center gap-4'>
										<button
											onClick={() => setPaused(!paused)}
											className='p-1 rounded-full hover:bg-white/10 text-white'
										>
											<Pause size={20} />
										</button>
										<button
											onClick={onClose}
											className='p-1 rounded-full hover:bg-white/10 text-red-500'
										>
											<X size={20} />
										</button>
									</div>
								</div>

								{/* Progress bar */}
								<div className='h-3 rounded-full bg-white/10 overflow-hidden'>
									<div
										className='h-3 bg-orange-400 transition-all duration-300'
										style={{ width: `${progress}%` }}
									/>
								</div>
							</div>
						</>
					)}

					{!isLoading && progress === 100 && (
						<div className='bg-black rounded-xl border border-white/20 p-5 w-full max-w-2xl flex items-center justify-between'>
							{/* Left side: file info */}
							<div className='flex items-center gap-3'>
								{/* Yellow folder with small blue ZIP badge */}
								<div className='relative'>
									<div className='bg-yellow-400 rounded p-2'>
										<Folder size={28} className='text-black' />
									</div>
									<span className='absolute -bottom-1 -right-1 bg-blue-500 text-[10px] text-white px-1 py-[1px] rounded'>
										ZIP
									</span>
								</div>

								<div>
									<p className='text-white font-medium'>
										theprojekts-design-tokens.zip
									</p>
									<p className='text-white/60 text-sm'>5.3 MB</p>
								</div>
							</div>

							{/* Close button */}
							<button
								onClick={onClose}
								className='p-1 rounded-full hover:bg-white/10 text-white'
							>
								<X size={20} />
							</button>
						</div>
					)}

					{/* Buttons */}
					<div className='mt-3 flex flex-col gap-3'>
						<button
							disabled={!file}
							onClick={handleStepClick}
							className='w-full bg-secondary-200/80 hover:bg-secondary-200 text-black font-semibold py-3 rounded-full transition disabled:cursor-not-allowed disabled:opacity-50'
						>
							Next
						</button>
						<button
							onClick={onClose}
							className='w-full border border-white/20 text-white/70 hover:text-white hover:bg-white/5 py-3 rounded-full transition'
						>
							Cancel
						</button>
					</div>
				</div>
			)}

			{/* Step 3: Preview */}
			{step === "preview" && (
				<ComicPreviewModal
					isOpen={true}
					onClose={onClose}
					onNext={() => alert("✅ Published!")} // handle publish
					onBackToEditor={() => setStep("upload")}
				/>
			)}
		</div>
	);
};

export default UploadModal;
