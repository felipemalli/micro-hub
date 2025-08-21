import { FallbackProps } from "react-error-boundary";
import { CoreButton } from "@felipemalli-libs/microhub-ui/react";
import { AlertIcon, RefreshIcon } from "../../../assets";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	const isDevelopment = process.env.NODE_ENV === "development";

	return (
		<div className="h-screen-minus-header my-4 sm:my-16 flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
			<div className="max-w-md w-full flex flex-col items-center grow gap-6 text-center p-8 bg-white rounded-lg shadow-xl">
				<AlertIcon className="size-16" />
				<h2>Oops! Algo deu errado</h2>
				<p>
					Ocorreu um erro inesperado. Clique no botão abaixo para tentar
					novamente.
				</p>
				<CoreButton
					variant="primary"
					size="medium"
					type="button"
					onCoreClick={resetErrorBoundary}
				>
					<RefreshIcon className="mr-2" />
					Tentar Novamente
				</CoreButton>
				{isDevelopment && error && (
					<details className="w-full text-left flex-shrink">
						<summary className="cursor-pointer text-sm text-gray-500 mb-2 hover:text-gray-700">
							Detalhes Técnicos (Dev)
						</summary>
						<div className="p-3 bg-gray-100 rounded text-xs text-red-600 max-h-48 overflow-auto space-y-2">
							<div>
								<strong>Error:</strong> {error.message}
							</div>
							{error.stack && (
								<div>
									<strong>Stack:</strong>
									<pre className="mt-1 whitespace-pre-wrap break-all">
										{error.stack}
									</pre>
								</div>
							)}
						</div>
					</details>
				)}
			</div>
		</div>
	);
}
