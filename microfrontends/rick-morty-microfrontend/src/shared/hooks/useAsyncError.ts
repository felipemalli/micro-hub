import { useErrorBoundary } from "react-error-boundary";
import { useCallback } from "react";

export function useAsyncError() {
	const { showBoundary } = useErrorBoundary();

	const captureAsyncError = useCallback(
		(error: Error) => {
			showBoundary(error);
		},
		[showBoundary]
	);

	return captureAsyncError;
}
