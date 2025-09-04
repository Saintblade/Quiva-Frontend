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
	logoClassName?: string;
	className?: string;
	showText?: boolean;
}

export const QuivaLogo = ({
	logoClassName,
	className,
	showText,
}: QuivaLogoProps) => {
	return (
		<Link href='/' className=''>
			<div
				className={`w-fit text-base lg:text-sm flex items-center gap-2 font-recursive ${className}`}
			>
				<Picture
					src={tonmicIcon}
					alt='Quiva logo'
					loading='eager'
					className={`w-10 lg:w-8 ${logoClassName}`}
				/>
				{showText && (
					<span className={`font-semibold text-black-200`}>Quiva</span>
				)}
			</div>
		</Link>
	);
};
