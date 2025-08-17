import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { Character, ApiResponse, CharacterListProps, CharacterFilters, LoadingState } from '../types/rickmorty';

// // @ts-ignore
// const Button = React.lazy(() => import('sharedComponents/Button'));
// // @ts-ignore
// const Card = React.lazy(() => import('sharedComponents/Card'));

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

      console.log(response);
      
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
      <Suspense fallback={<div>Loading...</div>}>
        {/* <Card variant="elevated" padding="lg" className="text-center max-w-md mx-auto"> */}
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Ops! Algo deu errado</h3>
          <p className="text-gray-600 mb-4">{loading.error}</p>
          <button onClick={() => fetchCharacters(currentPage, filters)}>Tentar novamente</button>
          {/* <Button 
            variant="primary"
            onClick={() => fetchCharacters(currentPage, filters)}
          >
            Tentar novamente
          </Button> */}
        {/* </Card> */}
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div className="flex justify-center p-4"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div></div>}>
      <div className="space-y-6 p-6">
        {/* Filtros */}
        {/* <Card variant="glass" padding="md"> */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">🔍 Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
                placeholder="Buscar por nome..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                placeholder="Ex: Human, Alien..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
              <select
                name="gender"
                value={filters.gender}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Todos</option>
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="genderless">Sem gênero</option>
                <option value="unknown">Desconhecido</option>
              </select>
            </div>
          </div>
        {/* </Card> */}

        {/* Lista de personagens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {characters.map((character) => (
            // <Card 
            //   key={character.id}
            //   variant="elevated"
            //   padding="none"
            //   hover={true}
            //   onClick={() => onCharacterSelect(character)}
            //   className="overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-200"
            // >
  
            <div key={character.id} className="card cursor-pointer group" onClick={() => onCharacterSelect(character)}>
              <div className="relative">
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(character.status)}`}>
                    {character.status === 'Alive' ? 'Vivo' : character.status === 'Dead' ? 'Morto' : 'Desconhecido'}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">
                  {character.name}
                </h3>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Espécie:</span>
                    <span>{character.species}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Gênero:</span>
                    <span className="flex items-center gap-1">
                      {getGenderIcon(character.gender)}
                      {character.gender === 'Male' ? 'Masculino' : 
                       character.gender === 'Female' ? 'Feminino' : 
                       character.gender === 'Genderless' ? 'Sem gênero' : 'Desconhecido'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Origem:</span>
                    <span className="truncate ml-2">{character.origin.name}</span>
                  </div>
                </div>
              </div>
              </div>
            // </Card>
          ))}
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          // <Card variant="glass" padding="md">
          <>
            <div className="flex items-center justify-center space-x-2">
              {/* <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ← Anterior
              </Button> */}
              
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  return (
                  
                      <div>
                    {/* <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button> */}
                    </div>
                  );
                })}
              </div>
              
              {/* <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Próxima →
              </Button> */}
            </div>
            
            <div className="text-center mt-3 text-sm text-gray-600">
              Página {currentPage} de {totalPages}
            </div>

          </>
          // </Card>
        )}
      </div>
    </Suspense>
  );
};

export default CharacterList;