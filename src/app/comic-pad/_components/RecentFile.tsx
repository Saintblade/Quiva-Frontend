import React from "react";
import RecentCard from "./RecentCard";
import { theNorthFace } from "../../../../public/dev_images";

const RecentFile = () => {
	return (
		<div className='mt-8'>
			<h5 className={`text-white text-sm lg:text-xl font-medium`}>Recent</h5>
			<div className='mt-2'>
				<h6>Sort By:</h6>
			</div>
			<div className='mt-4'>
				<RecentCard title='The North Face' imageSrc={theNorthFace} />
			</div>
		</div>
	);
};

export default RecentFile;
