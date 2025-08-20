import {
	Controller,
	Post,
	Body,
	Get,
	UseGuards,
	HttpCode,
	HttpStatus,
} from "@nestjs/common";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger";
import { AuthService } from "@/auth/services/auth.service";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { Public } from "@/auth/decorators/public.decorator";
import { CurrentUser } from "@/common/decorators/current-user.decorator";
import { RegisterDto } from "@/auth/dto/register.dto";
import { LoginDto } from "@/auth/dto/login.dto";
import { User } from "@/entities/user.entity";
import { MESSAGES } from "@/common/constants/error-messages";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@Post("register")
	@ApiOperation({ summary: "Register a new user" })
	@ApiResponse({
		status: 201,
		description: MESSAGES.SUCCESS.USER_REGISTERED,
	})
	@ApiResponse({
		status: 409,
		description: MESSAGES.ERROR.EMAIL_ALREADY_EXISTS,
	})
	async register(@Body() registerDto: RegisterDto) {
		const result = await this.authService.register(registerDto);

		return {
			message: MESSAGES.SUCCESS.USER_REGISTERED,
			user: {
				id: result.user.id,
				email: result.user.email,
				name: result.user.name,
				role: result.user.role,
			},
			token: result.token,
		};
	}

	@Public()
	@Post("login")
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Login user" })
	@ApiResponse({
		status: 200,
		description: MESSAGES.SUCCESS.LOGIN_SUCCESS,
	})
	@ApiResponse({
		status: 401,
		description: MESSAGES.ERROR.INVALID_CREDENTIALS,
	})
	async login(@Body() loginDto: LoginDto) {
		const result = await this.authService.login(loginDto);

		return {
			message: MESSAGES.SUCCESS.LOGIN_SUCCESS,
			user: {
				id: result.user.id,
				email: result.user.email,
				name: result.user.name,
				role: result.user.role,
			},
			token: result.token,
		};
	}

	@Get("profile")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: "Get current user profile" })
	@ApiResponse({
		status: 200,
		description: MESSAGES.SUCCESS.PROFILE_RETRIEVED,
	})
	@ApiResponse({
		status: 401,
		description: MESSAGES.ERROR.UNAUTHORIZED,
	})
	async getProfile(@CurrentUser() user: User) {
		return {
			message: MESSAGES.SUCCESS.PROFILE_RETRIEVED,
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
}
