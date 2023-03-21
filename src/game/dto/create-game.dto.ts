import { IsDateString, IsInt, IsPositive, IsUUID } from 'class-validator';
import { IsLesserOrEqualThan } from 'src/decorators/is-lesser-or-equal-than.decorator';

export class CreateGameDto {
  @IsDateString()
  playedAt: Date;

  @IsInt()
  @IsPositive()
  size: number;

  @IsInt()
  @IsPositive()
  @IsLesserOrEqualThan('size', {
    message: `correctAnswers must lesser then or equal to size`,
  })
  correctAnswers: number;

  @IsUUID()
  playerId: string;
}
