import Link from "next/link";
import Picture from "../picture/Index";
import { tonmicIcon } from "../../../public/dev_images";

export const isValidImage = (url: string): Promise<boolean> => {
	return new Promise((resolve) => {
		const img = new Image();
		img.src = url;
		img.onload = () => resolve(true);
		img.onerror = () => resolve(false);
	});
};

interface QuivaLogoProps {
	className?: string;
	showText?: boolean;
}

export const QuivaLogo = ({ className, showText }: QuivaLogoProps) => {
	return (
		<Link href='/' className=''>
			<div
				className={`w-fit text-lg flex items-center gap-2 lgs:items-end font-recursive`}
			>
				<Picture
					src={tonmicIcon}
					alt='Quiva logo'
					loading='eager'
					className={`w-10 lg:w-8 ${className}`}
				/>
				{showText && (
					<span className='font-semibold text-base lg:text-sm text-black-200'>
						Quiva
					</span>
				)}
			</div>
		</Link>
	);
};
