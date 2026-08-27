import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { AreaType } from '../../../generated/prisma/client';

export class CreateAreaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsEnum(AreaType)
  type!: AreaType;
}
