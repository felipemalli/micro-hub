import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@/entities/user.entity";
import { UsersService } from "@/users/services/users.service";
import { UsersController } from "@/users/controllers/users.controller";
import { CacheModule } from "@/cache/cache.module";

@Module({
	imports: [TypeOrmModule.forFeature([User]), CacheModule],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
