export interface ApiResponse<T> {
	info: {
		count: number;
		pages: number;
		next: string | null;
		prev: string | null;
	};
	results: T[];
}

export interface LoadingState {
	isLoading: boolean;
	error: string | null;
}

export interface PaginationInfo {
	currentPage: number;
	totalPages: number;
	hasNext: boolean;
	hasPrev: boolean;
}
