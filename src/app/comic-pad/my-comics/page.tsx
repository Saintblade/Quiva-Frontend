import React from "react";
import ComicPadlayout from "../_components/ComicPadlayout";
import MyComicList from "./_components/MyComicList";

const page = () => {
	return (
		<ComicPadlayout className='text-white pt-4'>
			<MyComicList />
		</ComicPadlayout>
	);
};

export default page;
