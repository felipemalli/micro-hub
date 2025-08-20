import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";

@Injectable()
export class PasswordService {
	private readonly saltRounds = 12;

	async hash(plainPassword: string): Promise<string> {
		return bcrypt.hash(plainPassword, this.saltRounds);
	}

	async validate(
		plainPassword: string,
		hashedPassword: string
	): Promise<boolean> {
		return bcrypt.compare(plainPassword, hashedPassword);
	}
}
