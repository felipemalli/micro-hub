import { useLocalStorage } from '../../../shared/hooks/useLocalStorage';

interface LikesData {
  [characterId: number]: number;
}

export const useCharacterLikes = () => {
  const [likes, setLikes] = useLocalStorage<LikesData>('rick-morty-likes', {});
  const [userLikes, setUserLikes] = useLocalStorage<number[]>('rick-morty-user-likes', []);

  const getLikesCount = (characterId: number): number => {
    return likes[characterId] || 0;
  };

  const isLiked = (characterId: number): boolean => {
    return userLikes.includes(characterId);
  };

  const toggleLike = (characterId: number) => {
    const currentLikes = getLikesCount(characterId);
    const wasLiked = isLiked(characterId);

    if (wasLiked) {
      // Remove like
      setLikes({
        ...likes,
        [characterId]: Math.max(0, currentLikes - 1)
      });
      setUserLikes(userLikes.filter(id => id !== characterId));
    } else {
      // Add like
      setLikes({
        ...likes,
        [characterId]: currentLikes + 1
      });
      setUserLikes([...userLikes, characterId]);
    }
  };

  return {
    getLikesCount,
    isLiked,
    toggleLike,
  };
}; 