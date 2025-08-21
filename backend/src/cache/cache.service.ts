import { Injectable, Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class CacheService {
	constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

	async set(key: string, value: any, ttl?: number): Promise<void> {
		await this.cache.set(key, value, ttl);
	}

	async get<T>(key: string): Promise<T | undefined> {
		return await this.cache.get<T>(key);
	}

	async del(key: string): Promise<void> {
		await this.cache.del(key);
	}

	async reset(): Promise<void> {
		await this.cache.reset();
	}
}
