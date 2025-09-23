import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		// max-w-[1200px]
		extend: {
			boxShadow: {
				"custom-orange": "0px 4px 20px 0px #FAA31E29",
				"custom-inset-white": "0px 4px 8px 0px #FFFFFF1A inset",
			},
			maxWidth: {
				"screen-xl": "1300px", // Defines max-w-[1300px]
			},
			fontFamily: {
				outfit: ["Outfit", ...fontFamily.sans],
				spaceGrotesk: ["Space Grotesk", ...fontFamily.sans],
				recursive: ["Recursive", ...fontFamily.sans],
				poppins: ["Poppins", ...fontFamily.sans],
			},
			backgroundImage: {
				"linear-blue-gradient":
					"linear-gradient(182.66deg, #4000FF 2.22%, #FFFFFF 111.5%)",
				"linear-black-gradient":
					"linear-gradient(180deg, #1C1C1C 0%, #0F0F0F 100%)",
			},
			colors: {
				// Add your custom colors here
				primary: {
					100: "#E57226",
					200: "#1d421d",
					300: "#D15E1A",
					400: "#C75415",
					500: "#BD4A10",
					600: "#A3400E",
					700: "#89360C",
					800: "#6F2C0A",
					900: "#552207",
				},
				black: {
					100: "#000000",
					200: "#1A1A1A",
					300: "#0D0D0D",
					400: "#18191B",
					500: "#141414",
					600: "#1D1D1D",
					700: "#161616",
					800: "#1C1C1C",
					900: "#0B0B0B",
				},

				bg: {
					100: "#F6F6F6",
					200: "#F7F9FC",
					300: "#667185",
					400: "#F7F7F1",
				},
				gray: {
					100: "#333333",
					200: "#3A3C3F",
					300: "#252525",
					400: "#1E1E1E",
				},
				secondary: {
					100: "#9747FF",
					200: "#FAA31E",
					300: "#D38200",
				},
				light: {
					100: "#F8F8F8",
					200: "#A0A0A0",
					300: "#36382E",
				},
				red: {
					100: "#D72B29",
				},
				// Add more colors as needed
			},
			fontSize: {
				xxs: "10px",
			},
		},
	},
	plugins: [heroui(), require("@tailwindcss/typography")],
};
export default config;
