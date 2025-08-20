import { useState, useCallback } from "react";
import { CharacterFilters } from "../types/character.types";

interface UseCharacterFiltersReturn {
	page: number;
	filters: CharacterFilters;
	searchFilters: CharacterFilters;
	updateFilters: (newFilters: Partial<CharacterFilters>) => void;
	executeSearch: () => void;
	changePage: (newPage: number) => void;
	resetFilters: () => void;
}

const initialFilters: CharacterFilters = {
	name: "",
	status: "",
	species: "",
	gender: "",
};

export const useCharacterFilters = (): UseCharacterFiltersReturn => {
	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState<CharacterFilters>(initialFilters);
	const [searchFilters, setSearchFilters] =
		useState<CharacterFilters>(initialFilters);

	const updateFilters = useCallback((newFilters: Partial<CharacterFilters>) => {
		setFilters((prev) => ({ ...prev, ...newFilters }));
	}, []);

	const executeSearch = useCallback(() => {
		setSearchFilters(filters);
		setPage(1); // Reset para primeira página quando executa pesquisa
	}, [filters]);

	const changePage = useCallback((newPage: number) => {
		setPage(newPage);
	}, []);

	const resetFilters = useCallback(() => {
		setFilters(initialFilters);
		setSearchFilters(initialFilters);
		setPage(1);
	}, []);

	return {
		page,
		filters,
		searchFilters,
		updateFilters,
		executeSearch,
		changePage,
		resetFilters,
	};
};
