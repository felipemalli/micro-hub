import React from "react";

interface ErrorBoundaryProps {
	children: React.ReactNode;
	fallback: React.ReactNode;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
	children,
	fallback,
}) => {
	const [hasError, setHasError] = React.useState(false);

	React.useEffect(() => {
		const handleError = () => setHasError(true);
		window.addEventListener("error", handleError);
		return () => window.removeEventListener("error", handleError);
	}, []);

	if (hasError) {
		return <>{fallback}</>;
	}

	return <>{children}</>;
};
