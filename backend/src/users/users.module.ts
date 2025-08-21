import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@/entities/user.entity";
import { UserService } from "@/users/services/user.service";
import { UsersController } from "@/users/controllers/users.controller";
import { CacheModule } from "@/cache/cache.module";

@Module({
	imports: [TypeOrmModule.forFeature([User]), CacheModule],
	controllers: [UsersController],
	providers: [UserService],
	exports: [UserService],
})
export class UsersModule {}
