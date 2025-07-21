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
				className={`fixed w-full flex items-center z-20 h-16 lg:h-fit lg:py-3 top-0 border-b dashed-border-strong ${
					isScrolled ? "backdrop-blur-lg bg-white/40" : ""
				} drop-shadow-sm`}
			>
				<nav className='hidden lg:grid w-full grid-cols-6 lg:px-3 xl:px-0 items-center xl:max-w-[1200px] mx-auto'>
					<div className='col-span-1'>
						<QuivaLogo showText />
					</div>

					<ul className='flex gap-6 xl:gap-8 mx-auto text-black-200 py-3 font-spaceGrotesk col-span-4'>
						{NAV_LINKS.map((link) => (
							<li key={link.href}>
								<Link
									href={link.href}
									className='hover:text-primary transition-colors'
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>

					<div className='flex justify-end col-span-1'>
						<MainButton>Explore free comics</MainButton>
					</div>
				</nav>

				{/* Mobile Navigation */}
				<nav className='w-full relative flex justify-between items-center xl:hidden px-4'>
					<QuivaLogo showText />
					<button
						className={`relative text-black-100 grid place-items-center transition-[.20] ${
							isSidebarOpen ? "hidden" : ""
						}`}
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
