import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { MongoRepository } from 'typeorm'

import { AddMovieDto } from './dto/add-movie.dto'
import { MovieItemDto } from './dto/movie-item.dto'
import { Movie } from './movie.entity'

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: MongoRepository<Movie>,
  ) {}

  public async movieToMovieItem(movie: Movie, hostname: string): Promise<MovieItemDto> {
    const movieItem = movie as MovieItemDto
    movieItem._links = {
      self: {
        href: `https://${hostname}/movies/${movie._id}`,
      },
      collection: {
        href: `https://${hostname}/movies`,
      },
    }

    return movieItem
  }

  public async add(movie: Movie): Promise<Movie> {
    const movieEntity = new Movie()
    Object.assign(movieEntity, movie)

    return this.movieRepository.save(movieEntity)
  }

  public async getAll(): Promise<Movie[]> {
    return this.movieRepository.find()
  }

  public async getOne(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { _id: new ObjectId(id) } })
    if (movie) {
      return movie
    } else {
      throw new NotFoundException('No movie found with that id', 'MovieNotFoundError')
    }
  }

  public async updateOne(id: string, movie: Movie): Promise<Movie> {
    const movieEntity = new Movie()
    Object.assign(movieEntity, movie)

    await this.movieRepository.updateOne({ _id: new ObjectId(id) }, { $set: movieEntity })
    return movieEntity
  }

  public async deleteOne(id: string): Promise<void> {
    this.movieRepository.deleteOne({ _id: new ObjectId(id) })
  }
}
