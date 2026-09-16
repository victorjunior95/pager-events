import { IsEnum } from 'class-validator';
import { DemandStatusDto } from './demand-status.enum';

export class UpdateDemandStatusDto {
  @IsEnum(DemandStatusDto)
  status!: DemandStatusDto;
}
