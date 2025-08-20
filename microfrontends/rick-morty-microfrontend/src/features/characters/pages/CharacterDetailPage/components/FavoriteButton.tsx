import React from "react";
import { CoreButton } from "@felipemalli-libs/microhub-ui/react";
import { useFavorites } from "../../../hooks/useFavorites";

interface FavoriteButtonProps {
	characterId: number;
	variant?: "icon" | "text";
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
	characterId,
	variant = "icon",
}) => {
	const { isFavorite, toggleFavorite } = useFavorites();
	const favorited = isFavorite(characterId);

	return (
		<CoreButton
			variant={favorited ? "primary" : "ghost"}
			size={variant === "icon" ? "small" : "medium"}
			onClick={(e) => {
				e.stopPropagation();
				toggleFavorite(characterId);
			}}
			title={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
		>
			{variant === "icon" ? (
				<span className="text-lg">{favorited ? "❤️" : "🤍"}</span>
			) : favorited ? (
				"Remover dos Favoritos"
			) : (
				"Adicionar aos Favoritos"
			)}
		</CoreButton>
	);
};
