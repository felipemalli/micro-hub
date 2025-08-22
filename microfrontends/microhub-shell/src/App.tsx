import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ErrorFallback } from "./components/ErrorFallback";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { useAuth } from "./hooks/useAuth";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ContentSection } from "./components/ContentSection";

const AuthApp = lazy(() => import("./microfrontends/AuthApp"));
const RickMortyApp = lazy(() => import("./microfrontends/RickMortyApp"));

const App: React.FC = () => {
	const { isAuthenticated, handleAuthChange } = useAuth();

	return (
		<Router>
			<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
				<Navbar isAuthenticated={isAuthenticated} />
				<main>
					<Routes>
						<Route path="/" element={<ContentSection />} />
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
