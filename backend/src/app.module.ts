import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CacheModule } from "@nestjs/cache-manager";
import { APP_GUARD } from "@nestjs/core";
import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { AuthModule } from "@/auth/auth.module";
import { UsersModule } from "@/users/users.module";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { databaseConfig } from "@/config/database.config";
import { redisConfig } from "@/config/redis.config";
import { CommonModule } from "@/common/common.module";
import { CacheService } from "@/cache/cache.service";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ".env",
		}),
		TypeOrmModule.forRootAsync({
			useFactory: () => databaseConfig,
		}),
		CacheModule.register(redisConfig),
		CommonModule,
		AuthModule,
		UsersModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		CacheService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AppModule {}
