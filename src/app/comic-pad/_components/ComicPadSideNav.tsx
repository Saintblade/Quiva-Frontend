"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "../../css/Scrollbar.module.css";
import { QuivaLogo } from "@/components/utils/function";
import { usePathname } from "next/navigation";

const ComicPadSideNav = () => {
	const pathname = usePathname();
	const router = useRouter();

	const handleCreateNewComic = () => {
		router.push("/comic-pad/script-builder");
	};

	const NAV_ITEMS = [
		{
			href: "/comic-pad",
			label: "Home",
			pathname: "/comic-pad",
		},
		{
			href: "/comic-pad/my-comics",
			label: "My Comics",
			pathname: "/comic-pad/my-comics",
		},
		{
			href: "/comic-pad/earnings",
			label: "Earnings",
			pathname: "/comic-pad/earnings",
		},
	];
	return (
		<div
			className={`bg-black-200 w-[18%] hidden lg:block h-full shadow-lg py-10 px-1 lg:pl-3 xl:pl-10 ${styles["inner-sidebar-scroll"]} border-r dashed-border-strong-3`}
		>
			<QuivaLogo
				showText
				className={`invert lg:invert transition-[.4] !text-xl`}
				logoClassName='!w-8 lg:!w-8 xl:!w-12'
			/>

			<div className='space-y-6 shrink-0 mt-12'>
				{NAV_ITEMS.map((item) => (
					<a
						key={item.href}
						href={item.href}
						className={`flex items-center gap-2.5 group mx-auto py-1 rounded-md group transition-[.3] hover:text-white ${
							pathname === item.pathname
								? "text-white"
								: "text-light-100/40 hover:text-white"
						}`}
					>
						<h2
							className={`text-sm xl:text-lg capitalize font-semibold line-clamp-1`}
						>
							{item.label}
						</h2>
					</a>
				))}

				<button
					onClick={handleCreateNewComic}
					className='text-black-200 bg-secondary-300 rounded-full px-5 py-2 font-medium hover:bg-secondary-300 transition-[.4] hover:scale-105'
				>
					{/* </button> */}
					{/* <button className='text-black-200 text-sm xl:text-base bg-secondary-300 rounded-full px-2 lg:px-5 py-2 font-medium hover:bg-secondary-300 transition-[.4] hover:scale-105'> */}
					Create New Comic
				</button>
			</div>
		</div>
	);
};

export default ComicPadSideNav;
