import { ComicsLibrary } from "@/Features/comic-library/components/ComicsLibrary";
import { trendingComics } from "@/Features/comic-library/data/sampleData";
import React from "react";

function page() {
	return (
		<>
			<ComicsLibrary comics={trendingComics} />
		</>
	);
}

export default page;
