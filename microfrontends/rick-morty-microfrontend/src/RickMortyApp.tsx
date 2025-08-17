import React, { useState, useEffect } from 'react';
import { Routes, Route, Router, BrowserRouter } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import EpisodeList from './components/EpisodeList';
import LocationList from './components/LocationList';
import { Character, Episode, Location, RickMortyAppProps } from './types/rickmorty';
import { History } from 'history';

const RickMortyApp: React.FC<RickMortyAppProps & { history?: History }> = ({ history }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [location, setLocation] = useState(history?.location || { pathname: '/rickmorty' });

  useEffect(() => {
    if (history) {
      const unlisten = history.listen((update: any) => {
        setLocation(update.location);
      });
      return unlisten;
    }
  }, [history]);

  const currentPath = location.pathname.split('/').pop() || 'characters';

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    if (history) {
      history.push(`/rickmorty/characters/${character.id}`);
    }
  };

  const handleEpisodeSelect = (episode: Episode) => {
    setSelectedEpisode(episode);
    if (history) {
      history.push(`/rickmorty/episodes/${episode.id}`);
    }
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    if (history) {
      history.push(`/rickmorty/locations/${location.id}`);
    }
  };

  const handleBackToList = (navigateUrl: string) => {
    setSelectedCharacter(null);
    setSelectedEpisode(null);
    setSelectedLocation(null);
    if (history) {
      history.push(`/${navigateUrl}`);
    }
  };

  const handleNavigate = (path: string) => {
    if (history) {
      history.push(path);
    }
  };

  const getActiveTabClass = (tab: string) => {
    return currentPath === tab || (currentPath === 'rickmorty' && tab === 'characters')
      ? 'tab-active'
      : 'tab-inactive';
  };

  return (
    <Router location={location} navigator={history}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
              🛸 Rick & Morty Explorer
            </h1>
            <p className="text-gray-600 text-lg">
              Explore o multiverso de Rick e Morty através da API oficial
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-2 flex space-x-2">
              <button
                onClick={() => handleNavigate('/rickmorty')}
                className={getActiveTabClass('characters')}
              >
                👥 Personagens
              </button>
              <button
                onClick={() => handleNavigate('/rickmorty/episodes')}
                className={getActiveTabClass('episodes')}
              >
                📺 Episódios
              </button>
              <button
                onClick={() => handleNavigate('/rickmorty/locations')}
                className={getActiveTabClass('locations')}
              >
                🌍 Localizações
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <Routes>
              <Route 
                path="/rickmorty" 
                element={<CharacterList onCharacterSelect={handleCharacterSelect} />} 
              />
              <Route 
                path="/rickmorty/characters" 
                element={<CharacterList onCharacterSelect={handleCharacterSelect} />} 
              />
              <Route 
                path="/rickmorty/characters/:id" 
                element={
                  <CharacterDetail 
                    characterId={selectedCharacter?.id || 1} 
                    onBack={() => handleBackToList('rickmorty/characters')} 
                  />
                } 
              />
              <Route 
                path="/rickmorty/episodes" 
                element={<EpisodeList onEpisodeSelect={handleEpisodeSelect} />} 
              />
              <Route 
                path="/rickmorty/episodes/:id" 
                element={
                  <div className="p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      📺 Detalhes do Episódio
                    </h2>
                    {selectedEpisode && (
                      <div className="bg-gray-50 rounded-xl p-6 max-w-2xl mx-auto">
                        <h3 className="text-xl font-semibold mb-2">{selectedEpisode.name}</h3>
                        <p className="text-gray-600 mb-2">Episódio: {selectedEpisode.episode}</p>
                        <p className="text-gray-600 mb-4">Data de exibição: {selectedEpisode.air_date}</p>
                        <p className="text-sm text-gray-500">
                          {selectedEpisode.characters.length} personagens aparecem neste episódio
                        </p>
                      </div>
                    )}
                    <button 
                      onClick={() => handleBackToList('rickmorty/episodes')}
                      className="btn-secondary mt-6"
                    >
                      ← Voltar para episódios
                    </button>
                  </div>
                } 
              />
              <Route 
                path="/rickmorty/locations" 
                element={<LocationList onLocationSelect={handleLocationSelect} />} 
              />
              <Route 
                path="/rickmorty/locations/:id" 
                element={
                  <div className="p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      🌍 Detalhes da Localização
                    </h2>
                    {selectedLocation && (
                      <div className="bg-gray-50 rounded-xl p-6 max-w-2xl mx-auto">
                        <h3 className="text-xl font-semibold mb-2">{selectedLocation.name}</h3>
                        <p className="text-gray-600 mb-2">Tipo: {selectedLocation.type}</p>
                        <p className="text-gray-600 mb-4">Dimensão: {selectedLocation.dimension}</p>
                        <p className="text-sm text-gray-500">
                          {selectedLocation.residents.length} residentes conhecidos
                        </p>
                      </div>
                    )}
                    <button 
                      onClick={() => handleBackToList('rickmorty/locations')}
                      className="btn-secondary mt-6"
                    >
                      ← Voltar para localizações
                    </button>
                  </div>
                } 
              />
            </Routes>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>
              Dados fornecidos pela{' '}
              <a 
                href="https://rickandmortyapi.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 underline"
              >
                Rick and Morty API
              </a>
            </p>
          </div>
        </div>
      </div>
    </Router>
  );
};

// Para uso no container
export default RickMortyApp;