import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "@/entities/user.entity";
import { RegisterDto } from "@/auth/dto/register.dto";
import { UpdateProfileDto } from "@/users/dto/update-profile.dto";
import { PasswordService } from "@/common/services/password.service";
import { MESSAGES } from "@/common/constants/error-messages";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private passwordService: PasswordService
	) {}

	async create(createUserDto: RegisterDto): Promise<User> {
		const hashedPassword = await this.passwordService.hash(
			createUserDto.password
		);

		const user = this.userRepository.create({
			...createUserDto,
			password: hashedPassword,
		});

		return this.userRepository.save(user);
	}

	async findAll(): Promise<User[]> {
		return this.userRepository.find({
			where: { isActive: true },
			select: ["id", "email", "name", "role", "createdAt", "updatedAt"],
		});
	}

	async findById(id: string): Promise<User> {
		const user = await this.userRepository.findOne({
			where: { id, isActive: true },
		});

		if (!user) {
			throw new NotFoundException(MESSAGES.ERROR.USER_NOT_FOUND);
		}

		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.userRepository.findOne({
			where: { email, isActive: true },
		});
	}

	async updateProfile(
		id: string,
		updateProfileDto: UpdateProfileDto
	): Promise<User> {
		const user = await this.findById(id);

		Object.assign(user, updateProfileDto);

		return this.userRepository.save(user);
	}

	async deactivate(id: string): Promise<void> {
		const user = await this.findById(id);
		user.isActive = false;
		await this.userRepository.save(user);
	}

	async getUserStats(): Promise<{ total: number; active: number }> {
		const [total, active] = await Promise.all([
			this.userRepository.count(),
			this.userRepository.count({ where: { isActive: true } }),
		]);

		return { total, active };
	}
}
