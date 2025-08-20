import { useMemo } from "react";
import useSWR from "swr";
import { Character, CharacterFilters } from "../types/character.types";
import { fetcherWithParams } from "../../../app/providers/SWRProvider";
import { characterListConfig } from "../../../shared/config/swr.config";

interface UseCharactersParams {
	page: number;
	filters: CharacterFilters;
}

interface UseCharactersReturn {
	characters: Character[];
	isLoading: boolean;
	error: string | null;
	pagination: {
		currentPage: number;
		totalPages: number;
		hasNext: boolean;
		hasPrev: boolean;
	};
	mutate: () => void;
}

export const useCharacters = ({
	page,
	filters,
}: UseCharactersParams): UseCharactersReturn => {
	// Cria uma chave única baseada nos parâmetros
	const cacheKey = useMemo(() => {
		const params: Record<string, string> = { page: page.toString() };

		// Só inclui filtros que têm valor
		if (filters.name?.trim()) params.name = filters.name.trim();
		if (filters.status) {
			params.status = filters.status;
		}
		if (filters.species?.trim()) params.species = filters.species.trim();
		if (filters.gender) {
			params.gender = filters.gender;
		}

		return ["/character", params] as const;
	}, [page, filters]);

	const { data, error, isLoading, mutate } = useSWR(
		cacheKey,
		fetcherWithParams,
		characterListConfig
	);

	const pagination = useMemo(() => {
		if (!data) {
			return {
				currentPage: page,
				totalPages: 1,
				hasNext: false,
				hasPrev: false,
			};
		}

		return {
			currentPage: page,
			totalPages: data.info.pages,
			hasNext: !!data.info.next,
			hasPrev: !!data.info.prev,
		};
	}, [data, page]);

	return {
		characters: data?.results ?? [],
		isLoading,
		error: error ? "Erro ao carregar personagens. Tente novamente." : null,
		pagination,
		mutate,
	};
};
