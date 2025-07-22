import AppLayout from "@/components/global/AppLayout";
import React from "react";
import Hero from "./_components/Hero";
import ExcitingProducts from "./_components/ExcitingProducts";
import HowComicPadWorks from "./_components/HowComicPadWorks";
import NoToolsNoProblem from "./_components/NoToolsNoProblem";
import WhyQuiva from "./_components/WhyQuiva";
import WhyBlockchain from "./_components/WhyBlockchain";
import WhatYouCanDoWithTMS from "./_components/WhatYouCanDoWithTMS";
import HomeRoadMap from "./_components/HomeRoadMap";

const page = () => {
	return (
		<AppLayout className='pb-20'>
			<Hero />
			<ExcitingProducts />
			<HowComicPadWorks />
			<NoToolsNoProblem />
			<WhyQuiva />
			<WhyBlockchain />
			<WhatYouCanDoWithTMS />
			<HomeRoadMap />
		</AppLayout>
	);
};

export default page;
