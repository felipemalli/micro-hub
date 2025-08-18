import { NameValidation } from '@/common/decorators/validation.decorators';

export class UpdateProfileDto {
  @NameValidation({ required: false })
  name?: string;
}