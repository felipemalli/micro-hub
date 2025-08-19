import React from 'react';
import { CharacterFilters as FiltersType } from '../../../types/character.types';
import { useDebounce } from '../../../../../shared/hooks/useDebounce';

interface CharacterFiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: Partial<FiltersType>) => void;
}

export const CharacterFilters: React.FC<CharacterFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const debouncedName = useDebounce(filters.name || '', 500);

  React.useEffect(() => {
    if (debouncedName !== filters.name) {
      onFiltersChange({ name: debouncedName });
    }
  }, [debouncedName]);

  return (
    <div className="mb-6 bg-gray-50 rounded-xl p-4">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <input
            type="text"
            value={filters.name || ''}
            onChange={(e) => onFiltersChange({ name: e.target.value })}
            placeholder="Digite o nome..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status || ''}
            onChange={(e) => onFiltersChange({ status: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos</option>
            <option value="Alive">Vivo</option>
            <option value="Dead">Morto</option>
            <option value="unknown">Desconhecido</option>
          </select>
        </div>

        {/* Espécie */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Espécie
          </label>
          <input
            type="text"
            value={filters.species || ''}
            onChange={(e) => onFiltersChange({ species: e.target.value })}
            placeholder="Ex: Human, Alien..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Gênero */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gênero
          </label>
          <select
            value={filters.gender || ''}
            onChange={(e) => onFiltersChange({ gender: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos</option>
            <option value="Male">Masculino</option>
            <option value="Female">Feminino</option>
            <option value="Genderless">Sem gênero</option>
            <option value="unknown">Desconhecido</option>
          </select>
        </div>
      </div>
    </div>
  );
}; 