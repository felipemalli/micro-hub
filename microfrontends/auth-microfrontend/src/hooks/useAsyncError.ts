import { useErrorBoundary } from "react-error-boundary";
import { useCallback } from "react";

export function useAsyncError() {
	const { showBoundary } = useErrorBoundary();

	const captureAsyncError = useCallback(
		(error: Error, context?: string) => {
			console.error(`Async error in ${context || "unknown context"}:`, error);
			showBoundary(error);
		},
		[showBoundary]
	);

	return captureAsyncError;
}
