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
import WhatIsQuiva from "./_components/WhatIsQuiva";
import { Metadata } from "next";
import { SEO_CONFIG } from "@/components/utils/seoContants";
import ScrollToTopBottom from "@/components/button/ScrollToTopBottom";

const { description, keywords, title, url, ogImage } = SEO_CONFIG.home;
export const metadata: Metadata = {
	title: title,
	description: description,
	keywords: keywords,
	robots: {
		index: true,
	},
	openGraph: {
		images: [
			{
				url: "",
			},
		],
		url: url,
	},
};

const page = () => {
	return (
		<AppLayout className=''>
			<Hero />
			<ExcitingProducts />
			<HowComicPadWorks />
			<NoToolsNoProblem />
			<WhyQuiva />
			<WhyBlockchain />
			<WhatYouCanDoWithTMS />
			<WhatIsQuiva />
			<HomeRoadMap />
		</AppLayout>
	);
};

export default page;
