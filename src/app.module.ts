import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Movie } from './movies/movie.entity'
import { MoviesModule } from './movies/movies.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/prog6',
      keepConnectionAlive: true,
      entities: [Movie],
      synchronize: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      appname: 'prog6',
    }),
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
