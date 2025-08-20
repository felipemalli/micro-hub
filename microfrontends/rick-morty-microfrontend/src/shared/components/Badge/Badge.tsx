import React from "react";

interface BadgeProps {
	children: React.ReactNode;
	variant?: "success" | "danger" | "warning" | "info";
	size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
	children,
	variant = "info",
	size = "md",
}) => {
	const baseClasses = "inline-flex items-center font-medium rounded-full";

	const variants = {
		success: "bg-green-100 text-green-800",
		danger: "bg-red-100 text-red-800",
		warning: "bg-yellow-100 text-yellow-800",
		info: "bg-blue-100 text-blue-800",
	};

	const sizes = {
		sm: "px-2 py-1 text-xs",
		md: "px-3 py-1 text-sm",
	};

	const classes = `${baseClasses} ${variants[variant]} ${sizes[size]}`;

	return <span className={classes}>{children}</span>;
};
