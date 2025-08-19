import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCharacters } from '../../hooks/useCharacters';
import { useFavorites } from '../../hooks/useFavorites';
import { CharacterCard } from './components/CharacterCard';
import { CharacterFilters } from './components/CharacterFilters';
import { Loading } from '../../../../shared/components/Loading/Loading';
import { Button } from '../../../../shared/components/Button/Button';
import { Character } from '../../types/character.types';

export const CharacterListPage: React.FC = () => {
  const navigate = useNavigate();
  const { characters, loading, pagination, filters, updateFilters, changePage } = useCharacters();
  const { favoritesCount } = useFavorites();

  const handleCharacterSelect = (character: Character) => {
    navigate(`/rickmorty/characters/${character.id}`);
  };

  if (loading.isLoading && characters.length === 0) {
    return <Loading message="Carregando personagens..." />;
  }

  if (loading.error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-600 mb-4">
          <span className="text-4xl">⚠️</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Erro ao carregar</h3>
        <p className="text-gray-600 mb-4">{loading.error}</p>
        <Button onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header com estatísticas */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Personagens</h2>
          <p className="text-gray-600">
            {characters.length} personagens • {favoritesCount} favoritos
          </p>
        </div>
      </div>

      {/* Filtros */}
      <CharacterFilters 
        filters={filters} 
        onFiltersChange={updateFilters} 
      />

      {/* Loading overlay para filtros */}
      {loading.isLoading && characters.length > 0 && (
        <div className="text-center py-4">
          <span className="text-blue-600">Atualizando resultados...</span>
        </div>
      )}

      {/* Grid de personagens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onClick={handleCharacterSelect}
          />
        ))}
      </div>

      {/* Paginação */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4">
          <Button
            variant="outline"
            disabled={!pagination.hasPrev || loading.isLoading}
            onClick={() => changePage(pagination.currentPage - 1)}
          >
            ← Anterior
          </Button>
          
          <span className="text-gray-600">
            Página {pagination.currentPage} de {pagination.totalPages}
          </span>
          
          <Button
            variant="outline"
            disabled={!pagination.hasNext || loading.isLoading}
            onClick={() => changePage(pagination.currentPage + 1)}
          >
            Próxima →
          </Button>
        </div>
      )}
    </div>
  );
};