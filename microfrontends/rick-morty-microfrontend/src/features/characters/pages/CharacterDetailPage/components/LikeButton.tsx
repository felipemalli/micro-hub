import React from 'react';
import { Button } from '../../../../../shared/components/Button/Button';
import { useCharacterLikes } from '../../../hooks/useCharacterLikes';

interface LikeButtonProps {
  characterId: number;
  showCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const LikeButton: React.FC<LikeButtonProps> = ({ 
  characterId, 
  showCount = true,
  size = 'sm'
}) => {
  const { getLikesCount, isLiked, toggleLike } = useCharacterLikes();
  const liked = isLiked(characterId);
  const likesCount = getLikesCount(characterId);

  return (
    <Button
      variant="outline"
      size={size}
      onClick={(e) => {
        e.stopPropagation();
        toggleLike(characterId);
      }}
      className="flex items-center space-x-1 border-none"
      title={liked ? 'Remover curtida' : 'Curtir personagem'}
    >
      <span className={`${liked ? 'text-blue-500' : 'text-gray-500'} transition-colors`}>
        {liked ? '👍' : '👍🏻'}
      </span>
      {showCount && <span className="text-sm font-medium">{likesCount}</span>}
    </Button>
  );
};