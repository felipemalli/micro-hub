import { CacheModuleOptions } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-yet";

export const redisConfig: CacheModuleOptions = {
	store: redisStore,
	socket: {
		host: process.env.REDIS_HOST || "redis",
		port: parseInt(process.env.REDIS_PORT) || 6379,
	},
	password: process.env.REDIS_PASSWORD || undefined,
	ttl: 300000, // 5 minutos em millisegundos
};
