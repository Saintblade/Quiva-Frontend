import React from "react";
import { avatarImg, theNorthFace } from "../../../../public/dev_images";
import Picture from "@/components/picture/Index";
import { StaticImageData } from "next/image";

interface RecentCardProps {
	title: string;
	imageSrc: string | StaticImageData;
}

const RecentCard = ({ title, imageSrc }: RecentCardProps) => {
	return (
		<div className='w-[277px]'>
			<Picture
				src={imageSrc}
				className='w-full border h-64 object-fill rounded-b-3xl rounded-l-3xl'
				alt='recent'
			/>
			<h5 className={`text-white text-sm lg:text-2xl px-4 font-medium mt-1`}>
				{title}
			</h5>
		</div>
	);
};

export default RecentCard;
