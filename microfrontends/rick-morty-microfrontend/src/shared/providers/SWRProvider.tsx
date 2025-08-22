import React from "react";
import { SWRConfig } from "swr";
import { rickMortyApi, swrConfig } from "@/shared";

interface SWRProviderProps {
	children: React.ReactNode;
}

const fetcher = async (url: string) => {
	const endpoint = url.replace("https://rickandmortyapi.com/api", "");
	return rickMortyApi.get(endpoint);
};

const fetcherWithParams = async ([url, params]: [
	string,
	Record<string, string>,
]) => {
	const endpoint = url.replace("https://rickandmortyapi.com/api", "");
	return rickMortyApi.get(endpoint, params);
};

export const SWRProvider: React.FC<SWRProviderProps> = ({ children }) => {
	return (
		<SWRConfig
			value={{
				...swrConfig,
				fetcher,
			}}
		>
			{children}
		</SWRConfig>
	);
};

export { fetcherWithParams };
