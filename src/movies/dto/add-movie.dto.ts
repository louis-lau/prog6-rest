import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class AddMovieDto {
  @ApiProperty({ example: 'Joker' })
  @IsString()
  title: string

  @ApiProperty({
    example:
      'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.',
  })
  @IsString()
  description: string

  @ApiProperty({
    example: 'Todd Phillips',
  })
  @IsString()
  director: string
}
