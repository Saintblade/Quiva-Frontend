import React from "react";
import { FaBell, FaChevronDown, FaUserCircle } from "react-icons/fa";
import { BiSolidBell } from "react-icons/bi";
import Picture from "@/components/picture/Index";
import { avatarImg } from "../../../../public/dev_images";
import Link from "next/link";

const ComicPadHeader = () => {
	return (
		<header
			className={`fixed max-w-[1700px] px-2 w-[83%] grid grid-cols-3 min-h-20 lg:py-3 top-0 border-b dashed-border-strong drop-shadow-sm z-50 bg-black-200`}
		>
			<div className='flex items-center'>
				<Link href="/marketplace" className="text-white/70 hover:text-white transition text-sm">
					← Back to Marketplace
				</Link>
			</div>

			<div className='flex flex-col items-center justify-center'>
				<h4 className='text-white text-sm lg:text-xl font-medium tracking-wider'>
					Welcome Mary!
				</h4>
				<p className='text-white/60 text-xs lg:text-sm'>
					Let&apos;s build something epic.
				</p>
			</div>

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
		</header>
	);
};

export default ComicPadHeader;
