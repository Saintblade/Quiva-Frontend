import { FiInstagram } from "react-icons/fi";
import { RiTelegram2Fill } from "react-icons/ri";

export const NAV_LINKS = [
	{ href: "/", label: "Home" },
	{ href: "/explore", label: "Explore" },
	{ href: "/games", label: "Games" },
	{ href: "/creators", label: "Creators" },
	{ href: "/faq", label: "FAQ" },
	{ href: "/roadmap", label: "Roadmap" },
	{ href: "/community", label: "Community" },
] as const;

export const SOCIAL_MEDIA_LINKS = [
	{
		id: "instagram",
		icon: <FiInstagram className='text-2xl' />,
		url: "https://instagram.com/yourprofile",
	},
	{
		id: "telegram",
		icon: <RiTelegram2Fill className='text-2xl' />,
		url: "https://t.me/yourchannel",
	},
];

export const phoneNum = "+1 (323) 275-1718";
export const emailAddress = "hello@logoipsum.com";
