import Picture from "@/components/picture/Index";
import TitleText from "@/components/text/TitleText";
import React from "react";
import { comicpadImg, footerImg } from "../../../../public/dev_images";

const ExcitingProducts = () => {
	return (
		<section className='bg-black-500 min-h-screen pb-24'>
			<div className='space-y-6 lg:space-y-8 w-[80%] sm:max-w-[850px] text-center pt-16 lg:pt-32 mx-auto'>
				<TitleText
					title='Explore Our Exciting Product Offerings'
					className='text-light-100 w-[90%] sm:w-full text-center mx-auto sm:mx-0 tracking-wide lg:tracking-normal'
				/>
				<p className='text-light-200 font-poppins text-base lg:text-lg'>
					Dive into a world where comics meet technology. Our products are
					designed to elevate your comic experience through interactivity and
					creativity.
				</p>
			</div>
			<div className='px-2 lg:px-0 lg:max-w-screen-xl mt-12 grid place-items-center mx-auto'>
				<div className='flex flex-col-reverse lg:flex-row justify-center items-center lg:items-end lg:w-[1100px] mx-auto'>
					<div className='bg-black-600 w-[95%] lg:w-[90%] lg:h-[570px] shadow-2xl lg:border-2 border-secondary-200 rounded-[30px] flex flex-col-reverse lg:grid grid-cols-10 gap-12 lg:gap-0 lg:space-x-8 place-items-center px-5 lg:px-10 z-20 py-12 lg:py-0'>
						<div className='lg:hidden text-start space-y-4 w-full'>
							<p className='text-white text-lg font-bold tracking-wide whitespace-nowrap'>
								Jumble Jester
							</p>

							<p className='text-white text-lg font-bold tracking-wide whitespace-nowrap'>
								Scrabble Arena
							</p>
						</div>

						<div className='col-span-5 bg-linear-blue-gradient h-[50%] w-[95%] lg:h-[70%] lg:w-full rounded-md lg:rounded-3xl flex flex-col items-end lg:items-center justify-end lg:justify-center gap-8 lg:gap-0 lg:grid place-items-center'>
							<TitleText
								title='ComicPad'
								className='text-light-100 w-[90%] lg:hidden sm:w-full text-center sm:text-start mx-auto sm:mx-0 tracking-wide lg:tracking-normal'
							/>
							<Picture
								src={comicpadImg}
								alt='comic pad logo'
								loading='eager'
								className={`w-[85%] lg:h-[65%] mx-auto`}
							/>
						</div>

						<div className='col-span-5 lg:grid place-items-center'>
							<div className='space-y-3 lg:space-y-5'>
								<TitleText title='ComicPad' className='!text-white' />
								<p className='text-white/80 font-poppins text-base lg:text-lg leading-8 lg:w-4/5'>
									The heart of Quiva. The first Web3 launchpad built for anime,
									manga & meme artists.
								</p>
							</div>
						</div>
					</div>
					<div className='bg-black-600 shadow-2xl w-[10%] h-[560px] rounded-r-[30px] px-10 -ml-5 z-10 hidden lg:flex items-center justify-center'>
						<div className='transform rotate-90 origin-center'>
							<p className='text-white text-4xl font-bold tracking-wide whitespace-nowrap'>
								Jumble Jester
							</p>
						</div>
					</div>
					<div className='bg-black-800 shadow-2xl w-[12%] h-[558px] rounded-r-[30px] px-10 -ml-5 hidden lg:flex items-center justify-center'>
						<div className='transform rotate-90 origin-center'>
							<p className='text-white text-4xl font-bold tracking-wide whitespace-nowrap'>
								Scrabble Arena
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ExcitingProducts;
