
import { EmailValidation, PasswordValidation } from '@/common/decorators/validation.decorators';

export class LoginDto {
  @EmailValidation()
  email: string;

  @PasswordValidation({ requireLength: false })
  password: string;
}