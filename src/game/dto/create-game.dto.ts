import { IsDateString, IsInt, IsPositive, IsUUID } from 'class-validator';

export class CreateGameDto {
  @IsDateString()
  playedAt: Date;

  @IsInt()
  @IsPositive()
  size: number;

  @IsInt()
  @IsPositive()
  correctAnswers: number;

  @IsUUID()
  playerId: string;
}
