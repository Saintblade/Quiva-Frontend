import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTopBottom from "../button/ScrollToTopBottom";

interface AppLayoutProps {
	children: ReactNode;
	bgClassName?: string;
	className?: string;
}

const AppLayout = ({ children, bgClassName, className }: AppLayoutProps) => {
	return (
		<>
		
			<Header />
			<main
				className={`relative w-full min-h-screen ${className} ${bgClassName}`}
			>
				{children}
				<ScrollToTopBottom />
			</main>
			<Footer />
		</>
	);
};

export default AppLayout;
