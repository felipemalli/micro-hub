import { useCharacterDetail } from "../../hooks/useCharacterDetail";
import { FavoriteButton } from "./components/FavoriteButton";
import { LikeButton } from "./components/LikeButton";
import { Badge } from "../../../../shared/components/Badge/Badge";
import { CoreButton } from "@felipemalli-libs/microhub-ui/react";
import { Loading } from "../../../../shared/components/Loading/Loading";
import { InfoCard } from "../../../../shared/components";
import { useNavigate } from "react-router-dom";

export const CharacterDetailPage = ({
	characterId,
}: {
	characterId?: number;
}) => {
	const { character, isLoading, error, mutate } = useCharacterDetail({
		characterId,
	});

	const navigate = useNavigate();

	const handleBack = () => {
		navigate("/rickmorty/characters");
	};

	const handleRetry = () => {
		mutate();
	};

	if (isLoading) {
		return <Loading message="Carregando detalhes do personagem..." />;
	}

	if (error || !character) {
		return (
			<div className="text-center p-8 flex flex-col gap-4">
				<div className="text-red-600">
					<span className="text-4xl">⚠️</span>
				</div>
				<h3 className="text-lg font-semibold text-gray-800 mb-2">
					Erro ao carregar
				</h3>
				<p className="text-gray-600">Personagem não encontrado</p>
				<div className="space-x-2">
					<CoreButton onCoreClick={handleRetry}>Tentar novamente</CoreButton>
					<CoreButton variant="outline" onCoreClick={handleBack}>
						Voltar para lista
					</CoreButton>
				</div>
			</div>
		);
	}

	const getStatusVariant = (status: string) => {
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
		<div className="p-6">
			<div className="flex items-center justify-between mb-6">
				<CoreButton variant="outline" onCoreClick={handleBack}>
					← Voltar
				</CoreButton>
				<div className="flex items-center gap-2">
					<FavoriteButton characterId={character.id} variant="text" />
					<LikeButton characterId={character.id} />
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="flex justify-center">
					<img
						src={character.image}
						alt={character.name}
						className="w-full max-w-md rounded-2xl shadow-lg"
					/>
				</div>
				<div className="space-y-6">
					<div>
						<h1 className="text-3xl font-bold text-gray-800 mb-2">
							{character.name}
						</h1>
						<Badge variant={getStatusVariant(character.status)} size="md">
							{character.status}
						</Badge>
					</div>
					<div className="flex flex-col gap-4">
						<InfoCard
							title="Informações Básicas"
							content={[
								{ name: "Espécie:", value: character.species },
								{ name: "Gênero:", value: character.gender },
								character.type && { name: "Tipo:", value: character.type },
							]}
						/>
						<InfoCard
							title="Localização"
							content={[
								{ name: "Origem:", value: character.origin.name },
								{ name: "Última localização:", value: character.location.name },
							]}
						/>
						<InfoCard
							title="Episódios"
							content={[
								{ name: "Aparece em:", value: character.episode.length },
							]}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
