import { IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({
    description: 'User full name',
    example: 'João Silva',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;
}