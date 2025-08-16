// Tipos para a API do Rick & Morty

export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface ApiResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

// Props dos componentes
export interface CharacterListProps {
  onCharacterSelect?: (character: Character) => void;
}

export interface CharacterDetailProps {
  characterId: number;
  onBack?: () => void;
}

export interface EpisodeListProps {
  onEpisodeSelect?: (episode: Episode) => void;
}

export interface LocationListProps {
  onLocationSelect?: (location: Location) => void;
}

export interface RickMortyAppProps {
  // Props opcionais para o app principal
  initialView?: 'characters' | 'episodes' | 'locations';
}

// Estados de loading
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Filtros de busca
export interface CharacterFilters {
  name?: string;
  status?: Character['status'] | '';
  species?: string;
  gender?: Character['gender'] | '';
}

export interface EpisodeFilters {
  name?: string;
  episode?: string;
}

export interface LocationFilters {
  name?: string;
  type?: string;
  dimension?: string;
}