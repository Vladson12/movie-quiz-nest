import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('movie')
@UseGuards(JwtGuard)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('random')
  async getRandomMovies(
    @Query('quantity') quantity: number,
    @Query('language') language: string,
  ) {
    return this.movieService.getRandomMovies(quantity, language);
  }
}
