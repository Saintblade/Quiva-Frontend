"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Hamburger from "hamburger-react";
import { WaveLine } from "../utils/SVGicons";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "../utils/constant";
import { QuivaLogo } from "../utils/function";

interface SidebarProps {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
}
const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
	const pathName = usePathname();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				if (isSidebarOpen) toggleSidebar();
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [toggleSidebar, isSidebarOpen]);

	return (
		<aside
			className={`block xl:hidden ${
				isSidebarOpen
					? "backdrop-sm fixed top-0 unset left-0 w-full h-full ease-in-out duration-1000 bg-[rgba(18,27,25,0.63)] z-50"
					: ""
			}`}
		>
			<div
				className={`-translate-x-full duration-500 ease-in-out flex flex-col h-lvh pl-6 pr-2 pt-2 pb-10 fixed bottom-0 top-0 left-0 z-40 bg-white w-[80%] sm:w-[50%] ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className='flex w-full items-center justify-between mt-4'>
					<QuivaLogo showText />
					<button
						className={`relative grid place-items-center ${
							isSidebarOpen && "!z-50"
						}`}
						onClick={toggleSidebar}
					>
						<Hamburger size={20} toggled={isSidebarOpen} rounded hideOutline />
					</button>
				</div>
				<ul className='flex gap-y-6 flex-col mt-6'>
					{NAV_LINKS.map((links, index) => {
						return (
							<li key={index} className='relative'>
								<Link
									href={links.href}
									className={`capitalize relative text-lg font-medium font-sans group ${
										pathName === links.href ? "text-primary-100" : ""
									}`}
								>
									<div className='flex items-center gap-1.5'>{links.label}</div>
								</Link>

								{/* Coming Soon badge */}
							</li>
						);
					})}
				</ul>
			</div>
		</aside>
	);
};

export default Sidebar;
