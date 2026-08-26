import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

import { UserRole } from '../../../generated/prisma/client';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsEnum(UserRole)
  role!: UserRole;

  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  areaIds!: string[];
}
