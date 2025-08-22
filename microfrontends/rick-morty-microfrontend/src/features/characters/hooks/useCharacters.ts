import { useState, useCallback, useMemo } from "react";
import useSWR from "swr";
import {
	Character,
	CharacterFilters,
} from "@/features/characters/types/character.types";
import {
	fetcherWithParams,
	swrConfig,
	useApiError,
	buildQueryParams,
} from "@/shared";

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
	updateFilters: (newFilters: Partial<CharacterFilters>) => void;
	executeSearch: () => void;
	resetFilters: () => void;
	changePage: (newPage: number) => void;
	refetch: () => void;
}

const INITIAL_FILTERS: CharacterFilters = {
	name: "",
	status: "",
	species: "",
	gender: "",
};

export const useCharacters = (): UseCharactersReturn => {
	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState<CharacterFilters>(INITIAL_FILTERS);
	const [searchFilters, setSearchFilters] =
		useState<CharacterFilters>(INITIAL_FILTERS);

	const handleApiError = useApiError();

	const cacheKey = useMemo(
		() =>
			[
				"/character",
				buildQueryParams(
					page,
					searchFilters as Partial<Record<string, string>>
				),
			] as const,
		[page, searchFilters]
	);

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
		setFilters(INITIAL_FILTERS);
		setSearchFilters(INITIAL_FILTERS);
		setPage(1);
	}, []);

	const changePage = useCallback((newPage: number) => {
		setPage(newPage);
	}, []);

	const pagination = useMemo(
		() => ({
			currentPage: page,
			totalPages: data?.info?.pages ?? 1,
			hasNext: !!data?.info?.next,
			hasPrev: !!data?.info?.prev,
		}),
		[data, page]
	);

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
		updateFilters,
		executeSearch,
		resetFilters,
		changePage,
		refetch: mutate,
	};
};
