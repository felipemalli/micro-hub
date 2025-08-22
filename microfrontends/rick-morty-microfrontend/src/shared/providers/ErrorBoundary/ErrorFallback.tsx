import { FallbackProps } from "react-error-boundary";
import { CoreButton } from "@felipemalli-libs/microhub-ui/react";
import { AlertIcon, RefreshIcon } from "../../assets";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	const isDevelopment = process.env.NODE_ENV === "development";

	return (
		<div className="h-screen-minus-header my-4 flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 sm:my-16">
			<div className="flex w-full max-w-md grow flex-col items-center gap-6 rounded-lg bg-white p-8 text-center shadow-xl">
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
					<details className="w-full flex-shrink text-left">
						<summary className="mb-2 cursor-pointer text-sm text-gray-500 hover:text-gray-700">
							Detalhes Técnicos (Dev)
						</summary>
						<div className="max-h-48 space-y-2 overflow-auto rounded bg-gray-100 p-3 text-xs text-red-600">
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
