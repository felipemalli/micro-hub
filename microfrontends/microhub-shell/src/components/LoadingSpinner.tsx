import React from "react";

export const LoadingSpinner: React.FC = () => (
	<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
		<div className="text-center">
			<div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-2 border-blue-500"></div>
			<p>Carregando...</p>
		</div>
	</div>
);
