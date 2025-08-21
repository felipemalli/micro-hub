import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
import { errorLogger } from "../../../shared/services/errorLogger";

interface ErrorBoundaryProps {
	children: React.ReactNode;
	fallback?: React.ComponentType<{
		error: Error;
		resetErrorBoundary: () => void;
	}>;
	onReset?: () => void;
	resetKeys?: Array<string | number | boolean | null | undefined>;
	context?: string;
}

export function ErrorBoundary({
	children,
	fallback,
	onReset,
	resetKeys,
	context = "None",
}: ErrorBoundaryProps) {
	const handleError = (error: Error, errorInfo: { componentStack: string }) => {
		errorLogger.captureError(error, {
			context,
			componentStack: errorInfo.componentStack,
			timestamp: new Date().toISOString(),
			userAgent: navigator.userAgent,
			url: window.location.href,
		});
	};

	const handleReset = () => {
		if (process.env.NODE_ENV === "development") {
			console.log(`🔄 Error boundary reset in context: ${context}`);
		}
		onReset?.();
	};

	return (
		<ReactErrorBoundary
			FallbackComponent={fallback || ErrorFallback}
			onError={handleError}
			onReset={handleReset}
			resetKeys={resetKeys}
		>
			{children}
		</ReactErrorBoundary>
	);
}
