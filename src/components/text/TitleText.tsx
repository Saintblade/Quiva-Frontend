import React from "react";

interface TitleTextProps {
	className?: string;
	title: string;
}

const TitleText = ({ className, title }: TitleTextProps) => {
	return (
		<h4
			className={`font-recursive font-medium text-6xl text-light-100 ${className}`}
		>
			{title}
		</h4>
	);
};

export default TitleText;
