import { useSWRConfig } from "swr";
import { useCallback } from "react";

export const useCacheInvalidation = () => {
	const { mutate } = useSWRConfig();

	// Invalida cache de um personagem específico
	const invalidateCharacter = useCallback(
		(characterId: number) => {
			mutate(`/character/${characterId}`);
		},
		[mutate]
	);

	// Invalida cache de lista de personagens (todas as páginas e filtros)
	const invalidateCharactersList = useCallback(() => {
		mutate(
			(key) =>
				typeof key === "object" &&
				Array.isArray(key) &&
				key[0] === "/character",
			undefined,
			{ revalidate: true }
		);
	}, [mutate]);

	// Invalida todo o cache
	const invalidateAll = useCallback(() => {
		mutate(() => true, undefined, { revalidate: true });
	}, [mutate]);

	return {
		invalidateCharacter,
		invalidateCharactersList,
		invalidateAll,
	};
};
