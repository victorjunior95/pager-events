import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';

export class UpdateUserAreasDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  areaIds!: string[];
}
