import { MainButton } from "@/components/button";
import TitleText from "@/components/text/TitleText";
import React from "react";
import { comicpadImg } from "../../../../public/dev_images";
import Picture from "@/components/picture/Index";

const WhyQuiva = () => {
	return (
		<section className='bg-black-500 min-h-screen py-24'>
			<div className='xl:max-w-screen-xl mx-auto'>
				<div className='space-y-12 max-w-[850px] text-center mx-auto'>
					<TitleText title='Why Quiva?' className='text-light-100' />
					<Picture
						src={comicpadImg}
						alt='comic pad logo'
						loading='eager'
						className={`w-full h-[45%] mx-auto`}
					/>
					<MainButton className='w-full lg:w-fit !px-12 bg-secondary-200'>
						See It In Action
					</MainButton>
				</div>
			</div>
		</section>
	);
};

export default WhyQuiva;
