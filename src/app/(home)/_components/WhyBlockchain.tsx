"use client";
import { MainButton } from "@/components/button";
import Picture from "@/components/picture/Index";
import TitleText from "@/components/text/TitleText";
import React, { useRef } from "react";
import {
	comicpadImg,
	contractsImg,
	launchImg,
	lockImg,
} from "../../../../public/dev_images";

const WhyBlockchain = () => {
	// Create refs for each section
	const ownStoryRef = useRef<HTMLDivElement>(null);
	const noSecretRef = useRef<HTMLDivElement>(null);
	const launchRef = useRef<HTMLDivElement>(null);

	const BLOCKCHAIN_SECTIONS = [
		{
			id: "own-story",
			title: "Own Your Story",
			description:
				"Every comic you read or mint is yours. No middlemen, no loss. It's forever yours.",
			image: lockImg,
			ref: useRef<HTMLDivElement>(null),
			bgColor: "bg-black-600",
			borderColor: "border-secondary-200",
		},
		{
			id: "no-secret",
			title: "No Secrets. Just Smart Contracts.",
			description:
				"All rights, rewards, and royalties are coded and public. What you see is what you get.",
			image: contractsImg,
			ref: useRef<HTMLDivElement>(null),
			bgColor: "bg-black-600",
			borderColor: "border-secondary-200",
		},
		{
			id: "launch",
			title: "Launch.",
			description:
				"Whether you're in Lagos or Tokyo, Quiva lets you create, publish, and earn globally.",
			image: launchImg,
			ref: useRef<HTMLDivElement>(null),
			bgColor: "bg-black-600",
			borderColor: "border-secondary-200",
		},
	];

	// Scroll function
	const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
		ref.current?.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "center",
		});
	};

	// Slide data constants
	const SLIDES = [
		{
			id: 1,
			title: "No Secrets. Just Smart Contracts.",
			description:
				"All rights, rewards, and royalties are coded and public. What you see is what you get.",
			image: contractsImg, // Replace with your image import
			bgColor: "bg-black-600",
			borderColor: "border-secondary-200",
		},
		{
			id: 2,
			title: "Launch from Anywhere.",
			description:
				"Whether you’re in Lagos or Tokyo, Quiva lets you create, publish, and earn globally.",
			image: launchImg, // Replace with your image import
			bgColor: "bg-black-600",
			borderColor: "border-secondary-200",
		},
		{
			id: 2,
			title: "Own Your Story",
			description:
				"Every comic you read or mint is yours. No middlemen, no loss. It's forever yours.",
			image: lockImg,
			bgColor: "bg-black-600",
			borderColor: "border-secondary-200",
		},
	];

	return (
		<section className='bg-black-900 min-h-screen pt-12 pb-16 lg:py-24'>
			<div className='px-4 lg:px-0 xl:max-w-screen-xl mx-auto'>
				<div className='space-y-7 lg:space-y-20 text-start'>
					<div className='space-y-6 lg:space-y-12 lg:w-[40%]'>
						<TitleText
							title='Why Blockchain Matters on Quiva'
							className='text-light-100'
						/>
						<div className='flex flex-wrap items-center gap-4'>
							{BLOCKCHAIN_SECTIONS.map((section) => (
								<MainButton
									key={section.id}
									onClick={() => scrollToSection(section.ref)}
									className={`w-fit ${
										section.id === "own-story" ? "!px-3 lg:!px-8" : "lg:!px-12"
									} ${
										section.id === "own-story"
											? "bg-secondary-200 border-secondary-200"
											: "bg-transparent text-secondary-200 border-secondary-200"
									} border`}
								>
									{section.title.split(".")[0]}
								</MainButton>
							))}
						</div>
					</div>

					{/* Horizontal Scrolling Container */}
					<div className='relative'>
						<div className='flex overflow-x-auto no-scrollbar pb-6 gap-6 snap-x snap-mandatory'>
							{BLOCKCHAIN_SECTIONS.map((section) => (
								<div
									key={section.id}
									ref={section.ref}
									className='flex-shrink-0 w-full max-w-[1200px] snap-center'
								>
									<div
										className={`${section.bgColor} h-fit lg:h-[570px] shadow-2xl border-2 ${section.borderColor} rounded-[30px] flex flex-col-reverse lg:grid grid-cols-10 lg:space-x-8 gap-5 lg:gap-0 place-items-center lg:px-10 z-20 px-2 py-10 lg:py-0`}
									>
										<div className='col-span-4 h-[80%] w-full relative'>
											<Picture
												src={section.image}
												alt={section.title}
												className='w-full h-[100%] object-cover rounded-3xl'
											/>
										</div>
										<div className='col-span-6 grid place-items-center'>
											<div className='space-y-5'>
												<TitleText
													title={section.title}
													className='!text-white'
												/>
												<p className='text-white/70 font-poppins sm:text-xl lg:text-3xl leading-6 lg:leading-10 w-4/5'>
													{section.description}
												</p>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Scroll indicator */}
						<div className='hidden md:block absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-black to-transparent pointer-events-none' />
					</div>
				</div>
			</div>
		</section>
	);
};

export default WhyBlockchain;
