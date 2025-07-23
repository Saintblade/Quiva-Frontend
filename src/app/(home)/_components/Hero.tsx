"use client";
import { MainButton, MainButton2 } from "@/components/button";
import React from "react";
import {
	heroBgImg,
	heroImage1,
	heroImage2,
	hm_bg_2,
	mascotThree2,
	mascotThreeQuarter,
} from "../../../../public/dev_images";
import { motion } from "framer-motion";
import Picture from "@/components/picture/Index";

const Hero = () => {
	return (
		<section className='min-h-screen grid place-items-center relative bg-black-100'>
			<div className='absolute inset-0'>
				<div className='relative w-full h-full'>
					<Picture
						src={hm_bg_2}
						alt='home bg'
						loading='eager'
						className='w-full h-full object-fill grayscale'
					/>
					<div className='absolute inset-0 bg-black-100 opacity-90'></div>
				</div>
			</div>

			<div className='w-full h-full lg:w-[75%] mx-auto flex flex-col items-center text-center lg:text-start lg:h-[70%] lg:grid grid-cols-10 z-10'>
				<div className='col-span-6 flex items-start flex-col space-y-5 lg:space-y-8 justify-center w-[95%] lg:w-full pt-32 lg:pt-0'>
					<h3 className='font-recursive text-3xl sm:text-4xl lg:text-6xl text-white font-semibold tracking-wider'>
						Comics. Reimagined.
					</h3>

					<p className='sm:text-lg lg:text-xl text-white/80 max-w-lg leading-8'>
						Interactive. Tokenized. Powered by Blockchain Technology.
					</p>

					<div className='hidden lg:flex items-center gap-2'>
						<MainButton>Yap on Kaito</MainButton>
						<MainButton2 className='bg-transparent'>
							Explore ComicPad
						</MainButton2>
					</div>
				</div>
				<div className='col-span-4 lg:grid place-items-center'>
					<div className='w-[280px] sm:w-[320px] md:w-[360px] lg:w-[404.04px] h-[300px] relative mx-auto flex justify-center'>
						{/* Back Image with Slide & Fade Animation */}
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: false, amount: 0.4 }}
							transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
							className='absolute top-4 lg:-top-12 w-[80%] xs:w-[300px] sm:w-[320px] md:w-[360px] lg:w-[400px]'
						>
							<Picture src={heroImage2} alt='Quiva logo' loading='eager' />
						</motion.div>

						{/* Front Image with Scale & Fade Animation */}
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: false, amount: 0.4 }}
							transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
							className='absolute top-4 lg:-top-12 w-[70%] xs:w-[280px] sm:w-[284px] md:w-[320px] lg:w-[356px]'
						>
							<Picture src={heroImage1} alt='Quiva logo' loading='eager' />
						</motion.div>
					</div>

					{/* Buttons Animation */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: false, amount: 0.4 }}
						transition={{ duration: 1, delay: 0.8 }}
						className='flex flex-col lg:hidden items-center gap-3 lg:gap-2 lg:pt-20 pb-0 w-3/5 sm:w-fit'
					>
						<MainButton className='w-full lg:w-fit'>Yap on Kaito</MainButton>
						<MainButton className='bg-transparent w-full lg:w-fit !border-white !border-[3px] text-white'>
							Explore ComicPad
						</MainButton>
					</motion.div>

					{/* Mascot Image Animation */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: false, amount: 0.4 }}
						transition={{ duration: 1, delay: 1.1 }}
						className='lg:hidden w-[650px] sm:w-[762px] object-cover bottom-0 -mt-10'
					>
						<Picture
							src={mascotThree2}
							alt='Mascot three quarter'
							loading='eager'
						/>
					</motion.div>
				</div>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: false, amount: 0.4 }}
				transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
				className='hidden lg:block w-[805px] absolute object-cover bottom-0'
			>
				<Picture
					src={mascotThreeQuarter}
					alt='Mascot three quarter'
					loading='eager'
				/>
			</motion.div>
		</section>
	);
};

export default Hero;
