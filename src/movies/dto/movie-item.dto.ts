import { ApiProperty } from '@nestjs/swagger'
import { ItemLinksDto } from 'src/common/links.dto'

import { Movie } from '../movie.entity'

export class MovieItemDto extends Movie {
  @ApiProperty({ type: ItemLinksDto })
  _links: ItemLinksDto
}
