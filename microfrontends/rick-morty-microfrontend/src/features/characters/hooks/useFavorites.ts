import { useLocalStorage } from '../../../shared/hooks/useLocalStorage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage<number[]>('rick-morty-favorites', []);

  const addToFavorites = (characterId: number) => {
    if (!favorites.includes(characterId)) {
      setFavorites([...favorites, characterId]);
    }
  };

  const removeFromFavorites = (characterId: number) => {
    setFavorites(favorites.filter(id => id !== characterId));
  };

  const isFavorite = (characterId: number) => {
    return favorites.includes(characterId);
  };

  const toggleFavorite = (characterId: number) => {
    if (isFavorite(characterId)) {
      removeFromFavorites(characterId);
    } else {
      addToFavorites(characterId);
    }
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    favoritesCount: favorites.length,
  };
}; 