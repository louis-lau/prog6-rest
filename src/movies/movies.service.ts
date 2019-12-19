import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
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

  public async getOne(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { _id: new ObjectId(id) },
    })
    if (movie) {
      return movie
    } else {
      throw new NotFoundException(
        'No movie found with that id',
        'MovieNotFoundError',
      )
    }
  }
}
