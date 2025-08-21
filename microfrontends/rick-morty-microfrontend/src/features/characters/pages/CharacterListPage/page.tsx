import React from "react";
import { useNavigate } from "react-router-dom";
import { useCharacters } from "../../hooks/useCharacters";
import { useCharacterFilters } from "../../hooks/useCharacterFilters";
import { useFavorites } from "../../hooks/useFavorites";
import { CharacterCard } from "./components/CharacterCard";
import { CharacterFilters } from "./components/CharacterFilters";
import { Loading } from "../../../../shared/components/Loading/Loading";
import { CoreButton } from "@felipemalli-libs/microhub-ui/react";
import { Character } from "../../types/character.types";

export const CharacterListPage: React.FC = () => {
	const navigate = useNavigate();
	const {
		page,
		filters,
		searchFilters,
		updateFilters,
		executeSearch,
		changePage,
		resetFilters,
	} = useCharacterFilters();
	const { characters, isLoading, error, pagination, mutate } = useCharacters({
		page,
		filters: searchFilters,
	});
	const { favoritesCount } = useFavorites();

	const handleCharacterSelect = (character: Character) => {
		navigate(`/rickmorty/characters/${character.id}`);
	};

	const handleRetry = () => {
		mutate();
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h2 className="text-2xl font-bold text-gray-800">Personagens</h2>
					<p className="text-gray-600">{favoritesCount} favoritos</p>
				</div>
			</div>

			<div className="mb-6">
				<CharacterFilters filters={filters} onFiltersChange={updateFilters} />
				<div className="flex gap-2 mt-4">
					<CoreButton onCoreClick={executeSearch} disabled={isLoading}>
						Pesquisar
					</CoreButton>
					<CoreButton
						variant="outline"
						onCoreClick={resetFilters}
						disabled={isLoading}
					>
						Limpar filtros
					</CoreButton>
				</div>
			</div>

			{isLoading && characters.length > 0 && (
				<div className="text-center py-4">
					<span className="text-blue-600">Atualizando resultados...</span>
				</div>
			)}

			{isLoading && characters.length === 0 ? (
				<div className="flex justify-center items-center py-12">
					<Loading message="Carregando personagens..." />
				</div>
			) : error ? (
				<div className="flex flex-col justify-center items-center py-12">
					<div className="text-red-600 mb-4">
						<span className="text-4xl">⚠️</span>
					</div>
					<h3 className="text-lg font-semibold text-gray-800 mb-2">
						Erro ao carregar
					</h3>
					<p className="text-gray-600 mb-4">{error}</p>
					<CoreButton onCoreClick={handleRetry}>Tentar novamente</CoreButton>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
					{characters.map((character) => (
						<CharacterCard
							key={character.id}
							character={character}
							onClick={handleCharacterSelect}
						/>
					))}
				</div>
			)}

			{pagination.totalPages > 1 && !error && (
				<div className="flex flex-row justify-center items-center space-x-4">
					<CoreButton
						variant="outline"
						size="small"
						disabled={!pagination.hasPrev || isLoading}
						onCoreClick={() => changePage(pagination.currentPage - 1)}
					>
						←
					</CoreButton>
					<p>
						<span className="text-gray-600">Página </span>
						<span className="whitespace-nowrap">
							{pagination.currentPage} de {pagination.totalPages}
						</span>
					</p>
					<CoreButton
						variant="outline"
						size="small"
						disabled={!pagination.hasNext || isLoading}
						onCoreClick={() => changePage(pagination.currentPage + 1)}
					>
						→
					</CoreButton>
				</div>
			)}
		</div>
	);
};
