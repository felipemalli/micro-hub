import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "@/entities/user.entity";
import { RegisterDto } from "@/auth/dto/register.dto";
import { UpdateProfileDto } from "@/users/dto/update-profile.dto";
import { PasswordService } from "@/common/services/password.service";
import { CacheService } from "@/cache/cache.service";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private passwordService: PasswordService,
		private cacheService: CacheService
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

	async findById(id: string): Promise<User | null> {
		const cacheKey = `user:${id}`;
		const cachedUser = await this.cacheService.get<User>(cacheKey);

		if (cachedUser) {
			return cachedUser;
		}

		const user = await this.userRepository.findOne({
			where: { id, isActive: true },
		});

		if (user) {
			await this.cacheService.set(cacheKey, user);
		}

		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.userRepository.findOne({
			where: { email, isActive: true },
		});

		return user;
	}

	async updateProfile(
		id: string,
		updateProfileDto: UpdateProfileDto
	): Promise<User> {
		const cacheKey = `user:${id}`;
		const cachedUser = await this.cacheService.get<User>(cacheKey);

		if (cachedUser) {
			await this.cacheService.del(cacheKey);
		}

		const user = await this.findById(id);

		Object.assign(user, updateProfileDto);

		const updatedUser = await this.userRepository.save(user);

		await this.cacheService.set(cacheKey, updatedUser);

		return updatedUser;
	}

	async deactivate(id: string): Promise<void> {
		const user = await this.findById(id);
		user.isActive = false;
		await this.userRepository.save(user);

		await this.cacheService.del(`user:${id}`);
	}

	async getUserCounts(): Promise<{ total: number; active: number }> {
		const [total, active] = await Promise.all([
			this.userRepository.count(),
			this.userRepository.count({ where: { isActive: true } }),
		]);

		return { total, active };
	}
}
