"use client";
import React, { useState } from "react";
import { progress_1, progress_2, progress_3, progress_4, progress_5, tag_img } from "../../../../public/dev_images";
import Picture from "@/components/picture/Index";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";

import Image from "next/image";

const slideSteps = [
	{
		title: "Choose your Comic Project",
		image: progress_1, // Replace with your image
	},
	{
		title: "Create or Upload your Comic NFTs",
		image: progress_2,
	},
	{
		title: "Set Minting & Rewards Rules",
		image: progress_3,
	},
	{
		title: "Go Live – Let Fans Mint & Read",
		image: progress_4,
	},
	{
		title: "Track, Earn, & Build Your Community",
		image: progress_5,
	},
];

const ProgressWorkPad = () => {
	const [currentStep, setCurrentStep] = useState(0);

	const goPrev = () => {
		if (currentStep > 0) setCurrentStep(currentStep - 1);
	};

	const goNext = () => {
		if (currentStep < slideSteps.length - 1) setCurrentStep(currentStep + 1);
	};

	const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

	return (
		<div className='mt-14 relative'>
			{/* Step Tracker Bar */}
			<div className='flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-5 pt-10 pb-24 relative'>
				{/* Horizontal progress bar for desktop */}
				<div className='hidden md:block absolute top-0 left-0 w-full h-0.5 bg-primary-100/50'></div>
				<div
					className='hidden md:block absolute top-0 left-0 h-0.5 bg-primary-100 transition-all duration-500 ease-in-out'
					style={{
						width: `${((currentStep + 1) / slideSteps.length) * 100}%`,
					}}
				></div>

				{/* Vertical progress line for mobile */}
				{/* Background track (full height) */}
				<div className='md:hidden absolute left-1/2 top-0 h-full w-0.5 bg-primary-100/10 -translate-x-1/2'></div>

				{/* Progress indicator (dynamic height) */}
				<div
					className='md:hidden absolute left-1/2 top-0 w-0.5 bg-primary-100 transition-all duration-500 ease-in-out -translate-x-1/2'
					style={{
						height: `${((currentStep + 1) / slideSteps.length) * 100}%`,
					}}
				></div>

				{/* Step tag image (adjusted for mobile) */}
				<Image
					src={tag_img}
					alt='map pattern'
					loading='eager'
					className='w-[60px] md:w-[85px] absolute transition-all lg:hidden duration-500 ease-in-out left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 -top-6 md:-top-7'
					style={{
						top: `calc(${currentStep * 20}% + 1%)`,
						// Mobile centers via class, desktop uses calculated `left`
						...(isMobile ? { left: `calc(${currentStep * 20}% + 15%)` } : {}),
					}}
				/>

				{/* Step tag image (adjusted for desktop) */}
				<Image
					src={tag_img}
					alt='map pattern'
					loading='eager'
					className='w-[60px] md:w-[85px] absolute hidden lg:block transition-all duration-500 ease-in-out left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 -top-6 md:-top-7'
					style={{
						top: ``,
						...(isMobile ? {} : { left: `calc(${currentStep * 20}% + 10%)` }),
					}}
				/>

				{/* Step items */}
				{slideSteps.map((step, index) => {
					const isActive = index === currentStep;
					return (
						<div
							key={index}
							className='flex flex-col mx-auto lg:mx-0 justify-center md:justify-start items-center lg:items-start md:w-1/5 space-y-1 md:space-y-3 md:pl-0 relative'
						>
							<div
								className={`text-sm ${
									isActive ? "text-white/80" : "text-white/25"
								}`}
							>
								Step {index + 1}
							</div>
							<div
								className={`text-sm sm:text-base md:text-lg font-medium leading-6 md:leading-7 w-[90%] text-center lg:text-start ${
									isActive ? "text-white" : "text-white/25"
								}`}
							>
								{step.title}
							</div>
						</div>
					);
				})}
			</div>

			{/* Slide Section */}
			<div className='relative w-[70%] hidden lg:flex flex-col justify-center mx-auto items-center py-8 text-white'>
				<Picture
					src={slideSteps[currentStep].image}
					alt={slideSteps[currentStep].title}
					className='w-full h-auto object-cover'
				/>

				<div className='flex gap-4 items-center mt-14 justify-center'>
					<button
						onClick={goPrev}
						disabled={currentStep === 0}
						className='w-12 h-8 flex items-center justify-center rounded-full border-2 border-white/50 hover:border-white disabled:opacity-30'
					>
						<HiOutlineArrowLeft />
					</button>
					<button
						onClick={goNext}
						disabled={currentStep === slideSteps.length - 1}
						className='w-12 h-8 flex items-center justify-center rounded-full border-2 border-white/50 hover:border-white disabled:opacity-30'
					>
						<HiOutlineArrowRight />
					</button>
				</div>
			</div>
			<Picture
				src={tag_img}
				alt='map pattern'
				loading='eager'
				className='w-[85px] absolute bottom-0 right-0 hidden lg:block'
			/>
		</div>
	);
};

export default ProgressWorkPad;
