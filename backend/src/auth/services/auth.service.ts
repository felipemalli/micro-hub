import {
	Injectable,
	ConflictException,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "@/users/services/user.service";
import { PasswordService } from "@/common/services/password.service";
import { RegisterDto } from "@/auth/dto/register.dto";
import { LoginDto } from "@/auth/dto/login.dto";
import { User } from "@/entities/user.entity";
import { JwtPayload } from "@/auth/interfaces/jwt-payload.interface";
import { MESSAGES } from "@/common/constants/error-messages";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		private passwordService: PasswordService
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

	async validateToken(token: string): Promise<User> {
		try {
			const payload = this.jwtService.verify(token);
			return await this.userService.findById(payload.sub);
		} catch {
			throw new UnauthorizedException(MESSAGES.ERROR.INVALID_CREDENTIALS);
		}
	}
}
