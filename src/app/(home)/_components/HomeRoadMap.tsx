import Picture from "@/components/picture/Index";
import TitleText from "@/components/text/TitleText";
import React from "react";
import { footerImg, mapPattern } from "../../../../public/dev_images";

const HomeRoadMap = () => {
	return (
		<section className='bg-black-500 min-h-screen py-12 relative'>
			<div className='absolute inset-0 z-10'>
				<Picture
					src={mapPattern}
					alt='map pattern'
					loading='eager'
					className='w-full h-full object-fill'
				/>
			</div>
			<div className='xl:max-w-screen-xl mx-auto'>
				<TitleText title='Roadmap' className='text-light-100 text-center' />

				<div className='grid grid-cols-2 h-[600px] w-[80%] mx-auto mt-6 gap-6'>
					<Picture
						src={footerImg}
						alt='Background pattern'
						loading='eager'
						className='w-full h-full'
					/>
					<Picture
						src={footerImg}
						alt='Background pattern'
						loading='eager'
						className='w-full h-full'
					/>
					<Picture
						src={footerImg}
						alt='Background pattern'
						loading='eager'
						className='w-full h-full'
					/>
					<Picture
						src={footerImg}
						alt='Background pattern'
						loading='eager'
						className='w-full h-full'
					/>
				</div>
			</div>
		</section>
	);
};

export default HomeRoadMap;
