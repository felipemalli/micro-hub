import React from "react";
import { CoreInput } from "@felipemalli-libs/microhub-ui/react";
import { CharacterFilters as FiltersType } from "../../../types/character.types";
import { useDebounce } from "../../../../../shared/hooks/useDebounce";

interface CharacterFiltersProps {
	filters: FiltersType;
	onFiltersChange: (filters: Partial<FiltersType>) => void;
}

export const CharacterFilters: React.FC<CharacterFiltersProps> = ({
	filters,
	onFiltersChange,
}) => {
	const debouncedName = useDebounce(filters.name || "", 500);

	React.useEffect(() => {
		if (debouncedName !== filters.name) {
			onFiltersChange({ name: debouncedName });
		}
	}, [debouncedName]);

	return (
		<div className="mb-6 bg-gray-50 rounded-xl p-4">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Nome
					</label>
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
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Status
					</label>
					<select
						value={filters.status || ""}
						onChange={(e) => onFiltersChange({ status: e.target.value as any })}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					>
						<option value="">Todos</option>
						<option value="Alive">Vivo</option>
						<option value="Dead">Morto</option>
						<option value="unknown">Desconhecido</option>
					</select>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Espécie
					</label>
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
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Gênero
					</label>
					<select
						value={filters.gender || ""}
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
