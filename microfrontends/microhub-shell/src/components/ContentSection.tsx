import React from "react";
import { Link } from "react-router-dom";

export const ContentSection: React.FC = () => {
	return (
		<div className="h-screen-minus-header flex items-center justify-center">
			<div className="card max-w-2xl p-8 text-center">
				<h1 className="mb-4 text-4xl font-bold text-gray-800">
					Bem-vindo ao Micro Hub
				</h1>
				<p className="mb-8 max-w-lg text-lg text-gray-600">
					Um projeto de demostração da arquitetura de microfrontends utilizando
					o Module Federation
				</p>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<Link
						to="/auth"
						className="rounded-lg bg-white p-6 transition-shadow hover:shadow-lg"
					>
						<div className="mb-2 text-3xl">🔐</div>
						<h5 className="font-semibold text-gray-800">Autenticação</h5>
						<p className="text-sm text-gray-600">Sistema de login e registro</p>
					</Link>
					<Link
						to="/rickmorty"
						className="rounded-lg bg-white p-6 transition-shadow hover:shadow-lg"
					>
						<div className="mb-2 text-3xl">👽</div>
						<h5 className="font-semibold text-gray-800">Rick & Morty</h5>
						<p className="text-sm text-gray-600">Explore o universo da série</p>
					</Link>
				</div>
			</div>
		</div>
	);
};
