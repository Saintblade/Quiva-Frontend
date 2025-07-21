import React from "react";
import TitleText from "../text/TitleText";
import { MainButton } from "../button";

const Footer = () => {
	return (
		<div
			className='min-h-screen grid place-items-center relative'
			style={{
				backgroundImage: "url('/dev_images/hero-bg-img.png')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className='space-y-8 max-w-[850px] text-center pt-20 mx-auto'>
				<TitleText
					title='Build. Play. Earn. Belong'
					className='!text-black-100 !text-6xl'
				/>
				<p className='text-black-100 font-poppins text-lg'>
					Whether you draw, read or just vibe. Quiva is for you..
				</p>

				<div className='flex flex-col lg:flex-row items-center gap-2 pt-20 pb-0 w-3/5 sm:w-fit'>
					<MainButton className='w-full lg:w-fit'>Yap on Kaito</MainButton>
					<MainButton className='bg-transparent w-full lg:w-fit'>
						Explore ComicPad
					</MainButton>
				</div>
			</div>
		</div>
	);
};

export default Footer;
