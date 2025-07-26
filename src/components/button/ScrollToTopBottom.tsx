"use client";
import React, { useState, useEffect } from "react";
import { HiOutlineArrowDown, HiOutlineArrowUp } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const ScrollIndicator = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [showUpArrow, setShowUpArrow] = useState(false);

	// Check scroll position to toggle arrows
	useEffect(() => {
		const toggleVisibility = () => {
			if (window.pageYOffset > 300) {
				setIsVisible(true);
				setShowUpArrow(true);
			} else {
				setIsVisible(true);
				setShowUpArrow(false);
			}
		};

		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	const scrollTo = (position: "top" | "bottom") => {
		window.scrollTo({
			top: position === "top" ? 0 : document.body.scrollHeight,
			behavior: "smooth",
		});
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.3 }}
					className='fixed bottom-6 right-5 lg:right-12 z-50 flex flex-col gap-3 '
				>
					{showUpArrow && (
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={() => scrollTo("top")}
							className='w-7 h-10 lg:w-8 lg:h-12 border-2 shadow-xl border-white/30 rounded-full flex items-center justify-center hover:bg-white/10 backdrop-blur-sm transition-all'
							aria-label='Scroll to top'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<HiOutlineArrowUp className='text-white text-sm lg:text-xl' />
						</motion.button>
					)}

					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => scrollTo("bottom")}
						className='w-7 h-10 lg:w-8 lg:h-12 border-2 shadow-xl border-white/30 rounded-full flex items-center justify-center hover:bg-white/10 backdrop-blur-sm transition-all'
						aria-label='Scroll to bottom'
					>
						<HiOutlineArrowDown className='text-white text-sm lg:text-xl' />
					</motion.button>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ScrollIndicator;
