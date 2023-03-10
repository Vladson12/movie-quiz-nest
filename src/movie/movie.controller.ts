import { Controller, Get, Query } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
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