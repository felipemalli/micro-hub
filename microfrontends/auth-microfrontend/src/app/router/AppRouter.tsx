import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage, RegisterPage, ProfilePage } from "../../pages";
import { useAuth } from "../providers/AuthProvider";

export const AppRouter: React.FC = () => {
	const { isAuthenticated, user, loading } = useAuth();

	useEffect(() => {
		console.log("AppRouter: Auth state changed", {
			isAuthenticated,
			user,
			loading,
		});
	}, [isAuthenticated, user, loading]);

	// Show loading while auth state is being determined
	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
					<p className="mt-4 text-gray-600">Carregando...</p>
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
						<LoginPage />
					)
				}
			/>
			<Route
				path="/auth/register"
				element={
					isAuthenticated ? (
						<Navigate to="/auth/profile" replace />
					) : (
						<RegisterPage />
					)
				}
			/>
			<Route
				path="/auth/profile"
				element={
					isAuthenticated ? (
						<ProfilePage />
					) : (
						<Navigate to="/auth/login" replace />
					)
				}
			/>
		</Routes>
	);
};
