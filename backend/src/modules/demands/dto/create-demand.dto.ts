import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

import { DemandUrgencyDto } from './demand-urgency.enum';

export class CreateDemandDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(DemandUrgencyDto)
  urgency?: DemandUrgencyDto;

  @IsOptional()
  @IsDateString()
  dueAt?: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  areaIds!: string[];
}
