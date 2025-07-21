import TitleText from "@/components/text/TitleText";
import React from "react";

const ExcitingProducts = () => {
	return (
		<section className='bg-black-500 min-h-screen'>
			<div className='space-y-8 max-w-[850px] text-center pt-20 mx-auto'>
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
		</section>
	);
};

export default ExcitingProducts;
