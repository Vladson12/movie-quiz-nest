import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  theMovieDbId: number;

  @Column('varchar')
  originalTitle: string;

  constructor(partial: Partial<Movie>) {
    Object.assign(this, partial);
  }
}
