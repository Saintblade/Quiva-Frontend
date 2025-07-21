import { MainButton } from "@/components/button";
import React from "react";
import {
	heroImage1,
	heroImage2,
	mascotThree2,
	mascotThreeQuarter,
} from "../../../../public/dev_images";
import Picture from "@/components/picture/Index";

const Hero = () => {
	return (
		<section
			className='min-h-screen grid place-items-center relative'
			style={{
				backgroundImage: "url('/dev_images/hero-bg-img.png')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className='w-full h-full lg:w-[75%] mx-auto flex flex-col items-center text-center lg:text-start lg:h-[70%] lg:grid grid-cols-10 z-10'>
				<div className='col-span-6 flex items-start flex-col space-y-5 lg:space-y-8 justify-center w-[95%] lg:w-full pt-32 lg:pt-0'>
					<h3 className='font-recursive text-4xl lg:text-6xl text-black-100 font-semibold tracking-wider'>
						Comics. Reimagined.
					</h3>

					<p className='text-xl text-black-100 max-w-lg leading-8'>
						Interactive. Tokenized. Powered by Blockchain Technology.
					</p>

					<div className='hidden lg:flex items-center gap-2'>
						<MainButton>Yap on Kaito</MainButton>
						<MainButton className='bg-transparent'>Explore ComicPad</MainButton>
					</div>
				</div>
				<div className='col-span-4 lg:grid place-items-center'>
					<div className='w-[280px] sm:w-[320px] md:w-[360px] lg:w-[404.04px] h-[300px] relative mx-auto'>
						<Picture
							src={heroImage2}
							alt='Quiva logo'
							loading='eager'
							className={`w-[100%] xs:w-[320px] sm:w-[320px] md:w-[360px] lg:w-[400px] absolute top-4 lg:-top-12`}
						/>
						<Picture
							src={heroImage1}
							alt='Quiva logo'
							loading='eager'
							className={`w-[90%] xs:w-[300px] sm:w-[284px] md:w-[320px] lg:w-[356px] absolute top-4 lg:-top-12`}
						/>
					</div>

					<div className='flex flex-col lg:hidden items-center gap-2 pt-20 pb-0 w-3/5 sm:w-fit'>
						<MainButton className='w-full lg:w-fit'>Yap on Kaito</MainButton>
						<MainButton className='bg-transparent w-full lg:w-fit'>
							Explore ComicPad
						</MainButton>
					</div>

					<Picture
						src={mascotThree2}
						alt='Mascot three quarter'
						loading='eager'
						className={`lg:hidden w-[762px] object-cover bottom-0 -mt-10`}
					/>
				</div>
			</div>

			<Picture
				src={mascotThreeQuarter}
				alt='Mascot three quarter'
				loading='eager'
				className={`hidden lg:block w-[905px] absolute object-cover bottom-0`}
			/>
		</section>
	);
};

export default Hero;
