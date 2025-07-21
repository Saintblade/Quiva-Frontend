import { Outfit, Space_Grotesk, Recursive, Poppins } from "next/font/google";
import "./globals.css";
import React from "react";
import { HeroUIProvider } from "@heroui/react";
import ReduxProvider from "./redux-provider";
import { Metadata } from "next";

const outfit = Outfit({
	subsets: ["latin-ext"],
	weight: ["100", "300", "400", "500", "700", "900"],
	style: ["normal"],
});

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin-ext"],
	weight: ["300", "400", "500", "700"],
	style: ["normal"],
});

const recursive = Recursive({
	subsets: ["latin-ext"],
	weight: ["300", "400", "500", "700", "800", "900"],
	style: ["normal"],
});

const poppins = Poppins({
	subsets: ["latin-ext"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	style: ["normal"],
});
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body
				className={`${outfit.className} ${spaceGrotesk.className} ${recursive.className} ${poppins.className} max-w-[1700px] mx-auto relative`}
			>
				<ReduxProvider>
					<HeroUIProvider>{children}</HeroUIProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
