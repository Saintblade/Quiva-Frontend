"use client";
import MyComicCard from "@/components/cards/MyComicCard";
import React, { useState } from "react";
import { soloLevel } from "../../../../../public/dev_images";
import { motion, AnimatePresence } from "framer-motion";
import { MY_COMICS_DATA } from "@/components/utils/constant";

const TABS = ["All", "Recent", "Popular", "Free", "Paid"];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const MyComicList = () => {
	const [activeTab, setActiveTab] = useState("All");

	const filteredComics =
		activeTab === "All"
			? MY_COMICS_DATA
			: MY_COMICS_DATA.filter((c) => c.category === activeTab);

	// Add these additional variants for comic-style animations
	const comicCardVariants = {
		hidden: {
			opacity: 0,
			x: -50,
			rotate: -5,
			scale: 0.8,
		},
		visible: {
			opacity: 1,
			x: 0,
			rotate: 0,
			scale: 1,
			transition: {
				type: "spring",
				stiffness: 120,
				damping: 15,
			},
		},
		hover: {
			y: -10,
			scale: 1.05,
			rotateY: 10,
			boxShadow:
				"0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 5px 10px -5px rgba(0, 0, 0, 0.2)",
			transition: {
				type: "spring",
				stiffness: 500,
				damping: 15,
			},
		},
	};

	const comicTabVariants = {
		initial: {
			scale: 0.8,
			opacity: 0.6,
			textShadow: "0 0 0px currentColor",
		},
		animate: {
			scale: 1,
			opacity: 1,
			textShadow: "0 0 0px currentColor",
		},
		hover: {
			scale: 1.1,
			textShadow: "2px 2px 0px rgba(0,0,0,0.2)",
			y: -2,
		},
		tap: {
			scale: 0.9,
			textShadow: "0 0 0px currentColor",
		},
	};

	return (
		<div className='mt-6'>
			{/* Comic-style Tabs */}
			<motion.div
				className='flex pl-2 sm:pl-0 gap-2 lg:gap-5 mb-6 overflow-x-auto pb-3 scrollbar-hide'
				initial='hidden'
				animate='visible'
				variants={containerVariants}
				style={{
					scrollbarWidth: "none", // Firefox
					msOverflowStyle: "none", // IE/Edge
				}}
			>
				{/* Hide scrollbar for Webkit browsers */}
				<style jsx>{`
					.scrollbar-hide::-webkit-scrollbar {
						display: none;
					}
				`}</style>

				{TABS.map((tab) => (
					<motion.button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`flex-shrink-0 px-4 py-0.5 rounded-full border-2 border-yellow-700 text-sm text-black-100 font-bold relative overflow-hidden ${
							activeTab === tab
								? "bg-yellow-700 !text-white"
								: "text-yellow-700 bg-white"
						}`}
						variants={comicTabVariants}
						initial='initial'
						animate='animate'
						whileHover='hover'
						whileTap='tap'
						style={{
							fontFamily: "'Bangers', cursive, sans-serif",
						}}
					>
						{tab}
						{activeTab === tab && (
							<motion.div
								className='absolute inset-0 bg-yellow-500 text-white -z-10'
								initial={{ scaleX: 0 }}
								animate={{ scaleX: 1 }}
								transition={{ duration: 0.3 }}
								style={{ originX: 0 }}
							/>
						)}
					</motion.button>
				))}
			</motion.div>

			{/* Comic-style Comic List */}
			<AnimatePresence mode='wait'>
				<motion.div
					key={activeTab}
					className='grid grid-cols-2 lg:flex gap-4 flex-wrap px-3 sm:px-0'
					initial='hidden'
					animate='visible'
					exit='hidden'
					variants={containerVariants}
				>
					{filteredComics.map((comic, index) => (
						<motion.div
							key={comic.id}
							//  @ts-ignore
							variants={comicCardVariants}
							whileHover='hover'
							whileTap='tap'
							custom={index}
							className='relative'
						>
							<MyComicCard
								id={comic.id}
								imageSrc={comic.imageSrc}
								subtitle={comic.subtitle}
								title={comic.title}
							/>
						</motion.div>
					))}
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default MyComicList;
