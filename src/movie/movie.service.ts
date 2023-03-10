import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import random from 'lodash.random';
import axios from 'axios';
import { GetMovieDto } from './dto/get-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async getRandomMovies(quantity: number, language: string) {
    let movieData: any;
    let imagesData: any;
    let getMovieDto: GetMovieDto;
    const movies: GetMovieDto[] = [];

    const movieCount = await this.movieRepository.count();
    for (let i = 0; i < quantity; i++) {
      do {
        const randomId = random(1, movieCount);
        const randomMovie = await this.movieRepository.findOne({
          where: { id: randomId },
        });

        const movieResponse = await axios.get(
          `${process.env.MOVIE_API_MOVIE_ENDPOINT}/${randomMovie.theMovieDbId}?language=${language}`,
          {
            proxy: {
              host: process.env.PROXY_HOST,
              port: +process.env.PROXY_PORT,
              protocol: process.env.PROXY_PROTOCOL,
            },
            headers: { Authorization: `Bearer ${process.env.MOVIE_API_KEY}` },
          },
        );
        movieData = movieResponse.data;
        const movieReleaseDate = movieData['release_date'].slice(
          0,
          movieData.release_date.indexOf('-'),
        );

        const imagesResponse = await axios.get(
          `${process.env.MOVIE_API_MOVIE_ENDPOINT}/${movieData.id}/images`,
          {
            proxy: {
              host: process.env.PROXY_HOST,
              port: +process.env.PROXY_PORT,
              protocol: process.env.PROXY_PROTOCOL,
            },
            headers: { Authorization: `Bearer ${process.env.MOVIE_API_KEY}` },
          },
        );
        imagesData = imagesResponse.data;

        if (imagesData.backdrops.length === 0) continue;

        getMovieDto = {
          title: movieData.title,
          imdb_id: movieData.imdb_id,
          overview: movieData.overview,
          releaseDate: movieReleaseDate,
          images: imagesData.backdrops.map(
            (backdrop) =>
              `${process.env.MOVIE_API_IMAGE_ENDPOINT}${backdrop.file_path}`,
          ),
        };
        movies.push(getMovieDto);
      } while (imagesData.backdrops.length === 0);
    }
    return movies;
  }
}
