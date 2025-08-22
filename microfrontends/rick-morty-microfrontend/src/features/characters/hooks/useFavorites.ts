import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";

export const useFavorites = () => {
	const [favorites, setFavorites] = useLocalStorage<number[]>(
		"rick-morty-favorites",
		[]
	);

	const isFavorite = (characterId: number): boolean => {
		return favorites.includes(characterId);
	};

	const toggleFavorite = (characterId: number) => {
		if (isFavorite(characterId)) {
			setFavorites(favorites.filter((id) => id !== characterId));
		} else {
			setFavorites([...favorites, characterId]);
		}
	};

	return {
		favorites,
		isFavorite,
		toggleFavorite,
	};
};
