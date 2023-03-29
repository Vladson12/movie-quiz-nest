import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Public()
  @Get('random')
  @HttpCode(HttpStatus.OK)
  async getRandomMovies(
    @Query('quantity') quantity: number,
    @Query('language') language: string,
  ) {
    return this.movieService.getRandomMovies(quantity, language);
  }
}
