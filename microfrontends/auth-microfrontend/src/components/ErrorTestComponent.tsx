import React, { useState } from "react";
import { CoreButton } from "@felipemalli-libs/microhub-ui/react";

export function ErrorTestComponent() {
	const [shouldError, setShouldError] = useState(false);

	if (shouldError) {
		// Isso vai forçar um erro e ativar o ErrorBoundary
		throw new Error("🧪 Erro de teste forçado para testar o ErrorBoundary!");
	}

	return (
		<div className="p-4 border border-red-300 bg-red-50 rounded-lg">
			<h3 className="text-lg font-bold text-red-800 mb-2">
				🧪 Componente de Teste de Erro
			</h3>
			<p className="text-red-700 mb-4">
				Clique no botão abaixo para forçar um erro e testar o ErrorBoundary:
			</p>
			<CoreButton
				variant="outline"
				size="medium"
				type="button"
				onCoreClick={() => setShouldError(true)}
			>
				💥 Forçar Erro
			</CoreButton>
		</div>
	);
}
