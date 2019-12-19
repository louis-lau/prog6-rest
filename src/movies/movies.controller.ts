import { Body, Controller, Delete, Get, Header, HttpCode, Options, Param, Post, Put, Request } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request as ExpressRequest } from 'express'

import { AddMovieDto } from './dto/add-movie.dto'
import { MovieCollectionDto } from './dto/movie-collection.dto'
import { MovieIdParamsDto } from './dto/movie-id-params.dto'
import { MovieItemDto } from './dto/movie-item.dto'
import { Movie } from './movie.entity'
import { MoviesService } from './movies.service'

@Controller('movies')
@ApiTags('Movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Options()
  @Header('Allow', 'GET,POST,OPTIONS')
  public options(): void {
    return
  }

  @Get()
  public async getAllMovies(@Request() req: ExpressRequest): Promise<MovieCollectionDto> {
    const movies: MovieItemDto[] = (await this.moviesService.getAll()) as MovieItemDto[]
    for (let movie of movies) {
      movie = await this.moviesService.movieToMovieItem(movie, req.hostname)
    }

    return {
      items: movies,
      _links: {
        self: {
          href: `https://${req.hostname}/movies`,
        },
      },
      pagination: {
        currentPage: 1,
        currentItems: 19,
        totalPages: 1,
        totalItems: 19,
        _links: {
          first: {
            page: 1,
            href: 'https://docent.cmi.hro.nl/bootb/demo/notes/',
          },
          last: {
            page: 1,
            href: 'https://docent.cmi.hro.nl/bootb/demo/notes/',
          },
          previous: {
            page: 1,
            href: 'https://docent.cmi.hro.nl/bootb/demo/notes/',
          },
          next: {
            page: 1,
            href: 'https://docent.cmi.hro.nl/bootb/demo/notes/',
          },
        },
      },
    }
  }

  @Post()
  public async addMovie(@Body() movie: AddMovieDto): Promise<Movie> {
    return this.moviesService.add(movie)
  }

  @Get(':id')
  public async getMovieDetails(@Param() movieIdParamsDto: MovieIdParamsDto, @Request() req): Promise<MovieItemDto> {
    const movie = await this.moviesService.getOne(movieIdParamsDto.id)
    return this.moviesService.movieToMovieItem(movie, req.hostname)
  }

  @Put(':id')
  public async updateMovie(
    @Param() movieIdParamsDto: MovieIdParamsDto,
    @Body() addMovieDto: AddMovieDto,
    @Request() req: ExpressRequest,
  ): Promise<MovieItemDto> {
    const movie = addMovieDto as Movie

    const updatedMovie = await this.moviesService.updateOne(movieIdParamsDto.id, movie)
    return this.moviesService.movieToMovieItem(updatedMovie, req.hostname)
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteMovie(@Param() movieIdParamsDto: MovieIdParamsDto): Promise<void> {
    return this.moviesService.deleteOne(movieIdParamsDto.id)
  }
}
