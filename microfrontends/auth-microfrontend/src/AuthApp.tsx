import "./index.css";
import "@felipemalli-libs/microhub-ui/styles.css";
import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { AppRouter } from "./app/router/AppRouter";
import { ErrorBoundary } from "./app/providers/ErrorBoundary";
import { AuthProvider } from "./app/providers/AuthProvider";
import { AuthAppProps } from "./types/auth";
import { History } from "history";

const AuthApp: React.FC<
	AuthAppProps & { history?: History; isAuthenticated?: boolean }
> = ({ onAuthChange, history }) => {
	const [location, setLocation] = useState(
		history?.location || { pathname: "/auth" }
	);

	useEffect(() => {
		if (history) {
			setLocation(history.location);

			const unlisten = history.listen((update: any) => {
				setLocation(update.location || history.location);
			});
			return unlisten;
		}
	}, [history]);

	return (
		<ErrorBoundary>
			<AuthProvider onAuthChange={onAuthChange}>
				<Router location={location} navigator={history}>
					<AppRouter />
				</Router>
			</AuthProvider>
		</ErrorBoundary>
	);
};

export default AuthApp;
