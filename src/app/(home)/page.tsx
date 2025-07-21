import AppLayout from "@/components/global/AppLayout";
import React from "react";
import Hero from "./_components/Hero";
import ExcitingProducts from "./_components/ExcitingProducts";

const page = () => {
	return (
		<AppLayout className='pb-20'>
			<Hero />
			<ExcitingProducts />
		</AppLayout>
	);
};

export default page;
