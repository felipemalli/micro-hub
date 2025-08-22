import { useParams } from "react-router-dom";
import useSWR from "swr";
import { useMemo } from "react";
import { Character } from "@/features/characters/types/character.types";
import { swrConfig, useApiError } from "@/shared";

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
	const handleApiError = useApiError();
	const finalCharacterId = characterId || (id ? parseInt(id) : null);

	const {
		data: character,
		error,
		isLoading,
		mutate,
	} = useSWR<Character>(
		finalCharacterId ? `/character/${finalCharacterId}` : null,
		{
			...swrConfig,
			onError: (error) => {
				console.error("Error loading character detail:", error);
			},
		}
	);

	const errorMessage = useMemo(() => {
		if (!error) return null;

		if (error.shouldShowInBoundary) {
			handleApiError(error);
			return null;
		}

		return (
			error.message ||
			"Erro ao carregar detalhes do personagem. Tente novamente."
		);
	}, [error, handleApiError]);

	return {
		character: character ?? null,
		isLoading,
		error: errorMessage,
		characterId: finalCharacterId,
		mutate,
	};
};
