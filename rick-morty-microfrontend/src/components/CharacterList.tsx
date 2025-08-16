import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Character, ApiResponse, CharacterListProps, CharacterFilters, LoadingState } from '../types/rickmorty';

const CharacterList: React.FC<CharacterListProps> = ({ onCharacterSelect }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: true, error: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<CharacterFilters>({
    name: '',
    status: '',
    species: '',
    gender: ''
  });

  const fetchCharacters = async (page: number = 1, searchFilters: CharacterFilters = {}) => {
    setLoading({ isLoading: true, error: null });
    
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      
      if (searchFilters.name) params.append('name', searchFilters.name);
      if (searchFilters.status) params.append('status', searchFilters.status);
      if (searchFilters.species) params.append('species', searchFilters.species);
      if (searchFilters.gender) params.append('gender', searchFilters.gender);

      const response = await axios.get<ApiResponse<Character>>(
        `https://rickandmortyapi.com/api/character?${params.toString()}`
      );
      
      setCharacters(response.data.results);
      setTotalPages(response.data.info.pages);
      setCurrentPage(page);
      setLoading({ isLoading: false, error: null });
    } catch (error) {
      console.error('Erro ao buscar personagens:', error);
      setLoading({ 
        isLoading: false, 
        error: 'Erro ao carregar personagens. Tente novamente.' 
      });
    }
  };

  useEffect(() => {
    fetchCharacters(1, filters);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    fetchCharacters(1, newFilters);
  };

  const handlePageChange = (page: number) => {
    fetchCharacters(page, filters);
  };

  const getStatusColor = (status: Character['status']) => {
    switch (status) {
      case 'Alive':
        return 'bg-green-100 text-green-800';
      case 'Dead':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getGenderIcon = (gender: Character['gender']) => {
    switch (gender) {
      case 'Male':
        return '♂️';
      case 'Female':
        return '♀️';
      case 'Genderless':
        return '⚪';
      default:
        return '❓';
    }
  };

  if (loading.isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando personagens...</p>
        </div>
      </div>
    );
  }

  if (loading.error) {
    return (
      <div className="text-center p-12">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Ops! Algo deu errado</h3>
        <p className="text-gray-600 mb-6">{loading.error}</p>
        <button 
          onClick={() => fetchCharacters(currentPage, filters)}
          className="btn-primary"
        >
          🔄 Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Filtros */}
      <div className="mb-6 bg-gray-50 rounded-xl p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">🔍 Filtros de busca</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="Ex: Rick"
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="form-input"
            >
              <option value="">Todos</option>
              <option value="alive">Vivo</option>
              <option value="dead">Morto</option>
              <option value="unknown">Desconhecido</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Espécie</label>
            <input
              type="text"
              name="species"
              value={filters.species}
              onChange={handleFilterChange}
              placeholder="Ex: Human"
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="form-input"
            >
              <option value="">Todos</option>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
              <option value="genderless">Sem gênero</option>
              <option value="unknown">Desconhecido</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de personagens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {characters.map((character) => (
          <div
            key={character.id}
            className="card cursor-pointer group"
            onClick={() => onCharacterSelect?.(character)}
          >
            <div className="relative overflow-hidden rounded-t-2xl">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(character.status)}`}>
                  {character.status}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {character.name}
              </h3>
              
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="mr-2">🧬</span>
                  <span>{character.species}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">{getGenderIcon(character.gender)}</span>
                  <span>{character.gender}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📍</span>
                  <span className="truncate">{character.location.name}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Anterior
          </button>
          
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    page === currentPage
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próxima →
          </button>
        </div>
      )}

      {/* Info da página */}
      <div className="text-center mt-4 text-sm text-gray-500">
        Página {currentPage} de {totalPages} • {characters.length} personagens
      </div>
    </div>
  );
};

export default CharacterList;