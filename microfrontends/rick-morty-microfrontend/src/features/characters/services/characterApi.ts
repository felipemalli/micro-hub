import { rickMortyApi, ApiResponse } from "@/shared";
import { Character, CharacterFilters } from "@characters/types/character.types";

export const characterApi = {
	getCharacters: async (
		page: number = 1,
		filters: CharacterFilters = {}
	): Promise<ApiResponse<Character>> => {
		const params: Record<string, string> = { page: page.toString() };

		if (filters.name) params.name = filters.name;
		if (filters.status) params.status = filters.status;
		if (filters.species) params.species = filters.species;
		if (filters.gender) params.gender = filters.gender;

		return rickMortyApi.get<ApiResponse<Character>>("/character", params);
	},

	getCharacter: async (id: number): Promise<Character> => {
		return rickMortyApi.get<Character>(`/character/${id}`);
	},
};
