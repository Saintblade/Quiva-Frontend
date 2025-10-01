import React, { ReactNode } from "react";
import ComicPadSideNav from "./ComicPadSideNav";
import ComicPadHeader from "./ComicPadHeader";
import styles from "../../css/Scrollbar.module.css";

interface ComicPadlayoutProps {
	children: ReactNode;
	className?: string;
}

const ComicPadlayout = ({ children, className }: ComicPadlayoutProps) => {
	return (
		<>
			<main className='flex justify-center relative h-screen bg-black-100'>
				<ComicPadSideNav />
				<div className='w-full lg:w-[82%] relative'>
					<ComicPadHeader />
					<div
						className={`w-full relative pt-20 xl:pt-28 pb-12 max-h-screen ${className} ${styles["inner-sidebar-scroll"]}`}
					>
						{children}
					</div>
				</div>
			</main>
		</>
	);
};

export default ComicPadlayout;
