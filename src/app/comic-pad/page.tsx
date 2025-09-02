import React from "react";
import ComicPadlayout from "./_components/ComicPadlayout";
import StartNewComicFast from "./_components/StartNewComicFast";
import RecentFile from "./_components/RecentFile";

const page = () => {
	return (
		<ComicPadlayout className='text-white pt-4'>
			<StartNewComicFast />
			<RecentFile />
		</ComicPadlayout>
	);
};

export default page;
