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
		extend: {
			fontFamily: {
				outfit: ["Outfit", ...fontFamily.sans],
				spaceGrotesk: ["Space Grotesk", ...fontFamily.sans],
				recursive: ["Recursive", ...fontFamily.sans],
				poppins: ["Poppins", ...fontFamily.sans],
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"gradient-linear":
					"linear-brown-gradient(133deg, #2B3221 9.11%, rgba(242, 242, 242, 0.00) 298.89%)",
				"gradient-primary":
					"linear-gradient(133deg, #2B3221 9.11%, #E57226 50%, rgba(242, 242, 242, 0.00) 100%)",
			},
			colors: {
				// Add your custom colors here
				primary: {
					100: "#E57226",
					200: "#1d421d",
				},
				black: {
					100: "#000000",
					200: "#1A1A1A",
					300: "#0D0D0D",
					400: "#18191B",
					500: "#141414",
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
				},
				secondary: {
					100: "#9747FF",
					200: "#FAA31E",
				},
				light: {
					100: "#F8F8F8",
					200: "#A0A0A0",
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
