import { MainButton } from "@/components/button";
import Picture from "@/components/picture/Index";
import TitleText from "@/components/text/TitleText";
import React from "react";
import { comicpadImg } from "../../../../public/dev_images";

const WhyBlockchain = () => {
	return (
		<section className='bg-black-900 min-h-screen py-24'>
			<div className='xl:max-w-screen-xl mx-auto'>
				<div className='space-y-20 text-start'>
					<div className='space-y-12 w-[60%]'>
						<TitleText
							title='Why Blockchain Matters on Quiva'
							className='text-light-100'
						/>
						<div className='flex items-center gap-4'>
							<MainButton className='w-full lg:w-fit !px-8 bg-secondary-200 border border-secondary-200'>
								Own your story
							</MainButton>
							<MainButton className='w-full lg:w-fit !px-12 bg-transparent text-secondary-200 border border-secondary-200'>
								No Secret
							</MainButton>
							<MainButton className='w-full lg:w-fit !px-12 bg-transparent text-secondary-200 border border-secondary-200'>
								Launch
							</MainButton>
						</div>
					</div>
					<div className='bg-black-600 w-full h-[570px] shadow-2xl border-2 border-secondary-200 rounded-[30px] grid grid-cols-10 space-x-8 place-items-center px-10 z-20'>
						<div className='col-span-5 h-[70%] w-full rounded-3xl grid place-items-center'>
							<Picture
								src={comicpadImg}
								alt='comic pad logo'
								loading='eager'
								className={`w-full h-full mx-auto`}
							/>
						</div>
						<div className='col-span-5 grid place-items-center'>
							<div className='space-y-5'>
								<TitleText title='Own Your Story' className='!text-white' />
								<p className='text-white/80 font-poppins text-2xl leading-8 w-4/5'>
									Every comic you read or mint is yours. No middlemen, no loss.
									It’s forever yours.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WhyBlockchain;
