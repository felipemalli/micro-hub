import { SWRConfiguration } from "swr";

export const swrConfig: SWRConfiguration = {
	// Configurações de cache
	dedupingInterval: 2000, // Deduplica requisições por 2 segundos

	// Configurações de revalidação
	revalidateOnFocus: false, // Não revalida quando a janela ganha foco
	revalidateOnReconnect: true, // Revalida quando reconecta à internet
	revalidateIfStale: true, // Revalida dados antigos em background

	// Configurações de retry
	errorRetryCount: 3, // Tenta 3 vezes em caso de erro
	errorRetryInterval: 5000, // Intervalo de 5s entre tentativas

	// Configurações de throttle
	focusThrottleInterval: 5000, // Throttle de revalidação no foco

	// Não atualiza automaticamente
	refreshInterval: 0,

	// Handler global de erro
	onError: (error) => {
		console.error("SWR Error:", error);
	},
};

// Configurações específicas para diferentes tipos de dados
export const characterListConfig: Partial<SWRConfiguration> = {
	dedupingInterval: 2 * 60 * 1000, // 2 minutos para lista
	errorRetryCount: 2,
	errorRetryInterval: 3000,
};

export const characterDetailConfig: Partial<SWRConfiguration> = {
	dedupingInterval: 10 * 60 * 1000, // 10 minutos para detalhes
	errorRetryCount: 2,
	errorRetryInterval: 3000,
};
