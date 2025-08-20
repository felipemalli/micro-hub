import React, { Suspense, useState, useEffect, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar } from "./components/Navbar";

const AuthApp = lazy(() => import("./microfrontends/AuthApp"));
const RickMortyApp = lazy(() => import("./microfrontends/RickMortyApp"));

interface ErrorBoundaryProps {
	children: React.ReactNode;
	fallback: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
	children,
	fallback,
}) => {
	const [hasError, setHasError] = React.useState(false);

	React.useEffect(() => {
		const handleError = () => setHasError(true);
		window.addEventListener("error", handleError);
		return () => window.removeEventListener("error", handleError);
	}, []);

	if (hasError) {
		return <>{fallback}</>;
	}

	return <>{children}</>;
};

const LoadingSpinner: React.FC = () => (
	<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
		<div className="text-center">
			<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
			<p className="text-gray-600 font-medium">Carregando...</p>
		</div>
	</div>
);

const ErrorFallback: React.FC<{ message: string }> = ({ message }) => (
	<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
		<div className="text-center p-8 card max-w-md">
			<div className="text-red-500 text-5xl mb-4">⚠️</div>
			<h2 className="text-xl font-bold text-gray-800 mb-2">
				Ops! Algo deu errado
			</h2>
			<p className="text-gray-600 mb-4">{message}</p>
			<button onClick={() => window.location.reload()} className="btn-primary">
				Tentar novamente
			</button>
		</div>
	</div>
);

const App: React.FC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		// Verificar se há sessão salva
		const savedUser = localStorage.getItem("currentUser");
		setIsAuthenticated(!!savedUser);
	}, []);

	const handleAuthChange = (authenticated: boolean) => {
		setIsAuthenticated(authenticated);
	};

	return (
		<Router>
			<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
				<Navbar isAuthenticated={isAuthenticated} />
				<main>
					<Routes>
						<Route
							path="/"
							element={
								<div className="flex items-center justify-center h-screen-minus-header">
									<div className="text-center p-8 card max-w-2xl">
										<h1 className="text-4xl font-bold text-gray-800 mb-4">
											Bem-vindo ao Micro Hub
										</h1>
										<p className="text-gray-600 mb-8 text-lg max-w-lg">
											Um projeto de demostração da arquitetura de microfrontends
											utilizando o Module Federation
										</p>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<Link
												to="/auth"
												className="bg-white rounded-lg hover:shadow-lg transition-shadow p-6"
											>
												<div className="text-3xl mb-2">🔐</div>
												<h5 className="font-semibold text-gray-800">
													Autenticação
												</h5>
												<p className="text-sm text-gray-600">
													Sistema de login e registro
												</p>
											</Link>
											<Link
												to="/rickmorty"
												className="bg-white rounded-lg hover:shadow-lg transition-shadow p-6"
											>
												<div className="text-3xl mb-2">👽</div>
												<h5 className="font-semibold text-gray-800">
													Rick & Morty
												</h5>
												<p className="text-sm text-gray-600">
													Explore o universo da série
												</p>
											</Link>
										</div>
									</div>
								</div>
							}
						/>
						<Route
							path="/auth/*"
							element={
								<ErrorBoundary
									fallback={
										<ErrorFallback message="Erro ao carregar o módulo de autenticação" />
									}
								>
									<Suspense fallback={<LoadingSpinner />}>
										<AuthApp onAuthChange={handleAuthChange} />
									</Suspense>
								</ErrorBoundary>
							}
						/>
						<Route
							path="/rickmorty/*"
							element={
								<ErrorBoundary
									fallback={
										<ErrorFallback message="Erro ao carregar o módulo Rick & Morty" />
									}
								>
									<Suspense fallback={<LoadingSpinner />}>
										<RickMortyApp isAuthenticated={isAuthenticated} />
									</Suspense>
								</ErrorBoundary>
							}
						/>
					</Routes>
				</main>
			</div>
		</Router>
	);
};

export default App;
