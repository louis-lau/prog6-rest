import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'

import { Movie } from './movie.entity'

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: MongoRepository<Movie>,
  ) {}

  public async add(movie: Movie): Promise<Movie> {
    const movieInstance = new Movie()
    movieInstance.title = movie.title
    movieInstance.description = movie.description
    movieInstance.director = movie.director

    return this.movieRepository.save(movieInstance)
  }

  public async getAll(): Promise<Movie[]> {
    return this.movieRepository.find()
  }
}
