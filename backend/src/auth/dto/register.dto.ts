import {
	EmailValidation,
	NameValidation,
	PasswordValidation,
} from "@/common/decorators/validation.decorators";

export class RegisterDto {
	@EmailValidation()
	email: string;

	@PasswordValidation()
	password: string;

	@NameValidation()
	name: string;
}
