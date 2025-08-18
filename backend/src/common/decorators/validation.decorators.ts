import { applyDecorators } from '@nestjs/common';
import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty, Matches, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export function EmailValidation() {
  return applyDecorators(
    ApiProperty({
      description: 'User email address',
      example: 'user@example.com',
    }),
    IsEmail(),
    IsNotEmpty()
  );
}

export function NameValidation({ required }: { required?: boolean } = {}) {
  const decorators = [
    ApiProperty({
      description: 'User full name',
      example: 'João Silva',
      required,
      minLength: 2,
      maxLength: 100,
    }),
    IsString(),
    MinLength(2, { message: 'Name must be at least 2 characters' }),
    MaxLength(100, { message: 'Name cannot exceed 100 characters' }),
    Matches(/^[a-zA-ZÀ-ÿ\s]+$/, { message: 'Name can only contain letters and spaces' })
  ];

  if (required) {
    decorators.push(IsNotEmpty());
  } else {
    decorators.push(IsOptional());
  }

  return applyDecorators(...decorators);
}

export function PasswordValidation(options: {
  requireLength?: boolean;
} = {}) {
  const { requireLength = true } = options;
  const minLength = 6;
  const maxLength = 50;
  
  const decorators = [
    ApiProperty({
      description: requireLength 
        ? `User password (minimum ${minLength} characters)`
        : 'User password',
      example: 'password123',
      ...(requireLength && { minLength, maxLength }),
    }),
    IsString(),
    IsNotEmpty({ message: 'Password is required' })
  ];

  if (requireLength) {
    decorators.push(
      MinLength(minLength, { message: `Password must be at least ${minLength} characters` }),
      MaxLength(maxLength, { message: `Password cannot exceed ${maxLength} characters` })
    );
  }

  return applyDecorators(...decorators);
}