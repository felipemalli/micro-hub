import {
	Injectable,
	ConflictException,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "@/users/services/users.service";
import { PasswordService } from "@/common/services/password.service";
import { CacheService } from "@/cache/cache.service";
import { RegisterDto } from "@/auth/dto/register.dto";
import { LoginDto } from "@/auth/dto/login.dto";
import { User } from "@/entities/user.entity";
import { JwtPayload } from "@/auth/interfaces/jwt-payload.interface";
import { MESSAGES } from "@/common/constants/error-messages";

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService,
		private passwordService: PasswordService,
		private cacheService: CacheService
	) {}

	async register(
		registerDto: RegisterDto
	): Promise<{ user: User; token: string }> {
		const existingUser = await this.userService.findByEmail(registerDto.email);

		if (existingUser) {
			throw new ConflictException(MESSAGES.ERROR.EMAIL_ALREADY_EXISTS);
		}

		const user = await this.userService.create(registerDto);
		const token = this.generateToken(user);

		return { user, token };
	}

	async login(loginDto: LoginDto): Promise<{ user: User; token: string }> {
		const user = await this.userService.findByEmail(loginDto.email);

		if (!user || !user.isActive) {
			throw new UnauthorizedException(MESSAGES.ERROR.INVALID_CREDENTIALS);
		}

		const isPasswordValid = await this.passwordService.validate(
			loginDto.password,
			user.password
		);

		if (!isPasswordValid) {
			throw new UnauthorizedException(MESSAGES.ERROR.INVALID_CREDENTIALS);
		}

		const token = this.generateToken(user);

		await this.cacheService.set(`user:${user.id}`, user, 300);

		return { user, token };
	}

	private generateToken(user: User): string {
		const payload: JwtPayload = {
			sub: user.id,
			email: user.email,
			role: user.role,
		};

		return this.jwtService.sign(payload);
	}
}
