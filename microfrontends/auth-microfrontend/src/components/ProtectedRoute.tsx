import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
	children: React.ReactNode;
	requiredRole?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	children,
	requiredRole,
}) => {
	const { isAuthenticated, user, loading } = useAuth();
	const location = useLocation();

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
					<p className="mt-4 text-gray-600">Carregando...</p>
				</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/auth/login" state={{ from: location }} replace />;
	}

	if (requiredRole && user?.role !== requiredRole) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<h3>Acesso Negado</h3>
					<p className="text-gray-600">
						Você não tem permissão para acessar esta página.
					</p>
				</div>
			</div>
		);
	}

	return <>{children}</>;
};
