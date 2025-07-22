import Picture from "@/components/picture/Index";
import TitleText from "@/components/text/TitleText";
import React from "react";
import { comicpadImg, footerImg } from "../../../../public/dev_images";

const ExcitingProducts = () => {
	return (
		<section className='bg-black-500 min-h-screen pb-24'>
			<div className='space-y-8 max-w-[850px] text-center pt-32 mx-auto'>
				<TitleText
					title='Explore Our Exciting Product Offerings'
					className='text-light-100'
				/>
				<p className='text-light-200 font-poppins'>
					Dive into a world where comics meet technology. Our products are
					designed to elevate your comic experience through interactivity and
					creativity.
				</p>
			</div>

			<div className='max-w-screen-xl mt-12 grid place-items-center mx-auto'>
				<div className='flex justify-center items-end w-[1100px] mx-auto'>
					<div className='bg-black-600 w-[90%] h-[570px] shadow-2xl border-2 border-secondary-200 rounded-[30px] grid grid-cols-10 space-x-8 place-items-center px-10 z-20'>
						<div className='col-span-5 bg-linear-blue-gradient h-[70%] w-full rounded-3xl grid place-items-center'>
							<Picture
								src={comicpadImg}
								alt='comic pad logo'
								loading='eager'
								className={`w-[85%] h-[65%] mx-auto`}
							/>
						</div>
						<div className='col-span-5 grid place-items-center'>
							<div className='space-y-5'>
								<TitleText title='ComicPad' className='!text-white' />
								<p className='text-white/80 font-poppins text-lg leading-8 w-4/5'>
									The heart of Quiva. The first Web3 launchpad built for anime,
									manga & meme artists.
								</p>
							</div>
						</div>
					</div>
					<div className='bg-black-600 shadow-2xl w-[10%] h-[560px] rounded-r-[30px] px-10 -ml-5 z-10 flex items-center justify-center'>
						<div className='transform rotate-90 origin-center'>
							<p className='text-white text-4xl font-bold tracking-wide whitespace-nowrap'>
								Jumble Jester
							</p>
						</div>
					</div>
					<div className='bg-black-800 shadow-2xl w-[12%] h-[558px] rounded-r-[30px] px-10 -ml-5 flex items-center justify-center'>
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
