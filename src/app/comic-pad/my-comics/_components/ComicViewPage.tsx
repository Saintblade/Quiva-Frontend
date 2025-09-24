"use client";
import React from "react";
import { soloLevel } from "../../../../../public/dev_images";
import Picture from "@/components/picture/Index";
import { FaChevronLeft } from "react-icons/fa6";

interface ComicViewPageProps {
	id: string;
}

const ComicViewPage = ({ id }: ComicViewPageProps) => {
	// Example mock data – replace with a fetch using the id prop
	const comic = {
		title: "Degen's Dilemmas – Just One More Pump",
		visibility: "Public",
		access: "Pay-Per-Read (5 USDT)",
		nftEdition: "Yes",
		editionSize: 100,
		mintPrice: "5 USDT",
		launch: "Immediately",
		image: soloLevel,
	};

	return (
		<div className='relative px-2 py-2 grid place-items-center'>
			<button
				onClick={() => window.history.back()}
				className='absolute top-4 left-4 bg-black/50 hover:bg-black/70 hover:text-primary-100 text-white border-transparent border hover:border-primary-100 hover:-translate-x-1 p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-10'
				title='Go back'
			>
				<FaChevronLeft />
			</button>
			<div className='w-full max-w-4xl rounded-lg overflow-hidden shadow-lg'>
				<Picture
					src={comic.image}
					alt={comic.title}
					className='w-full h-64 object-cover'
				/>

				<div className='py-6 space-y-3'>
					<h1 className='text-2xl font-semibold'>{comic.title}</h1>
					<p className='text-sm text-white/70 tracking-wider font-mono'>
						Visibility: {comic.visibility}
					</p>
					<p className='text-sm text-white/70 tracking-wider font-mono'>
						Reading Access: {comic.access}
					</p>
					<p className='text-sm text-white/70 tracking-wider font-mono'>
						NFT Edition: {comic.nftEdition} | Edition Size: {comic.editionSize}{" "}
						| Mint Price: {comic.mintPrice}
					</p>
					<p className='text-sm text-white/70 tracking-wider font-mono'>
						Launch: {comic.launch}
					</p>
				</div>

				<div className='grid grid-cols-2 gap-6 p-6 w-[80%] mx-auto'>
					<button className='bg-yellow-600 hover:bg-yellow-700 text-black font-medium px-6 py-3 rounded-full transition-[.4]'>
						Edit
					</button>
					<button className='border-2 border-gray-500 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-full transition-[.4]'>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default ComicViewPage;
