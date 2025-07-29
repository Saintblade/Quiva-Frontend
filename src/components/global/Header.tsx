"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { QuivaLogo } from "../utils/function";
import { MainButton } from "../button";
import Hamburger from "hamburger-react";
import Link from "next/link";
import { NAV_LINKS } from "../utils/constant";
import Sidebar from "./Sidebar";

const Header = () => {
	const [search, setSearch] = useState("");
	const [isScrolled, setIsScrolled] = useState(false);
	const pathname = usePathname();
	const router = useRouter();

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleSearch = () => {
		if (pathname === "/search") {
			router.push(`/search?${search}`);
		} else {
			router.push(`/search?${search}`);
		}
	};
	return (
		<>
			{/* Desktop Navigation */}
			<header
				className={`fixed w-full flex items-center z-20 h-16 lg:h-fit lg:py-3 top-0 ${
					isScrolled
						? "backdrop-blur-lg bg-white/40"
						: "lg:border-b dashed-border-strong"
				} drop-shadow-sm z-50`}
			>
				<nav className='hidden lg:grid w-full grid-cols-6 lg:px-3 xl:px-0 items-center xl:max-w-screen-xl mx-auto'>
					<div className='col-span-1'>
						<QuivaLogo showText className='invert' />
					</div>

					<ul className='flex gap-6 xl:gap-8 mx-auto text-white py-3 font-spaceGrotesk col-span-4'>
						{NAV_LINKS.map((link) => (
							<li key={link.href}>
								<Link
									href={link.href}
									className='hover:text-primary-100 transition-colors'
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>

					<div className='flex justify-end col-span-1'>
						<MainButton>White Paper</MainButton>
					</div>
				</nav>

				{/* Mobile Navigation */}
				<nav className='w-full relative flex justify-between items-center lg:hidden px-4'>
					<QuivaLogo
						showText
						className={`${
							isScrolled ? "" : "invert lg:invert"
						} transition-[.4]`}
					/>
					<button
						className={`relative grid place-items-center transition-[.20] ${
							isSidebarOpen ? "hidden" : ""
						} ${isScrolled ? "text-black-100" : "text-white"}`}
						onClick={toggleSidebar}
						aria-label='Toggle Sidebar'
					>
						<Hamburger size={20} toggled={isSidebarOpen} rounded hideOutline />
					</button>
				</nav>
			</header>

			<Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
		</>
	);
};

export default Header;
