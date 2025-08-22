export const storage = {
	getFavorites(): number[] {
		try {
			const favorites = localStorage.getItem("rick-morty-favorites");
			return favorites ? JSON.parse(favorites) : [];
		} catch (error) {
			console.error("Error reading favorites from localStorage:", error);
			return [];
		}
	},

	setFavorites(favorites: number[]): void {
		try {
			localStorage.setItem("rick-morty-favorites", JSON.stringify(favorites));
		} catch (error) {
			console.error("Error saving favorites to localStorage:", error);
		}
	},

	getLikes(): Record<number, number> {
		try {
			const likes = localStorage.getItem("rick-morty-likes");
			return likes ? JSON.parse(likes) : {};
		} catch (error) {
			console.error("Error reading likes from localStorage:", error);
			return {};
		}
	},

	setLikes(likes: Record<number, number>): void {
		try {
			localStorage.setItem("rick-morty-likes", JSON.stringify(likes));
		} catch (error) {
			console.error("Error saving likes to localStorage:", error);
		}
	},

	clearAll(): void {
		try {
			localStorage.removeItem("rick-morty-favorites");
			localStorage.removeItem("rick-morty-likes");
		} catch (error) {
			console.error("Error clearing localStorage:", error);
		}
	},
};
