import React from "react";

export const ErrorFallback: React.FC<{ message: string }> = ({ message }) => (
	<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
		<div className="card max-w-md p-8 text-center">
			<div className="mb-4 text-5xl text-red-500">⚠️</div>
			<h2 className="mb-2 text-xl font-bold text-gray-800">
				Ops! Algo deu errado
			</h2>
			<p className="mb-4">{message}</p>
			<button onClick={() => window.location.reload()} className="btn-primary">
				Tentar novamente
			</button>
		</div>
	</div>
);
