import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Location, ApiResponse, LocationListProps, LocationFilters, LoadingState } from '../types/rickmorty';

const LocationList: React.FC<LocationListProps> = ({ onLocationSelect }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: true, error: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<LocationFilters>({
    name: '',
    type: '',
    dimension: ''
  });

  const fetchLocations = async (page: number = 1, searchFilters: LocationFilters = {}) => {
    setLoading({ isLoading: true, error: null });
    
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      
      if (searchFilters.name) params.append('name', searchFilters.name);
      if (searchFilters.type) params.append('type', searchFilters.type);
      if (searchFilters.dimension) params.append('dimension', searchFilters.dimension);

      const response = await axios.get<ApiResponse<Location>>(
        `https://rickandmortyapi.com/api/location?${params.toString()}`
      );
      
      setLocations(response.data.results);
      setTotalPages(response.data.info.pages);
      setCurrentPage(page);
      setLoading({ isLoading: false, error: null });
    } catch (error) {
      console.error('Erro ao buscar localizações:', error);
      setLoading({ 
        isLoading: false, 
        error: 'Erro ao carregar localizações. Tente novamente.' 
      });
    }
  };

  useEffect(() => {
    fetchLocations(1, filters);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    fetchLocations(1, newFilters);
  };

  const handlePageChange = (page: number) => {
    fetchLocations(page, filters);
  };

  const getLocationIcon = (type: string): string => {
    const typeIcons: { [key: string]: string } = {
      'Planet': '🪐',
      'Space station': '🛰️',
      'Microverse': '🔬',
      'TV': '📺',
      'Resort': '🏖️',
      'Fantasy town': '🏰',
      'Dream': '💭',
      'Dimension': '🌌',
      'unknown': '❓'
    };
    
    return typeIcons[type] || '🌍';
  };

  const getDimensionColor = (dimension: string): string => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-yellow-100 text-yellow-800',
      'bg-red-100 text-red-800',
      'bg-indigo-100 text-indigo-800',
      'bg-pink-100 text-pink-800',
      'bg-gray-100 text-gray-800'
    ];
    
    // Gerar cor baseada no hash da string
    let hash = 0;
    for (let i = 0; i < dimension.length; i++) {
      hash = dimension.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  if (loading.isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando localizações...</p>
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
          onClick={() => fetchLocations(currentPage, filters)}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome da localização</label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="Ex: Earth"
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <input
              type="text"
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              placeholder="Ex: Planet"
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dimensão</label>
            <input
              type="text"
              name="dimension"
              value={filters.dimension}
              onChange={handleFilterChange}
              placeholder="Ex: C-137"
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* Lista de localizações */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {locations.map((location) => (
          <div
            key={location.id}
            className="card cursor-pointer group"
            onClick={() => onLocationSelect?.(location)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {location.name}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDimensionColor(location.dimension)}`}>
                      {location.dimension}
                    </span>
                  </div>
                </div>
                <div className="text-3xl">
                  {getLocationIcon(location.type)}
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <span className="mr-2">🏷️</span>
                  <span><strong>Tipo:</strong> {location.type}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🌌</span>
                  <span><strong>Dimensão:</strong> {location.dimension}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">👥</span>
                  <span>{location.residents.length} residentes conhecidos</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  ID: {location.id}
                </span>
                <div className="text-blue-500 group-hover:text-blue-600 transition-colors">
                  <span className="text-sm">Ver detalhes →</span>
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
        Página {currentPage} de {totalPages} • {locations.length} localizações
      </div>

      {/* Estatísticas por tipo */}
      <div className="mt-8 bg-gray-50 rounded-xl p-4">
        <h4 className="font-semibold text-gray-800 mb-3">📊 Tipos de localização nesta página</h4>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(locations.map(loc => loc.type))).map(type => {
            const count = locations.filter(loc => loc.type === type).length;
            return (
              <div key={type} className="bg-white rounded-lg px-3 py-2 flex items-center space-x-2">
                <span className="text-lg">{getLocationIcon(type)}</span>
                <span className="text-sm font-medium text-gray-700">{type}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dimensões únicas */}
      <div className="mt-4 bg-gray-50 rounded-xl p-4">
        <h4 className="font-semibold text-gray-800 mb-3">🌌 Dimensões nesta página</h4>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(locations.map(loc => loc.dimension))).map(dimension => {
            const count = locations.filter(loc => loc.dimension === dimension).length;
            return (
              <span 
                key={dimension} 
                className={`px-3 py-1 rounded-full text-sm font-medium ${getDimensionColor(dimension)} flex items-center space-x-1`}
              >
                <span>{dimension}</span>
                <span className="text-xs opacity-75">({count})</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LocationList;