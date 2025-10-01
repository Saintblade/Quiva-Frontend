import React from "react";
import ComicPadlayout from "../_components/ComicPadlayout";
import MyComicList from "./_components/MyComicList";
import AppMenu from "@/components/global/AppMenu";

const page = () => {
	return (
		<ComicPadlayout className='text-white w-full'>
			<div className='px-0 sm:px-8 pt-2 sm:pt-0 pb-24 sm:pb-12'>
				<MyComicList />
			</div>
			<AppMenu />
		</ComicPadlayout>
	);
};

export default page;
