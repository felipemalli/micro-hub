import { SWRConfiguration } from "swr";

export const swrConfig: SWRConfiguration = {
	dedupingInterval: 2000,
	revalidateOnFocus: false,
	revalidateOnReconnect: true,
	revalidateIfStale: true,
	errorRetryCount: 2,
	errorRetryInterval: 3000,
	refreshInterval: 0,
	onError: (error) => {
		console.error("SWR Error:", error);
	},
};
