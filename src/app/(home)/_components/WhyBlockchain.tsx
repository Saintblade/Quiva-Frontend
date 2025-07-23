import { MainButton } from "@/components/button";
import Picture from "@/components/picture/Index";
import TitleText from "@/components/text/TitleText";
import React from "react";
import { comicpadImg, lockImg } from "../../../../public/dev_images";

const WhyBlockchain = () => {
	return (
		<section className='bg-black-900 min-h-screen pt-12 pb-16 lg:py-24'>
			<div className='px-4 lg:px-0 xl:max-w-screen-xl mx-auto'>
				<div className='space-y-20 text-start'>
					<div className='space-y-12 lg:w-[60%]'>
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
					<div className='bg-black-600 w-full lg:h-[570px] shadow-2xl border-2 border-secondary-200 rounded-[30px] flex flex-col-reverse lg:grid grid-cols-10 lg:space-x-8 gap-5 lg:gap-0 place-items-center lg:px-10 z-20 px-2 py-10 lg:py-0'>
						<div className='col-span-4 h-[80%] w-full relative'>
							<Picture
								src={lockImg}
								alt='lock logo'
								loading='eager'
								className={`w-full h-[100%] object-cover rounded-3xl`}
							/>
						</div>
						<div className='col-span-6 grid place-items-center'>
							<div className='space-y-5'>
								<TitleText title='Own Your Story' className='!text-white' />
								<p className='text-white/70 font-poppins sm:text-xl lg:text-3xl leading-6 lg:leading-10 w-4/5'>
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
