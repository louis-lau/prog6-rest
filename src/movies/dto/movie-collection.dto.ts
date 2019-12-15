import { ApiProperty } from '@nestjs/swagger'
import { SelfLinkDto } from 'src/common/links.dto'

import { MovieItemDto } from './movie-item.dto'

export class MovieCollectionDto {
  items: MovieItemDto[]

  @ApiProperty({ type: SelfLinkDto })
  _links: SelfLinkDto

  pagination: any
}
