import TitleText from "@/components/text/TitleText";
import React from "react";

const HowComicPadWorks = () => {
	return (
		<section className='bg-black-500 min-h-screen pt-16 pb-24'>
			<div className='xl:max-w-screen-xl mx-auto'>
				<div className='space-y-8 max-w-[850px]'>
					<TitleText title='How ComicPad Works' className='text-light-100' />
					<p className='text-light-200 font-poppins text-lg'>
						Unleash your creativity with our simple process. From choosing your
						comic to tracking your earnings, it's all streamlined for you.
					</p>
				</div>
			</div>
		</section>
	);
};

export default HowComicPadWorks;
