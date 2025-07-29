import { FiInstagram } from "react-icons/fi";
import { RiTwitterFill } from "react-icons/ri";

export const NAV_LINKS = [
	{ href: "/", label: "Home" },
	{ href: "/explore", label: "Explore" },
	{ href: "/games", label: "Games" },
	{ href: "/comic-pad", label: "Comic Pad" },
	{ href: "/faq", label: "FAQ" },
	{ href: "/roadmap", label: "Roadmap" },
	{ href: "/community", label: "Community" },
] as const;

export const SOCIAL_MEDIA_LINKS = [
	{
		id: "instagram",
		icon: <FiInstagram className='text-2xl' />,
		url: "https://www.instagram.com/quivacomics",
	},
	{
		id: "twitter",
		icon: <RiTwitterFill className='text-2xl' />,
		url: "https://x.com/quivacomics",
	},
];

export const faqs = [
	{
		question: "What Is Quiva?",
		answer:
			"Quiva is a comic platform for creators and fans to engage through web3 publishing, games, and immersive stories.",
	},
	{
		question: "How Is Quiva Different From Other Comic Platforms?",
		answer:
			"Quiva integrates blockchain, allowing you to mint, own, and monetize your comics securely.",
	},
	{
		question: "Is Quiva Only For Crypto Users?",
		answer:
			"No. Anyone can read and enjoy comics on Quiva. Crypto is optional for unlocking deeper features.",
	},
	{
		question: "How Can I Start Reading Comics On Quiva?",
		answer:
			"Simply create an account and explore the library. You can start reading free content instantly.",
	},
	{
		question: "What Kind Of Games Are Available On Quiva?",
		answer:
			"Quiva hosts story-based games, minigames, and interactive fiction tied to comic universes.",
	},
	{
		question: "How Do I Publish My Comic On Quiva?",
		answer:
			"Sign in as a creator, upload your content, and follow the minting process to go live.",
	},
	{
		question: "Can I Read Comics For Free?",
		answer:
			"Yes, Quiva offers a library of free-to-read comics alongside premium content.",
	},
	{
		question: "Can I Publish Fan Fiction Or Meme-Based Comics?",
		answer:
			"Yes, as long as it complies with Quiva’s content policies and IP rules.",
	},
];

export const phoneNum = "+1 (323) 275-1718";
export const emailAddress = "hello@logoipsum.com";
