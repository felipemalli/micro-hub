import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "@/auth/interfaces/jwt-payload.interface";
import { UsersService } from "@/users/services/users.service";
import { User } from "@/entities/user.entity";
import { MESSAGES } from "@/common/constants/error-messages";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private userService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET || "your-secret-key",
		});
	}

	async validate(payload: JwtPayload): Promise<User> {
		const user = await this.userService.findById(payload.sub);

		if (!user || !user.isActive) {
			throw new UnauthorizedException(MESSAGES.ERROR.USER_NOT_FOUND);
		}

		return user;
	}
}
