export const buildQueryParams = (
	page: number,
	filters: Record<string, string>
): Record<string, string> => {
	const params: Record<string, string> = { page: page.toString() };

	Object.entries(filters).forEach(([key, value]) => {
		if (value?.trim()) {
			params[key] = value.trim();
		}
	});

	return params;
};
