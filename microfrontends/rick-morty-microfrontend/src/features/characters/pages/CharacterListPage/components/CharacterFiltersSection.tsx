import React, { useEffect } from "react";
import { CoreInput } from "@felipemalli-libs/microhub-ui/react";
import { CharacterFilters } from "@characters/types/character.types";

interface CharacterFiltersSectionsProps {
	filters: CharacterFilters;
	onFiltersChange: (filters: Partial<CharacterFilters>) => void;
}

export const CharacterFiltersSection: React.FC<
	CharacterFiltersSectionsProps
> = ({ filters, onFiltersChange }) => {
	const debouncedName = filters.name || "";

	useEffect(() => {
		if (debouncedName !== filters.name) {
			onFiltersChange({ name: debouncedName });
		}
	}, [debouncedName, filters.name, onFiltersChange]);

	return (
		<div className="mb-6 rounded-xl bg-gray-50 p-4">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				<div>
					<label>Nome</label>
					<CoreInput
						type="text"
						value={filters.name || ""}
						placeholder="Digite o nome..."
						size="small"
						onCoreInput={(e: any) =>
							onFiltersChange({ name: e.detail?.target?.value || "" })
						}
					/>
				</div>
				<div>
					<label>Status</label>
					<select
						value={filters.status || ""}
						onChange={(e) => onFiltersChange({ status: e.target.value as any })}
						className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="">Todos</option>
						<option value="Alive">Vivo</option>
						<option value="Dead">Morto</option>
						<option value="unknown">Desconhecido</option>
					</select>
				</div>
				<div>
					<label>Espécie</label>
					<CoreInput
						type="text"
						value={filters.species || ""}
						placeholder="Ex: Human, Alien..."
						size="small"
						onCoreInput={(e: any) =>
							onFiltersChange({ species: e.detail?.target?.value || "" })
						}
					/>
				</div>
				<div>
					<label>Gênero</label>
					<select
						value={filters.gender || ""}
						onChange={(e) => onFiltersChange({ gender: e.target.value as any })}
						className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
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
