import React from "react";

interface CardProps {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
	hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
	children,
	className = "",
	onClick,
	hover = false,
}) => {
	const baseClasses = "bg-white rounded-lg shadow-md overflow-hidden";
	const hoverClasses = hover
		? "hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
		: "";
	const clickableClasses = onClick ? "cursor-pointer" : "";

	const classes = `${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`;

	return (
		<div className={classes} onClick={onClick}>
			{children}
		</div>
	);
};
