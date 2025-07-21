interface MainButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	className?: string;
}

export const MainButton = ({
	children,
	onClick,
	className = "",
}: MainButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={`bg-secondary-200 text-black-200 font-recursive text-sm rounded-full px-7 py-3 border-[3px] border-black-200 shadow-[2px_2px_0_0_black] transition-all duration-200 font-medium ${className} hover:scale-105 transition-[.4]`}
		>
			{children}
		</button>
	);
};
