import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Character, Episode, CharacterDetailProps, LoadingState } from '../types/rickmorty';

const CharacterDetail: React.FC<CharacterDetailProps> = ({ characterId, onBack }) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: true, error: null });

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      setLoading({ isLoading: true, error: null });
      
      try {
        // Buscar dados do personagem
        const characterResponse = await axios.get<Character>(
          `https://rickandmortyapi.com/api/character/${characterId}`
        );
        
        const characterData = characterResponse.data;
        setCharacter(characterData);

        // Buscar episódios (limitando a 5 para performance)
        if (characterData.episode.length > 0) {
          const episodeIds = characterData.episode
            .slice(0, 5)
            .map(url => url.split('/').pop())
            .join(',');
          
          const episodesResponse = await axios.get<Episode[] | Episode>(
            `https://rickandmortyapi.com/api/episode/${episodeIds}`
          );
          
          // A API retorna um array se múltiplos IDs, ou um objeto se apenas um ID
          const episodesData = Array.isArray(episodesResponse.data) 
            ? episodesResponse.data 
            : [episodesResponse.data];
          
          setEpisodes(episodesData);
        }
        
        setLoading({ isLoading: false, error: null });
      } catch (error) {
        console.error('Erro ao buscar detalhes do personagem:', error);
        setLoading({ 
          isLoading: false, 
          error: 'Erro ao carregar detalhes do personagem. Tente novamente.' 
        });
      }
    };

    fetchCharacterDetail();
  }, [characterId]);

  const getStatusColor = (status: Character['status']) => {
    switch (status) {
      case 'Alive':
        return 'text-green-600 bg-green-100';
      case 'Dead':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: Character['status']) => {
    switch (status) {
      case 'Alive':
        return '💚';
      case 'Dead':
        return '💀';
      default:
        return '❓';
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
          <p className="text-gray-600 font-medium">Carregando detalhes...</p>
        </div>
      </div>
    );
  }

  if (loading.error || !character) {
    return (
      <div className="text-center p-12">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Ops! Algo deu errado</h3>
        <p className="text-gray-600 mb-6">{loading.error}</p>
        <button onClick={onBack} className="btn-secondary">
          ← Voltar para lista
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header com botão voltar */}
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="btn-secondary mr-4"
        >
          ← Voltar
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Detalhes do Personagem</h2>
      </div>

      {/* Card principal do personagem */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="md:flex">
          {/* Imagem */}
          <div className="md:w-1/3">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          
          {/* Informações */}
          <div className="md:w-2/3 p-6">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-800">{character.name}</h1>
              <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(character.status)}`}>
                <span className="mr-1">{getStatusIcon(character.status)}</span>
                {character.status}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informações básicas */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Informações Básicas
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="mr-2">🧬</span>
                      <span className="font-medium">Espécie:</span>
                      <span className="ml-2 text-gray-600">{character.species}</span>
                    </div>
                    {character.type && (
                      <div className="flex items-center">
                        <span className="mr-2">🏷️</span>
                        <span className="font-medium">Tipo:</span>
                        <span className="ml-2 text-gray-600">{character.type}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <span className="mr-2">{getGenderIcon(character.gender)}</span>
                      <span className="font-medium">Gênero:</span>
                      <span className="ml-2 text-gray-600">{character.gender}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Localização */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Localização
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="mr-2 mt-0.5">🏠</span>
                      <div>
                        <span className="font-medium">Origem:</span>
                        <p className="text-gray-600">{character.origin.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2 mt-0.5">📍</span>
                      <div>
                        <span className="font-medium">Localização atual:</span>
                        <p className="text-gray-600">{character.location.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Episódios */}
      {episodes.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📺</span>
            Episódios em que aparece
            <span className="ml-2 text-sm font-normal text-gray-500">
              (mostrando {episodes.length} de {character.episode.length})
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {episodes.map((episode) => (
              <div
                key={episode.id}
                className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
              >
                <h4 className="font-semibold text-gray-800 mb-2">{episode.name}</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <span className="mr-2">📅</span>
                    <span>{episode.air_date}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🎬</span>
                    <span>{episode.episode}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {character.episode.length > 5 && (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                + {character.episode.length - 5} episódios adicionais
              </p>
            </div>
          )}
        </div>
      )}

      {/* Informações técnicas */}
      <div className="mt-6 bg-gray-50 rounded-xl p-4">
        <h4 className="font-semibold text-gray-800 mb-2">ℹ️ Informações técnicas</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <div>ID: {character.id}</div>
          <div>Criado em: {new Date(character.created).toLocaleDateString('pt-BR')}</div>
          <div>Total de episódios: {character.episode.length}</div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;