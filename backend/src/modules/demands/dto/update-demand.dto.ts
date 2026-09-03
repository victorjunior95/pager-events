import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

import { DemandUrgencyDto } from './demand-urgency.enum';

export class UpdateDemandDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(DemandUrgencyDto)
  urgency?: DemandUrgencyDto;

  @IsOptional()
  @IsDateString()
  dueAt?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  areaIds?: string[];
}
