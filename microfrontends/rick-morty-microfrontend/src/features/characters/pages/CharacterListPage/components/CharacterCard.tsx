import React from 'react';
import { Card } from '../../../../../shared/components/Card/Card';
import { Badge } from '../../../../../shared/components/Badge/Badge';
import { Character } from '../../../types/character.types';
import { FavoriteButton } from '../../CharacterDetailPage/components/FavoriteButton';
import { LikeButton } from '../../CharacterDetailPage/components/LikeButton';

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
  const getStatusVariant = (status: Character['status']) => {
    switch (status) {
      case 'Alive': return 'success';
      case 'Dead': return 'danger';
      default: return 'warning';
    }
  };

  return (
    <Card hover onClick={() => onClick(character)} className="relative group">
      <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <FavoriteButton characterId={character.id} />
      </div>
      <div className="aspect-square">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-800 truncate">
          {character.name}
        </h3>
        <div className="flex items-center justify-between mb-3">
          <Badge variant={getStatusVariant(character.status)}>
            {character.status}
          </Badge>
          <LikeButton characterId={character.id} />
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <p className='truncate text-ellipsis overflow-hidden'>
            <span>Espécie:</span> {character.species}
          </p>
          <p className='truncate text-ellipsis overflow-hidden'>
            <span>Gênero:</span> {character.gender}
          </p>
          <p className='truncate text-ellipsis overflow-hidden'>
            <span>Origem:</span> 
            <span>{character.origin.name}</span>
          </p>
        </div>
      </div>
    </Card>
  );
};