import React, { useRef, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface MicrofrontendWrapperProps {
	mount: (el: HTMLElement, options: any) => any;
	[key: string]: any;
}

const MicrofrontendWrapper: React.FC<MicrofrontendWrapperProps> = ({
	mount,
	...additionalProps
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const location = useLocation();
	const listenersRef = useRef<Set<(update: any) => void>>(new Set());

	// Create a history proxy that uses the shell app's navigation
	const sharedHistory = useMemo(() => {
		const history = {
			location: {
				pathname: location.pathname,
				search: location.search,
				hash: location.hash,
				state: location.state,
				key: location.key || "default",
			},
			push: (path: string) => {
				navigate(path);
			},
			replace: (path: string) => {
				navigate(path, { replace: true });
			},
			go: (delta: number) => {
				window.history.go(delta);
			},
			back: () => {
				window.history.back();
			},
			forward: () => {
				window.history.forward();
			},
			listen: (callback: (update: any) => void) => {
				listenersRef.current.add(callback);
				return () => {
					listenersRef.current.delete(callback);
				};
			},
		};

		return history;
	}, [navigate, location]);

	// Notify all listeners when location changes
	useEffect(() => {
		listenersRef.current.forEach((callback) => {
			callback({
				location: sharedHistory.location,
				action: "POP", // or 'PUSH'/'REPLACE' based on how we got here
			});
		});
	}, [location, sharedHistory]);

	// Mount only once
	useEffect(() => {
		const mountMicrofrontend = async () => {
			if (ref.current && mount) {
				try {
					const mountOptions = {
						initialPath: location.pathname,
						sharedHistory, // Pass the shared history instead of callbacks
						...additionalProps,
					};

					await mount(ref.current, mountOptions);
				} catch (error) {
					console.error("Error mounting microfrontend:", error);
				}
			}
		};

		mountMicrofrontend();
	}, []);

	return <div ref={ref} />;
};

export default MicrofrontendWrapper;
