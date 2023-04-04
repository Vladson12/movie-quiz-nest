import { IsDateString, IsInt, IsPositive } from 'class-validator';
import { IsLesserOrEqualThan } from 'src/decorators/is-lesser-or-equal-than.decorator';
import { IsNotNegativeNumber } from 'src/decorators/is-not-negative-number.decorator';

export class CreateGameDto {
  @IsDateString()
  playedAt: Date;

  @IsInt()
  @IsPositive()
  size: number;

  @IsInt()
  @IsNotNegativeNumber()
  @IsLesserOrEqualThan('size', {
    message: `correctAnswers must lesser then or equal to size`,
  })
  correctAnswers: number;
}
