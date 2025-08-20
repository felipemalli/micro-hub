import { useState, useEffect, useCallback } from "react";
import { characterApi } from "../services/characterApi";
import { Character, CharacterFilters } from "../types/character.types";
import {
	LoadingState,
	PaginationInfo,
} from "../../../shared/types/common.types";

export const useCharacters = () => {
	const [characters, setCharacters] = useState<Character[]>([]);
	const [loading, setLoading] = useState<LoadingState>({
		isLoading: true,
		error: null,
	});
	const [pagination, setPagination] = useState<PaginationInfo>({
		currentPage: 1,
		totalPages: 1,
		hasNext: false,
		hasPrev: false,
	});
	const [filters, setFilters] = useState<CharacterFilters>({
		name: "",
		status: "",
		species: "",
		gender: "",
	});

	const fetchCharacters = useCallback(
		async (page: number = 1, searchFilters: CharacterFilters = {}) => {
			setLoading({ isLoading: true, error: null });

			try {
				const response = await characterApi.getCharacters(page, searchFilters);

				setCharacters(response.results);
				setPagination({
					currentPage: page,
					totalPages: response.info.pages,
					hasNext: !!response.info.next,
					hasPrev: !!response.info.prev,
				});
				setLoading({ isLoading: false, error: null });
			} catch (error) {
				console.error("Erro ao buscar personagens:", error);
				setLoading({
					isLoading: false,
					error: "Erro ao carregar personagens. Tente novamente.",
				});
			}
		},
		[]
	);

	const updateFilters = useCallback(
		(newFilters: Partial<CharacterFilters>) => {
			const updatedFilters = { ...filters, ...newFilters };
			setFilters(updatedFilters);
			fetchCharacters(1, updatedFilters);
		},
		[filters, fetchCharacters]
	);

	const changePage = useCallback(
		(page: number) => {
			fetchCharacters(page, filters);
		},
		[filters, fetchCharacters]
	);

	const refetch = useCallback(() => {
		fetchCharacters(pagination.currentPage, filters);
	}, [fetchCharacters, pagination.currentPage, filters]);

	useEffect(() => {
		fetchCharacters(1, filters);
	}, []);

	return {
		characters,
		loading,
		pagination,
		filters,
		updateFilters,
		changePage,
		refetch,
	};
};
