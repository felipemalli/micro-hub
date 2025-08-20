import React from "react";
import { Routes, Route } from "react-router-dom";
import {
	CharacterListPage,
	CharacterDetailPage,
} from "../../features/characters";

export const AppRouter: React.FC = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<div className="text-center mb-8">
				<h1 className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
					🛸 Rick & Morty Characters
				</h1>
				<p className="text-lg">
					Explore, curta e favorite os personagens do multiverso de Rick e Morty
				</p>
			</div>

			<div className="bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px]">
				<Routes>
					<Route path="/rickmorty" element={<CharacterListPage />} />
					<Route path="/rickmorty/characters" element={<CharacterListPage />} />
					<Route
						path="/rickmorty/characters/:id"
						element={<CharacterDetailPage />}
					/>
				</Routes>
			</div>

			<div className="text-center mt-8 text-gray-500 text-sm">
				<p>
					Dados fornecidos pela{" "}
					<a
						href="https://rickandmortyapi.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-500 hover:text-blue-600 underline"
					>
						Rick and Morty API
					</a>
				</p>
			</div>
		</div>
	);
};
