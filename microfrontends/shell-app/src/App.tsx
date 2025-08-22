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
	<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
		<div className="text-center">
			<div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-2 border-blue-500"></div>
			<p className="font-medium text-gray-600">Carregando...</p>
		</div>
	</div>
);

const ErrorFallback: React.FC<{ message: string }> = ({ message }) => (
	<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
		<div className="card max-w-md p-8 text-center">
			<div className="mb-4 text-5xl text-red-500">⚠️</div>
			<h2 className="mb-2 text-xl font-bold text-gray-800">
				Ops! Algo deu errado
			</h2>
			<p className="mb-4 text-gray-600">{message}</p>
			<button onClick={() => window.location.reload()} className="btn-primary">
				Tentar novamente
			</button>
		</div>
	</div>
);

const App: React.FC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		const checkAuthState = () => {
			const savedUser = localStorage.getItem("currentUser");
			const token = localStorage.getItem("accessToken");
			const isAuth = !!(savedUser && token);
			console.log("Microhub Shell: Checking auth state", {
				savedUser: !!savedUser,
				token: !!token,
				isAuth,
			});
			setIsAuthenticated(isAuth);
		};

		checkAuthState();

		const handleLogin = () => {
			console.log("Microhub Shell: Received login event");
			setIsAuthenticated(true);
		};

		const handleLogout = () => {
			console.log("Microhub Shell: Received logout event");
			setIsAuthenticated(false);
		};

		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === "currentUser" || e.key === "accessToken") {
				console.log("Microhub Shell: Storage changed", e.key, e.newValue);
				checkAuthState();
			}
		};

		window.addEventListener("auth:login", handleLogin);
		window.addEventListener("auth:logout", handleLogout);
		window.addEventListener("storage", handleStorageChange);

		return () => {
			window.removeEventListener("auth:login", handleLogin);
			window.removeEventListener("auth:logout", handleLogout);
			window.removeEventListener("storage", handleStorageChange);
		};
	}, []);

	const handleAuthChange = (authenticated: boolean) => {
		console.log(
			"Microhub Shell: Auth change from microfrontend",
			authenticated
		);
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
								<div className="h-screen-minus-header flex items-center justify-center">
									<div className="card max-w-2xl p-8 text-center">
										<h1 className="mb-4 text-4xl font-bold text-gray-800">
											Bem-vindo ao Micro Hub
										</h1>
										<p className="mb-8 max-w-lg text-lg text-gray-600">
											Um projeto de demostração da arquitetura de microfrontends
											utilizando o Module Federation
										</p>
										<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
											<Link
												to="/auth"
												className="rounded-lg bg-white p-6 transition-shadow hover:shadow-lg"
											>
												<div className="mb-2 text-3xl">🔐</div>
												<h5 className="font-semibold text-gray-800">
													Autenticação
												</h5>
												<p className="text-sm text-gray-600">
													Sistema de login e registro
												</p>
											</Link>
											<Link
												to="/rickmorty"
												className="rounded-lg bg-white p-6 transition-shadow hover:shadow-lg"
											>
												<div className="mb-2 text-3xl">👽</div>
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
