import { CacheModuleOptions } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-store";

export const redisConfig: CacheModuleOptions = {
	store: redisStore as any,
	host: process.env.REDIS_HOST || "localhost",
	port: parseInt(process.env.REDIS_PORT) || 6379,
	password: process.env.REDIS_PASSWORD || undefined,
	ttl: 300, // 5 minutos
	isGlobal: true,
};
