import { MainButton } from "@/components/button";
import TitleText from "@/components/text/TitleText";
import React from "react";

const NoToolsNoProblem = () => {
	const tools = [
		{ name: "Pen", icon: "✒️" },
		{ name: "Brush", icon: "🖌️" },
		{ name: "Color", icon: "🎨" },
		{ name: "Fill", icon: "🪣" },
		{ name: "Zoom", icon: "🔍" },
		{ name: "Save", icon: "💾" },
		{ name: "Pin", icon: "📌" },
		{ name: "File", icon: "🗄️" },
		{ name: "Bubble", icon: "💬" },
		{ name: "Shape", icon: "◼️" },
		{ name: "Text", icon: "🔤" },
		{ name: "Undo", icon: "↩️" },
		{ name: "Ruler", icon: "📏" },
		{ name: "Mint", icon: "🤹" },
		{ name: "Asset", icon: "👓" },
		{ name: "Redo", icon: "↪️" },
	];

	return (
		<section className='bg-black-900 min-h-screen pt-12 pb-16 lg:py-24'>
			<div className='xl:max-w-screen-xl mx-auto'>
				<div className='space-y-8 px-5 lg:px-0 max-w-[850px] text-center mx-auto'>
					<TitleText title='No Tools? No Problem.' className='text-light-100' />

					<div className='w-[100%] py-5 lg:py-16 px-2 lg:px-12 bg-linear-black-gradient rounded-3xl border-[25px] border-gray-300 mx-auto'>
						<div className='grid grid-cols-2 lg:grid-cols-5 gap-5 h-full'>
							{tools.map((tool) => (
								<div
									key={tool.name}
									className='bg-black-100 border w-full h-[90px] lg:h-[100px] border-gray-700 rounded-xl flex flex-col items-center justify-center text-white hover:scale-110 transition-[.3]'
								>
									<div className='text-3xl mb-2'>{tool.icon}</div>
									<div className='text-sm font-medium'>{tool.name}</div>
								</div>
							))}
						</div>
					</div>
					<p className='text-light-200 font-poppins text-base lg:text-lg'>
						Whether you&apos;re a pro artist or just getting started, Quiva
						gives you the tools to draw, layout, and publish comics — right in
						your browser.
					</p>

					<MainButton className='w-fit !px-10 bg-secondary-200'>
						Start Creating
					</MainButton>
				</div>
			</div>
		</section>
	);
};

export default NoToolsNoProblem;
