import { rickMortyApi } from '../../../shared/services/api';
import { Character, CharacterFilters } from '../types/character.types';
import { ApiResponse } from '../../../shared/types/common.types';

export const characterApi = {
  getCharacters: async (page: number = 1, filters: CharacterFilters = {}) => {
    const params: Record<string, string> = { page: page.toString() };
    
    if (filters.name) params.name = filters.name;
    if (filters.status) params.status = filters.status;
    if (filters.species) params.species = filters.species;
    if (filters.gender) params.gender = filters.gender;

    return rickMortyApi.get<ApiResponse<Character>>('/character', params);
  },

  getCharacter: async (id: number) => {
    return rickMortyApi.get<Character>(`/character/${id}`);
  },
}; 