import React from "react";
import { FaBell, FaChevronDown, FaUserCircle } from "react-icons/fa";
import { BiSolidBell } from "react-icons/bi";
import Picture from "@/components/picture/Index";
import { avatarImg } from "../../../../public/dev_images";
import { QuivaLogo } from "@/components/utils/function";

const ComicPadHeader = () => {
	return (
		<header
			className={`fixed max-w-[1700px] flex justify-between items-center lg:block px-2 w-full lg:w-[83%] min-h-20 lg:py-3 top-0 border-b dashed-border-strong drop-shadow-sm z-50 bg-black-200`}
		>
			{/* Desktop */}
			<div className='hidden lg:grid grid-cols-3'>
				<div className=''></div>

				<div className='flex flex-col items-center justify-center'>
					<h4 className='text-white text-sm lg:text-base xl:text-xl font-medium tracking-wider'>
						Welcome Mary!
					</h4>
					<p className='text-white/60 text-xs xl:text-sm'>
						Let&apos;s build something epic.
					</p>
				</div>

				<div className='flex items-center justify-end gap-2 pr-4 lg:pr-6'>
					<button className='relative p-2 text-white/70 hover:text-white transition-colors'>
						<BiSolidBell className='text-xl lg:text-3xl' />
					</button>

					<div className='relative'>
						<div className='size-9 lg:size-12 rounded-full border-2 border-primary-100 bg-gray-600 flex items-center justify-center overflow-hidden'>
							<Picture src={avatarImg} className='w-full h-full' alt='' />
						</div>
						<div className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white'></div>
					</div>

					<div className='relative'>
						<button className='flex items-center text-white/90 hover:text-white transition-colors'>
							<FaChevronDown className='w-4 h-4' />
						</button>
					</div>
				</div>
			</div>
			{/* Mobile */}
			<div className='flex w-full items-center justify-between lg:hidden pl-2'>
				<QuivaLogo showText className='invert' />

				<div className='flex items-center justify-end gap-2 pr-4 lg:pr-6'>
					{/* Notification icon */}
					<button className='relative p-2 text-white/70 hover:text-white transition-colors'>
						<BiSolidBell className='text-xl lg:text-3xl' />
					</button>

					{/* Avatar - using icon as fallback */}
					<div className='relative'>
						<div className='size-9 lg:size-12 rounded-full border-2 border-primary-100 bg-gray-600 flex items-center justify-center overflow-hidden'>
							<Picture src={avatarImg} className='w-full h-full' alt='' />
						</div>
						<div className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white'></div>
					</div>

					{/* Dropdown button */}
					<div className='relative'>
						<button className='flex items-center text-white/90 hover:text-white transition-colors'>
							<FaChevronDown className='w-4 h-4' />
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default ComicPadHeader;
