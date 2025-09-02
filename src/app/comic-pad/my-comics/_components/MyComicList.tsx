import MyComicCard from "@/components/cards/MyComicCard";
import React from "react";
import { soloLevel } from "../../../../../public/dev_images";
import { MY_COMICS_DATA } from "@/components/utils/constant";

const MyComicList = () => {
	return (
		<div className='grid grid-cols-3'>
			{MY_COMICS_DATA.map((comic) => (
				<MyComicCard
					key={comic.id}
					imageSrc={comic.imageSrc}
					subtitle={comic.subtitle}
					title={comic.title}
				/>
			))}
		</div>
	);
};

export default MyComicList;
