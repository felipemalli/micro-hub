import { useState, useCallback, useMemo } from "react";
import useSWR from "swr";
import { Character, CharacterFilters } from "../types/character.types";
import { fetcherWithParams } from "../../../app/providers/SWRProvider";
import { swrConfig } from "../../../shared/config/swr.config";
import { useApiError } from "../../../shared/hooks/useApiError";

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

	filters: CharacterFilters;
	searchFilters: CharacterFilters;
	updateFilters: (newFilters: Partial<CharacterFilters>) => void;
	executeSearch: () => void;
	resetFilters: () => void;

	changePage: (newPage: number) => void;
	refetch: () => void;
}

const initialFilters: CharacterFilters = {
	name: "",
	status: "",
	species: "",
	gender: "",
};

export const useCharacters = (): UseCharactersReturn => {
	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState<CharacterFilters>(initialFilters);
	const [searchFilters, setSearchFilters] =
		useState<CharacterFilters>(initialFilters);
	const handleApiError = useApiError();

	const cacheKey = useMemo(() => {
		const params: Record<string, string> = { page: page.toString() };

		if (searchFilters.name?.trim()) params.name = searchFilters.name.trim();
		if (searchFilters.status) params.status = searchFilters.status;
		if (searchFilters.species?.trim())
			params.species = searchFilters.species.trim();
		if (searchFilters.gender) params.gender = searchFilters.gender;

		return ["/character", params] as const;
	}, [page, searchFilters]);

	const { data, error, isLoading, mutate } = useSWR(
		cacheKey,
		fetcherWithParams,
		swrConfig
	);

	const updateFilters = useCallback((newFilters: Partial<CharacterFilters>) => {
		setFilters((prev) => ({ ...prev, ...newFilters }));
	}, []);

	const executeSearch = useCallback(() => {
		setSearchFilters(filters);
		setPage(1);
	}, [filters]);

	const resetFilters = useCallback(() => {
		setFilters(initialFilters);
		setSearchFilters(initialFilters);
		setPage(1);
	}, []);

	const changePage = useCallback((newPage: number) => {
		setPage(newPage);
	}, []);

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

	const errorMessage = useMemo(() => {
		if (!error) return null;

		if (error.shouldShowInBoundary) {
			handleApiError(error);
			return null;
		}

		return error.message || "Erro ao carregar personagens. Tente novamente.";
	}, [error, handleApiError]);

	return {
		characters: data?.results ?? [],
		isLoading,
		error: errorMessage,
		pagination,
		filters,
		searchFilters,
		updateFilters,
		executeSearch,
		resetFilters,
		changePage,
		refetch: mutate,
	};
};
