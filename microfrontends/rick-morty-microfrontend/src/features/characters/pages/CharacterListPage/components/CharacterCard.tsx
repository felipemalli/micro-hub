import React from "react";
import { Card, Badge } from "@/shared";
import { Character } from "@characters/types/character.types";
import { FavoriteButton } from "@characters/pages/CharacterDetailPage/components/FavoriteButton";
import { LikeButton } from "@characters/pages/CharacterDetailPage/components/LikeButton";

interface CharacterCardProps {
	character: Character;
	onClick: (character: Character) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
	character,
	onClick,
}) => {
	const getStatusVariant = (status: Character["status"]) => {
		switch (status) {
			case "Alive":
				return "success";
			case "Dead":
				return "danger";
			default:
				return "warning";
		}
	};

	return (
		<Card hover onClick={() => onClick(character)} className="group relative">
			<div className="absolute right-2 top-2 z-10 flex space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
				<FavoriteButton characterId={character.id} />
			</div>
			<div className="aspect-square">
				<img
					src={character.image}
					alt={character.name}
					className="h-full w-full object-cover"
					loading="lazy"
				/>
			</div>
			<div className="p-4">
				<h3 className="mb-2 truncate text-lg font-bold text-gray-800">
					{character.name}
				</h3>
				<div className="mb-3 flex items-center justify-between">
					<Badge variant={getStatusVariant(character.status)}>
						{character.status}
					</Badge>
					<LikeButton characterId={character.id} />
				</div>
				<div className="space-y-1 text-sm text-gray-600">
					<p className="overflow-hidden truncate text-ellipsis">
						<span>Espécie:</span> {character.species}
					</p>
					<p className="overflow-hidden truncate text-ellipsis">
						<span>Gênero:</span> {character.gender}
					</p>
					<p className="overflow-hidden truncate text-ellipsis">
						<span>Origem:</span>
						<span>{character.origin.name}</span>
					</p>
				</div>
			</div>
		</Card>
	);
};
