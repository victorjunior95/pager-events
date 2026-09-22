import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RejectDemandCompletionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  comment!: string;
}
