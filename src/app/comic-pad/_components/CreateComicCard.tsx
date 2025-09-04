import Picture from "@/components/picture/Index";
import React from "react";
import { avatarImg } from "../../../../public/dev_images";
import { StaticImageData } from "next/image";

interface CreateComicCardProps {
	imageSrc?: string | StaticImageData;
	title?: string;
	description?: string;
	className?: string;
	imageClassName?: string;
	titleClassName?: string;
	descriptionClassName?: string;
	onClick?: () => void;
}

const CreateComicCard = ({
	imageSrc = avatarImg,
	title = "Create New Comic",
	description = "Open your creative tools and begin from scratch.",
	className = "",
	imageClassName = "size-12 object-contain",
	titleClassName = "text-white text-sm lg:text-xl font-medium",
	descriptionClassName = "text-white/60 text-xs lg:text-base leading-8",
	onClick,
}: CreateComicCardProps) => {
	return (
		<div
			className={`w-64 border dashed-border-strong-4 px-7 py-8 flex flex-col items-center text-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-200 ${className}`}
			onClick={onClick}
		>
			<Picture src={imageSrc} className={imageClassName} alt={title} />
			<h5 className={titleClassName}>{title}</h5>
			<p className={descriptionClassName}>{description}</p>
		</div>
	);
};

export default CreateComicCard;
