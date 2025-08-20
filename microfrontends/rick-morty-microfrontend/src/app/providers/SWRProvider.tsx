import React from "react";
import { SWRConfig } from "swr";
import { rickMortyApi } from "../../shared/services/api";
import { swrConfig } from "../../shared/config/swr.config";

interface SWRProviderProps {
	children: React.ReactNode;
}

// Fetcher genérico para SWR que usa nossa instância do axios
const fetcher = async (url: string) => {
	// Remove o baseURL do início da URL se estiver presente
	const endpoint = url.replace("https://rickandmortyapi.com/api", "");
	return rickMortyApi.get(endpoint);
};

// Fetcher para URLs com parâmetros
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

// Export do fetcher com parâmetros para uso em hooks específicos
export { fetcherWithParams };
