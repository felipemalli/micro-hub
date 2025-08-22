import { useState, useCallback } from "react";
import { useApiError } from "./useApiError";

interface MutationState {
	isLoading: boolean;
	error: string | null;
}

interface UseMutationOptions {
	onSuccess?: () => void;
	onError?: (error: any) => void;
	invalidateCache?: () => void;
}

export const useMutation = <TData, TVariables>(
	mutationFn: (variables: TVariables) => Promise<TData>,
	options?: UseMutationOptions
) => {
	const [state, setState] = useState<MutationState>({
		isLoading: false,
		error: null,
	});
	const handleApiError = useApiError();

	const mutate = useCallback(
		async (variables: TVariables) => {
			setState({ isLoading: true, error: null });

			try {
				const result = await mutationFn(variables);
				setState({ isLoading: false, error: null });

				if (options?.invalidateCache) {
					options.invalidateCache();
				}

				if (options?.onSuccess) {
					options.onSuccess();
				}

				return result;
			} catch (error) {
				try {
					handleApiError(error);
				} catch (handledError) {
					const errorMessage =
						handledError instanceof Error
							? handledError.message
							: "Erro desconhecido";
					setState({ isLoading: false, error: errorMessage });

					if (options?.onError) {
						options.onError(handledError);
					}

					throw handledError;
				}
			}
		},
		[mutationFn, options, handleApiError]
	);

	return {
		mutate,
		isLoading: state.isLoading,
		error: state.error,
	};
};
