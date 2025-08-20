declare global {
	var process: {
		env: {
			NODE_ENV: "development" | "production" | "test";
			REACT_APP_API_URL?: string;
		};
	};
}

export {};
