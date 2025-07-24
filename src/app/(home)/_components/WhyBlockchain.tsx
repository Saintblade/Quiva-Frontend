"use client";
import { MainButton } from "@/components/button";
import Picture from "@/components/picture/Index";
import TitleText from "@/components/text/TitleText";
import React from "react";
import {
	comicpadImg,
	contractsImg,
	launchImg,
	lockImg,
} from "../../../../public/dev_images";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

const WhyBlockchain = () => {
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

	// Animation settings
	const SWIPER_SETTINGS = {
		spaceBetween: 30,
		slidesPerView: 1,
		loop: true,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		pagination: {
			clickable: true,
			dynamicBullets: true,
			// renderBullet: (index: number, className: string) => {
			// 	return `<span class="${className} bg-white !w-3 !h-3 !mx-1.5 !opacity-50"></span>`;
			// },
		},
		effect: "fade",
		fadeEffect: {
			crossFade: true,
		},
		speed: 1000,
		modules: [Pagination, Autoplay, EffectFade],
		className: "w-full",
	};

	return (
		<section className='bg-black-900 min-h-screen pt-12 pb-16 lg:py-24'>
			<div className='px-4 lg:px-0 xl:max-w-screen-xl mx-auto'>
				<div className='space-y-20 text-start'>
					<div className='space-y-12 lg:w-[40%]'>
						<TitleText
							title='Why Blockchain Matters on Quiva'
							className='text-light-100'
						/>
						<div className='flex flex-wrap items-center gap-4'>
							<MainButton className='w-fit !px-3 lg:!px-8 bg-secondary-200 border border-secondary-200'>
								Own your story
							</MainButton>
							<MainButton className='w-fit lg:!px-12 bg-transparent text-secondary-200 border border-secondary-200'>
								No Secret
							</MainButton>
							<MainButton className='w-fit lg:!px-12 bg-transparent text-secondary-200 border border-secondary-200'>
								Launch
							</MainButton>
						</div>
					</div>
					<Swiper {...SWIPER_SETTINGS}>
						{SLIDES.map((slide) => (
							<SwiperSlide key={slide.id}>
								<div
									className={`${slide.bgColor} w-full lg:h-[570px] shadow-2xl border-2 ${slide.borderColor} rounded-[30px] flex flex-col-reverse lg:grid grid-cols-10 lg:space-x-8 gap-5 lg:gap-0 place-items-center lg:px-10 z-20 px-2 py-10 lg:py-0 transition-all duration-700`}
								>
									<div className='col-span-4 h-[80%] w-full relative'>
										<Picture
											src={slide.image}
											alt={slide.title}
											loading='eager'
											className='w-full h-[100%] object-cover rounded-3xl transition-transform duration-700 hover:scale-105'
										/>
									</div>
									<div className='col-span-6 grid place-items-center'>
										<div className='space-y-5 transform transition-all duration-700 delay-300'>
											<TitleText
												title={slide.title}
												className='!text-white animate-fadeIn'
											/>
											<p className='text-white/70 font-poppins sm:text-xl lg:text-3xl leading-6 lg:leading-10 w-4/5 animate-fadeIn delay-100'>
												{slide.description}
											</p>
										</div>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
};

export default WhyBlockchain;
