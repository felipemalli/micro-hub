import React from "react";
import { Routes, Route } from "react-router-dom";
import { CharacterListPage } from "@characters/pages/CharacterListPage/page";
import { CharacterDetailPage } from "@characters/pages/CharacterDetailPage/page";

export const AppRouter: React.FC<{ isAuthenticated?: boolean }> = ({
	isAuthenticated,
}) => {
	return (
		<div className="mx-auto max-w-7xl px-4 py-8">
			<div className="mb-10 mt-4 text-center">
				<h1 className="mb-2 flex justify-center gap-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-center text-3xl text-transparent sm:text-4xl">
					<span className="text-3xl sm:text-3xl">🛸</span>
					Rick & Morty
				</h1>
				<p className="text-lg">
					Explore, curta e favorite os personagens do multiverso de Rick e Morty
				</p>
				{isAuthenticated && <p className="mt-8">Você está autenticado</p>}
			</div>
			<div className="min-h-[600px] overflow-hidden rounded-2xl bg-white shadow-xl">
				<Routes>
					<Route path="/rickmorty" element={<CharacterListPage />} />
					<Route path="/rickmorty/characters" element={<CharacterListPage />} />
					<Route
						path="/rickmorty/characters/:id"
						element={<CharacterDetailPage />}
					/>
				</Routes>
			</div>

			<div className="mt-8 text-center text-sm">
				<p>
					Dados fornecidos pela{" "}
					<a
						href="https://rickandmortyapi.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-500 underline hover:text-blue-600"
					>
						Rick and Morty API
					</a>
				</p>
			</div>
		</div>
	);
};
