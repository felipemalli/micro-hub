import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Episode, ApiResponse, EpisodeListProps, EpisodeFilters, LoadingState } from '../types/rickmorty';

const EpisodeList: React.FC<EpisodeListProps> = ({ onEpisodeSelect }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: true, error: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<EpisodeFilters>({
    name: '',
    episode: ''
  });

  const fetchEpisodes = async (page: number = 1, searchFilters: EpisodeFilters = {}) => {
    setLoading({ isLoading: true, error: null });
    
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      
      if (searchFilters.name) params.append('name', searchFilters.name);
      if (searchFilters.episode) params.append('episode', searchFilters.episode);

      const response = await axios.get<ApiResponse<Episode>>(
        `https://rickandmortyapi.com/api/episode?${params.toString()}`
      );
      
      setEpisodes(response.data.results);
      setTotalPages(response.data.info.pages);
      setCurrentPage(page);
      setLoading({ isLoading: false, error: null });
    } catch (error) {
      console.error('Erro ao buscar episódios:', error);
      setLoading({ 
        isLoading: false, 
        error: 'Erro ao carregar episódios. Tente novamente.' 
      });
    }
  };

  useEffect(() => {
    fetchEpisodes(1, filters);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    fetchEpisodes(1, newFilters);
  };

  const handlePageChange = (page: number) => {
    fetchEpisodes(page, filters);
  };

  const getSeasonFromEpisode = (episodeCode: string): number => {
    const match = episodeCode.match(/S(\d+)/);
    return match ? parseInt(match[1]) : 1;
  };

  const getSeasonColor = (season: number): string => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-yellow-100 text-yellow-800',
      'bg-red-100 text-red-800',
      'bg-indigo-100 text-indigo-800'
    ];
    return colors[(season - 1) % colors.length];
  };

  if (loading.isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando episódios...</p>
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
          onClick={() => fetchEpisodes(currentPage, filters)}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do episódio</label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="Ex: Pilot"
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Código do episódio</label>
            <input
              type="text"
              name="episode"
              value={filters.episode}
              onChange={handleFilterChange}
              placeholder="Ex: S01E01"
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* Lista de episódios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {episodes.map((episode) => {
          const season = getSeasonFromEpisode(episode.episode);
          return (
            <div
              key={episode.id}
              className="card cursor-pointer group"
              onClick={() => onEpisodeSelect?.(episode)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {episode.name}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeasonColor(season)}`}>
                        Temporada {season}
                      </span>
                      <span className="text-sm text-gray-500">{episode.episode}</span>
                    </div>
                  </div>
                  <div className="text-2xl">📺</div>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <span className="mr-2">📅</span>
                    <span>Exibido em: {episode.air_date}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">👥</span>
                    <span>{episode.characters.length} personagens</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    ID: {episode.id}
                  </span>
                  <div className="text-blue-500 group-hover:text-blue-600 transition-colors">
                    <span className="text-sm">Ver detalhes →</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
        Página {currentPage} de {totalPages} • {episodes.length} episódios
      </div>

      {/* Estatísticas por temporada */}
      <div className="mt-8 bg-gray-50 rounded-xl p-4">
        <h4 className="font-semibold text-gray-800 mb-3">📊 Estatísticas</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[1, 2, 3, 4, 5].map(season => {
            const seasonEpisodes = episodes.filter(ep => getSeasonFromEpisode(ep.episode) === season);
            if (seasonEpisodes.length === 0) return null;
            
            return (
              <div key={season} className="bg-white rounded-lg p-3">
                <div className={`text-sm font-medium px-2 py-1 rounded-full mb-1 ${getSeasonColor(season)}`}>
                  Temporada {season}
                </div>
                <div className="text-lg font-bold text-gray-800">{seasonEpisodes.length}</div>
                <div className="text-xs text-gray-500">episódios</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EpisodeList;