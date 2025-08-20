import {
	Controller,
	Get,
	Put,
	Delete,
	Body,
	Param,
	UseGuards,
	ForbiddenException,
} from "@nestjs/common";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
	ApiParam,
} from "@nestjs/swagger";
import { UserService } from "@/users/services/user.service";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { CurrentUser } from "@/common/decorators/current-user.decorator";
import { UpdateProfileDto } from "@/users/dto/update-profile.dto";
import { User, UserRole } from "@/entities/user.entity";
import { MESSAGES } from "@/common/constants/error-messages";

@ApiTags("users")
@Controller("users")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
	constructor(private userService: UserService) {}

	@Get()
	@ApiOperation({ summary: "Get all users (admin only)" })
	@ApiResponse({
		status: 200,
		description: MESSAGES.SUCCESS.USERS_RETRIEVED,
	})
	@ApiResponse({
		status: 403,
		description: MESSAGES.ERROR.ADMIN_ACCESS_REQUIRED,
	})
	async findAll(@CurrentUser() currentUser: User) {
		if (currentUser.role !== UserRole.ADMIN) {
			throw new ForbiddenException(MESSAGES.ERROR.ADMIN_ACCESS_REQUIRED);
		}

		const users = await this.userService.findAll();

		return {
			message: MESSAGES.SUCCESS.USERS_RETRIEVED,
			users: users.map((user) => ({
				id: user.id,
				email: user.email,
				name: user.name,
				role: user.role,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			})),
		};
	}

	@Get("stats")
	@ApiOperation({ summary: "Get user statistics (admin only)" })
	@ApiResponse({
		status: 200,
		description: MESSAGES.SUCCESS.STATS_RETRIEVED,
	})
	async getStats(@CurrentUser() currentUser: User) {
		if (currentUser.role !== UserRole.ADMIN) {
			throw new ForbiddenException(MESSAGES.ERROR.ADMIN_ACCESS_REQUIRED);
		}

		const stats = await this.userService.getUserStats();

		return {
			message: MESSAGES.SUCCESS.STATS_RETRIEVED,
			stats,
		};
	}

	@Get(":id")
	@ApiOperation({ summary: "Get user by ID" })
	@ApiParam({ name: "id", description: "User ID" })
	@ApiResponse({
		status: 200,
		description: MESSAGES.SUCCESS.USER_RETRIEVED,
	})
	@ApiResponse({
		status: 404,
		description: MESSAGES.ERROR.USER_NOT_FOUND,
	})
	async findOne(@Param("id") id: string, @CurrentUser() currentUser: User) {
		if (currentUser.role !== UserRole.ADMIN && currentUser.id !== id) {
			throw new ForbiddenException(MESSAGES.ERROR.PROFILE_ACCESS_DENIED);
		}

		const user = await this.userService.findById(id);

		return {
			message: MESSAGES.SUCCESS.USER_RETRIEVED,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				role: user.role,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
		};
	}

	@Put(":id")
	@ApiOperation({ summary: "Update user profile" })
	@ApiParam({ name: "id", description: "User ID" })
	@ApiResponse({
		status: 200,
		description: MESSAGES.SUCCESS.USER_UPDATED,
	})
	async update(
		@Param("id") id: string,
		@Body() updateProfileDto: UpdateProfileDto,
		@CurrentUser() currentUser: User
	) {
		if (currentUser.role !== UserRole.ADMIN && currentUser.id !== id) {
			throw new ForbiddenException(MESSAGES.ERROR.PROFILE_ACCESS_DENIED);
		}

		const user = await this.userService.updateProfile(id, updateProfileDto);

		return {
			message: MESSAGES.SUCCESS.USER_UPDATED,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				role: user.role,
				updatedAt: user.updatedAt,
			},
		};
	}

	@Delete(":id")
	@ApiOperation({ summary: "Deactivate user (admin only)" })
	@ApiParam({ name: "id", description: "User ID" })
	@ApiResponse({
		status: 200,
		description: MESSAGES.SUCCESS.USER_DEACTIVATED,
	})
	async deactivate(@Param("id") id: string, @CurrentUser() currentUser: User) {
		if (currentUser.role !== UserRole.ADMIN) {
			throw new ForbiddenException(MESSAGES.ERROR.ADMIN_ACCESS_REQUIRED);
		}

		if (currentUser.id === id) {
			throw new ForbiddenException(MESSAGES.ERROR.CANNOT_DELETE_YOURSELF);
		}

		await this.userService.deactivate(id);

		return {
			message: MESSAGES.SUCCESS.USER_DEACTIVATED,
		};
	}
}
