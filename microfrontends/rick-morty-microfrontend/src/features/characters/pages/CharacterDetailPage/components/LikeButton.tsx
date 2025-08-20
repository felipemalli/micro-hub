import React from "react";
import { CoreButton } from "@felipemalli-libs/microhub-ui/react";
import { useCharacterLikes } from "../../../hooks/useCharacterLikes";

interface LikeButtonProps {
	characterId: number;
	showCount?: boolean;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
	characterId,
	showCount = true,
}) => {
	const { getLikesCount, isLiked, toggleLike } = useCharacterLikes();
	const liked = isLiked(characterId);
	const likesCount = getLikesCount(characterId);

	return (
		<CoreButton
			variant="ghost"
			size="small"
			onClick={(e) => {
				e.stopPropagation();
				toggleLike(characterId);
			}}
			className="flex items-center justify-center space-x-1 border-none"
			title={liked ? "Remover curtida" : "Curtir personagem"}
		>
			<span
				className={`${liked ? "text-blue-500" : "text-gray-500"} transition-colors text-sm`}
			>
				{liked ? "👍" : "👍🏻"}
			</span>
			{showCount && <span className="text-base font-medium">{likesCount}</span>}
		</CoreButton>
	);
};
