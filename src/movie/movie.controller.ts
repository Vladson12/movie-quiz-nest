import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';

@Controller('movie')
@UseGuards(JwtAccessGuard)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('random')
  @HttpCode(HttpStatus.OK)
  async getRandomMovies(
    @Query('quantity') quantity: number,
    @Query('language') language: string,
  ) {
    return this.movieService.getRandomMovies(quantity, language);
  }
}
