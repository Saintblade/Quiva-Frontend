"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { QuivaLogo } from "../utils/function";
import { MainButton } from "../button";
import Hamburger from "hamburger-react";
import Link from "next/link";
import { NAV_LINKS } from "../utils/constant";
import Sidebar from "./Sidebar";
import { Modal, ModalContent, useDisclosure } from "@heroui/react";
import WhitePaperModal from "../modals/WhitePaperModal";
import GeneralModal from "../modals/GeneralModal";

const Header = () => {
	const [search, setSearch] = useState("");
	const [isScrolled, setIsScrolled] = useState(false);
	const pathname = usePathname();
	const router = useRouter();

	const {
		isOpen: isOpenWhitePaper,
		onOpen: onOpenWhitePaper,
		onOpenChange: onOpenChangeWhitePaper,
		onClose: onCloseWhitePaper,
	} = useDisclosure();

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
						{NAV_LINKS.map((link) => {
							const isSectionLink =
								link.href === "/faq" || link.href === "/roadmap";
							const isExternalLink = !link.href.startsWith("/"); // Check for external URLs
							const sectionId = link.href.substring(1);
							const currentPath =
								typeof window !== "undefined" && window.location.pathname;
							const currentHash =
								typeof window !== "undefined" &&
								window.location.hash.substring(1);

							// Check if active (either exact path match or section match)
							const isActive =
								currentPath === link.href ||
								(isSectionLink &&
									currentHash === sectionId &&
									currentPath === "/");

							return (
								<li key={link.href}>
									{isSectionLink ? (
										<a
											href={`/#${sectionId}`}
											onClick={(e) => {
												if (currentPath === "/") {
													e.preventDefault();
													document.getElementById(sectionId)?.scrollIntoView({
														behavior: "smooth",
													});
												}
											}}
											className={`hover:text-primary-100 transition-colors ${
												isActive
													? "text-primary-100 font-semibold"
													: "text-white"
											}`}
										>
											{link.label}
										</a>
									) : isExternalLink ? (
										<a
											href={link.href}
											target='_blank'
											rel='noopener noreferrer'
											className={`hover:text-primary-100 transition-colors ${
												isActive
													? "text-primary-100 font-semibold"
													: "text-white"
											}`}
										>
											{link.label}
										</a>
									) : (
										<Link
											href={link.href}
											className={`hover:text-primary-100 transition-colors ${
												isActive
													? "text-primary-100 font-semibold"
													: "text-white"
											}`}
										>
											{link.label}
										</Link>
									)}
								</li>
							);
						})}
					</ul>

					<div className='flex justify-end col-span-1'>
						<MainButton onClick={onOpenWhitePaper}>White Paper</MainButton>
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

			<Sidebar
				isSidebarOpen={isSidebarOpen}
				toggleSidebar={toggleSidebar}
				onOpenWhitePaper={onOpenWhitePaper}
			/>

			{/* White paper */}
			<GeneralModal
				isOpen={isOpenWhitePaper}
				onOpenChange={onOpenChangeWhitePaper}
				onClose={onCloseWhitePaper}
				backdrop='blur'
				size='xl'
			>
				<WhitePaperModal onClose={onCloseWhitePaper} />
			</GeneralModal>
		</>
	);
};

export default Header;
