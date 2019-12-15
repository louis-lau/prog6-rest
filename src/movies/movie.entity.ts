// import { ObjectID } from 'mongodb'
import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity({ name: 'movies' })
export class Movie {
  @ObjectIdColumn()
  @ApiProperty({ example: '5df52f51db0af571e05c00f7' })
  _id?: string

  @Column()
  @ApiProperty({ example: 'Joker' })
  title: string

  @Column()
  @ApiProperty({ example: 'In Gotham City, mentally troubled ...' })
  description: string

  @Column()
  @ApiProperty({ example: 'Todd Phillips' })
  director: string
}
