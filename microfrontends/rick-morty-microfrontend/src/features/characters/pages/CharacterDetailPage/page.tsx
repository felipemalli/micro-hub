import React from 'react';
import { useCharacterDetail } from '../../hooks/useCharacterDetail';
import { FavoriteButton } from './components/FavoriteButton';
import { LikeButton } from './components/LikeButton';
import { Badge } from '../../../../shared/components/Badge/Badge';
import { Button } from '../../../../shared/components/Button/Button';
import { Loading } from '../../../../shared/components/Loading/Loading';
import { CharacterDetailProps } from '../../types/character.types';
import { useHistory } from '../../../../app/providers/HistoryProvider';

export const CharacterDetailPage: React.FC<CharacterDetailProps> = ({ 
  characterId, 
  onBack 
}) => {
  const { character, loading } = useCharacterDetail(characterId);

  const history = useHistory();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (history) {
      history.push('/rickmorty/characters');
    } else {
      // Fallback se não tiver history
      window.history.back();
    }
  };

  if (loading.isLoading) {
    return <Loading message="Carregando detalhes do personagem..." />;
  }

  if (loading.error || !character) {
    return (
      <div className="text-center p-8">
        <div className="text-red-600 mb-4">
          <span className="text-4xl">⚠️</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Erro ao carregar</h3>
        <p className="text-gray-600 mb-4">
          {loading.error || 'Personagem não encontrado'}
        </p>
        <Button onClick={handleBack}>
          Voltar para lista
        </Button>
      </div>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Alive': return 'success';
      case 'Dead': return 'danger';
      default: return 'warning';
    }
  };

  return (
    <div className="p-6">
      {/* Header com botão voltar */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={handleBack}>
          ← Voltar
        </Button>
        <div className="flex space-x-2">
          <LikeButton characterId={character.id} size="md" />
          <FavoriteButton characterId={character.id} variant="text" size="md" />
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Imagem */}
        <div className="flex justify-center">
          <img
            src={character.image}
            alt={character.name}
            className="w-full max-w-md rounded-2xl shadow-lg"
          />
        </div>

        {/* Informações */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {character.name}
            </h1>
            <Badge variant={getStatusVariant(character.status)} size="md">
              {character.status}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Informações Básicas</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Espécie:</span>
                  <span className="text-gray-800">{character.species}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Gênero:</span>
                  <span className="text-gray-800">{character.gender}</span>
                </div>
                {character.type && (
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Tipo:</span>
                    <span className="text-gray-800">{character.type}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Localização</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Origem:</span>
                  <p className="text-gray-800">{character.origin.name}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Última localização:</span>
                  <p className="text-gray-800">{character.location.name}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Episódios</h3>
              <p className="text-sm text-gray-600">
                Aparece em <span className="font-medium text-gray-800">{character.episode.length}</span> episódios
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 