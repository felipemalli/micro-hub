import { useState, useCallback } from "react";

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

	const mutate = useCallback(
		async (variables: TVariables) => {
			setState({ isLoading: true, error: null });

			try {
				const result = await mutationFn(variables);
				setState({ isLoading: false, error: null });

				// Invalida cache se especificado
				if (options?.invalidateCache) {
					options.invalidateCache();
				}

				// Callback de sucesso
				if (options?.onSuccess) {
					options.onSuccess();
				}

				return result;
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : "Erro desconhecido";
				setState({ isLoading: false, error: errorMessage });

				// Callback de erro
				if (options?.onError) {
					options.onError(error);
				}

				throw error;
			}
		},
		[mutationFn, options]
	);

	return {
		mutate,
		isLoading: state.isLoading,
		error: state.error,
	};
};
