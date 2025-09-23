import React from "react";
import ComicPadlayout from "../_components/ComicPadlayout";
import MyComicList from "./_components/MyComicList";
import AppMenu from "@/components/global/AppMenu";

const page = () => {
	return (
		<ComicPadlayout className='text-white pt-24 sm:pt-28 pb-20 sm:pb-12 w-full'>
			<MyComicList />
			<AppMenu />
		</ComicPadlayout>
	);
};

export default page;
