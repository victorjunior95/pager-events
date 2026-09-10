import { IsUUID } from 'class-validator';

export class AssignDemandResponsibleDto {
  @IsUUID('4')
  responsibleId!: string;
}
