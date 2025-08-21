import "./styles/globals.css";
import "@felipemalli-libs/microhub-ui/styles.css";
import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { AppRouter } from "./app/router/AppRouter";
import { ErrorBoundary } from "./app/providers/ErrorBoundary/ErrorBoundary";
import { SWRProvider } from "./app/providers/SWRProvider";
import { History } from "history";

const App: React.FC<{ history?: History; isAuthenticated?: boolean }> = ({
	history,
	isAuthenticated,
}) => {
	const [location, setLocation] = useState(
		history?.location || { pathname: "/rickmorty" }
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
		<ErrorBoundary context="AuthApp">
			<SWRProvider>
				<Router location={location} navigator={history}>
					<div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
						<AppRouter isAuthenticated={isAuthenticated} />
					</div>
				</Router>
			</SWRProvider>
		</ErrorBoundary>
	);
};

export default App;
