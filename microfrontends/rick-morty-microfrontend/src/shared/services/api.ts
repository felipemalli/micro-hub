import axios, { AxiosInstance, AxiosResponse } from "axios";

type CacheEntry<T> = {
	expiry: number;
	data: T;
};

interface CacheOptions {
	cache?: boolean;
	ttlMs?: number;
	cacheKey?: string;
}

class ApiClient {
	private client: AxiosInstance;
	private baseURL: string;
	private cache = new Map<string, CacheEntry<any>>();
	private inFlight = new Map<string, Promise<any>>();
	private maxCacheEntries: number;

	constructor(baseURL: string, maxCacheEntries: number = 200) {
		this.baseURL = baseURL;
		this.client = axios.create({
			baseURL,
			timeout: 10000,
		});
		this.maxCacheEntries = maxCacheEntries;

		this.setupInterceptors();
	}

	private setupInterceptors() {
		this.client.interceptors.response.use(
			(response) => response,
			(error) => {
				console.error("API Error:", error);
				return Promise.reject(error);
			}
		);
	}

	private serializeParams(params?: Record<string, string>): string {
		if (!params) return "";
		const sp = new URLSearchParams();
		Object.keys(params)
			.sort()
			.forEach((k) => {
				const v = params[k];
				if (v !== undefined && v !== null && v !== "") {
					sp.append(k, v);
				}
			});
		const qs = sp.toString();
		return qs ? `?${qs}` : "";
	}

	private makeKey(
		method: "GET",
		endpoint: string,
		params?: Record<string, string>,
		overrideKey?: string
	): string {
		if (overrideKey) return overrideKey;
		return `${method}:${this.baseURL}${endpoint}${this.serializeParams(params)}`;
	}

	private getFromCache<T>(key: string): T | undefined {
		const entry = this.cache.get(key);
		if (!entry) return undefined;
		if (entry.expiry <= Date.now()) {
			this.cache.delete(key);
			return undefined;
		}
		return entry.data as T;
	}

	private setCache<T>(key: string, data: T, ttlMs: number) {
		// Simple LRU-ish: if exceeding capacity, evict oldest
		while (this.cache.size >= this.maxCacheEntries) {
			const oldestKey = this.cache.keys().next().value;
			if (oldestKey === undefined) break;
			this.cache.delete(oldestKey);
		}
		this.cache.set(key, { data, expiry: Date.now() + ttlMs });
	}

	invalidateCache(prefix?: string) {
		if (!prefix) {
			this.cache.clear();
			return;
		}
		for (const key of this.cache.keys()) {
			if (key.startsWith(prefix)) {
				this.cache.delete(key);
			}
		}
	}

	clearInFlight() {
		this.inFlight.clear();
	}

	async get<T>(
		endpoint: string,
		params?: Record<string, string>,
		options?: CacheOptions
	): Promise<T> {
		const useCache = options?.cache ?? true;
		const ttlMs = options?.ttlMs ?? 5 * 60 * 1000; // 5 minutes default
		const key = this.makeKey("GET", endpoint, params, options?.cacheKey);

		if (useCache) {
			const cached = this.getFromCache<T>(key);
			if (cached !== undefined) {
				return cached;
			}
			const pending = this.inFlight.get(key);
			if (pending) {
				return pending as Promise<T>;
			}
		}

		const requestPromise = this.client
			.get<T>(endpoint, { params })
			.then((response: AxiosResponse<T>) => response.data);

		if (useCache) {
			this.inFlight.set(key, requestPromise);
		}

		try {
			const data = await requestPromise;
			if (useCache) {
				this.setCache<T>(key, data, ttlMs);
			}
			return data;
		} finally {
			if (useCache) {
				this.inFlight.delete(key);
			}
		}
	}
}

export const rickMortyApi = new ApiClient("https://rickandmortyapi.com/api");
