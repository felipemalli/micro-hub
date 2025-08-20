import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { characterApi } from "../services/characterApi";
import { Character } from "../types/character.types";
import { LoadingState } from "../../../shared/types/common.types";

export const useCharacterDetail = (characterId?: number) => {
	const { id } = useParams<{ id: string }>();
	const [character, setCharacter] = useState<Character | null>(null);
	const [loading, setLoading] = useState<LoadingState>({
		isLoading: true,
		error: null,
	});

	const finalCharacterId = characterId || (id ? parseInt(id) : null);

	useEffect(() => {
		if (!finalCharacterId) {
			setLoading({
				isLoading: false,
				error: "ID do personagem não encontrado",
			});
			return;
		}

		const fetchCharacterDetail = async () => {
			setLoading({ isLoading: true, error: null });

			try {
				const characterData = await characterApi.getCharacter(finalCharacterId);
				setCharacter(characterData);
				setLoading({ isLoading: false, error: null });
			} catch (error) {
				console.error("Erro ao buscar detalhes do personagem:", error);
				setLoading({
					isLoading: false,
					error: "Erro ao carregar detalhes do personagem. Tente novamente.",
				});
			}
		};

		fetchCharacterDetail();
	}, [finalCharacterId]);

	return {
		character,
		loading,
		characterId: finalCharacterId,
	};
};
