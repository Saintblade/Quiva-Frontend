import React from "react";
import ComicPadlayout from "./_components/ComicPadlayout";
import StartNewComicFast from "./_components/StartNewComicFast";
import RecentFile from "./_components/RecentFile";
import AppMenu from "@/components/global/AppMenu";

const page = () => {
	return (
		<ComicPadlayout className='text-white pt-24 sm:pt-28 pb-20 sm:pb-12 w-full'>
			<div className='px-2 sm:px-10'>
				<StartNewComicFast />
				<RecentFile />
			</div>
			<AppMenu />
		</ComicPadlayout>
	);
};

export default page;
