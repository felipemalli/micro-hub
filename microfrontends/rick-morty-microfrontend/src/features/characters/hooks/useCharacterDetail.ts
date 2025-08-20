import { useParams } from "react-router-dom";
import useSWR from "swr";
import { Character } from "../types/character.types";
import { characterDetailConfig } from "../../../shared/config/swr.config";

interface UseCharacterDetailParams {
	characterId?: number;
}

interface UseCharacterDetailReturn {
	character: Character | null;
	isLoading: boolean;
	error: string | null;
	characterId: number | null;
	mutate: () => void;
}

export const useCharacterDetail = ({
	characterId,
}: UseCharacterDetailParams = {}): UseCharacterDetailReturn => {
	const { id } = useParams<{ id: string }>();
	const finalCharacterId = characterId || (id ? parseInt(id) : null);

	const {
		data: character,
		error,
		isLoading,
		mutate,
	} = useSWR<Character>(
		finalCharacterId ? `/character/${finalCharacterId}` : null,
		characterDetailConfig
	);

	return {
		character: character ?? null,
		isLoading,
		error: error
			? "Erro ao carregar detalhes do personagem. Tente novamente."
			: null,
		characterId: finalCharacterId,
		mutate,
	};
};
