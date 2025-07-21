import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

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
			</main>
			{/* <Footer /> */}
		</>
	);
};

export default AppLayout;
