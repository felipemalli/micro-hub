import React from "react";
import { useNavigate } from "react-router-dom";
import { useCharacters } from "@characters/hooks";
import { CharacterCard } from "@characters/pages/CharacterListPage/components/CharacterCard";
import { CharacterFiltersSection } from "@characters/pages/CharacterListPage/components/CharacterFiltersSection";
import { Loading } from "@/shared";
import { CoreButton } from "@felipemalli-libs/microhub-ui/react";
import { Character } from "@characters/types/character.types";

export const CharacterListPage: React.FC = () => {
	const navigate = useNavigate();
	const {
		characters,
		isLoading,
		error,
		pagination,
		filters,
		updateFilters,
		executeSearch,
		resetFilters,
		changePage,
	} = useCharacters();

	const handleCharacterSelect = (character: Character) => {
		navigate(`/rickmorty/characters/${character.id}`);
	};

	return (
		<div className="p-6">
			<h4 className="mb-4">Personagens</h4>
			<div className="mb-6">
				<CharacterFiltersSection
					filters={filters}
					onFiltersChange={updateFilters}
				/>
				<div className="mt-4 flex gap-2">
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
				<div className="py-4 text-center">
					<span className="text-blue-600">Atualizando resultados...</span>
				</div>
			)}
			{isLoading && characters.length === 0 ? (
				<div className="flex items-center justify-center py-12">
					<Loading message="Carregando personagens..." />
				</div>
			) : error ? (
				<div className="flex flex-col items-center justify-center py-12">
					<div className="mb-4 text-red-600">
						<span className="text-4xl">⚠️</span>
					</div>
					<h3>Erro ao carregar</h3>
					<p className="text-gray-600">Personagem não encontrado</p>
				</div>
			) : (
				<div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
				<div className="flex flex-row items-center justify-center space-x-4">
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
