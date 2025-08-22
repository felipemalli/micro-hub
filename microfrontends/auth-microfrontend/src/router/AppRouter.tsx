import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage, RegisterPage, ProfilePage } from "../pages";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { ErrorBoundary } from "../providers/ErrorBoundary/ErrorBoundary";
import { useAuth } from "../hooks/useAuth";

export const AppRouter: React.FC = () => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
					<p className="mt-4">Carregando...</p>
				</div>
			</div>
		);
	}

	return (
		<Routes>
			<Route
				path="/auth"
				element={
					isAuthenticated ? (
						<Navigate to="/auth/profile" replace />
					) : (
						<Navigate to="/auth/login" replace />
					)
				}
			/>
			<Route
				path="/auth/login"
				element={
					isAuthenticated ? (
						<Navigate to="/auth/profile" replace />
					) : (
						<ErrorBoundary context="LoginPage">
							<LoginPage />
						</ErrorBoundary>
					)
				}
			/>
			<Route
				path="/auth/register"
				element={
					isAuthenticated ? (
						<Navigate to="/auth/profile" replace />
					) : (
						<ErrorBoundary context="RegisterPage">
							<RegisterPage />
						</ErrorBoundary>
					)
				}
			/>
			<Route
				path="/auth/profile"
				element={
					<ProtectedRoute>
						<ErrorBoundary context="ProfilePage">
							<ProfilePage />
						</ErrorBoundary>
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
};
