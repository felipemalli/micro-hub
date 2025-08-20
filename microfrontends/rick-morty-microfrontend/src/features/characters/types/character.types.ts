export interface Character {
	id: number;
	name: string;
	status: "Alive" | "Dead" | "unknown";
	species: string;
	type: string;
	gender: "Female" | "Male" | "Genderless" | "unknown";
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

export interface CharacterFilters {
	name?: string;
	status?: Character["status"] | "";
	species?: string;
	gender?: Character["gender"] | "";
}

export interface CharacterInteraction {
	characterId: number;
	isLiked: boolean;
	isFavorited: boolean;
	likesCount: number;
}

export interface CharacterListProps {
	onCharacterSelect?: (character: Character) => void;
}

export interface CharacterDetailProps {
	characterId?: number;
	onBack?: () => void;
}
