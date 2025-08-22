import React from "react";
import { Icon as LoadingIcon } from "../../assets/loading";

interface LoadingProps {
	message?: string;
	size?: "sm" | "md" | "lg";
}

export const Loading: React.FC<LoadingProps> = ({
	message = "Carregando...",
	size = "md",
}) => {
	const sizes = {
		sm: "size-4",
		md: "size-8",
		lg: "size-12",
	};

	return (
		<div className="flex flex-col items-center justify-center p-8">
			<LoadingIcon
				className={`animate-spin ${sizes[size]} mb-4 text-blue-600`}
			/>
			<p className="text-center">{message}</p>
		</div>
	);
};
