import React from 'react';
import { Button } from '../../../../../shared/components/Button/Button';
import { useFavorites } from '../../../hooks/useFavorites';

interface FavoriteButtonProps {
  characterId: number;
  variant?: 'icon' | 'text';
  size?: 'sm' | 'md' | 'lg';
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  characterId, 
  variant = 'icon',
  size = 'sm'
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(characterId);

  return (
    <Button
      variant={favorited ? 'primary' : 'ghost'}
      size={size}
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(characterId);
      }}
      className={`${favorited ? 'text-red-500 bg-red-50 hover:bg-red-100' : 'text-gray-500 hover:text-red-500'} border-none`}
      title={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      {variant === 'icon' ? (
        <span className="text-lg">{favorited ? '❤️' : '🤍'}</span>
      ) : (
        favorited ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'
      )}
    </Button>
  );
};