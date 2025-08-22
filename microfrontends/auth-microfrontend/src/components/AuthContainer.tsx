import type { FormEvent, ReactNode } from "react";

interface AuthContainerProps {
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
	title: string;
	description: string;
	children: ReactNode;
}

export const AuthContainer = ({
	onSubmit,
	title,
	description,
	children,
}: AuthContainerProps) => {
	return (
		<div className="h-screen-minus-header flex items-center justify-center px-4 py-4 sm:my-16">
			<div className="flex w-full flex-col gap-8 rounded-lg bg-white px-6 py-8 sm:max-w-md sm:px-8 sm:py-8 sm:shadow-md">
				<div className="flex flex-col gap-2 sm:items-center">
					<h3>{title}</h3>
					<p>{description}</p>
				</div>
				<form onSubmit={onSubmit} className="flex flex-col gap-8">
					{children}
				</form>
			</div>
		</div>
	);
};
