import { useErrorBoundary } from "react-error-boundary";
import { useCallback } from "react";

export function useApiError() {
	const { showBoundary } = useErrorBoundary();

	const handleApiError = useCallback(
		(error: unknown) => {
			const errorInstance =
				error instanceof Error ? error : new Error(String(error));

			if (
				(errorInstance as Error & { shouldShowInBoundary?: boolean })
					?.shouldShowInBoundary
			) {
				showBoundary(errorInstance);
			} else {
				throw errorInstance;
			}
		},
		[showBoundary]
	);

	return handleApiError;
}
