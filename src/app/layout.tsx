import { Outfit, Space_Grotesk, Recursive, Poppins } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import React from "react";
import { HeroUIProvider } from "@heroui/react";
import ReduxProvider from "./redux-provider";
import { Metadata } from "next";
import { SEO_CONFIG } from "@/components/utils/seoContants";
import ReduxProviders from '@/redux/Provider';

// const outfit = Outfit({
// 	subsets: ["latin-ext"],
// 	weight: ["100", "300", "400", "500", "700", "900"],
// 	style: ["normal"],
// });

// const spaceGrotesk = Space_Grotesk({
// 	subsets: ["latin-ext"],
// 	weight: ["300", "400", "500", "700"],
// 	style: ["normal"],
// });

// const recursive = Recursive({
// 	subsets: ["latin-ext"],
// 	weight: ["300", "400", "500", "700", "800", "900"],
// 	style: ["normal"],
// });

// const poppins = Poppins({
// 	subsets: ["latin-ext"],
// 	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// 	style: ["normal"],
// });

const { description, keywords, title, url } = SEO_CONFIG.default;
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

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`max-w-[1700px] mx-auto relative`}>
				<ReduxProviders>
					<HeroUIProvider>{children}</HeroUIProvider>
				</ReduxProviders>
			</body>
		</html>
	);
}
