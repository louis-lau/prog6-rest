import { ApiProperty } from '@nestjs/swagger'

class LinkHref {
  @ApiProperty({ example: 'https://example.com' })
  href: string
}

export class SelfLinkDto {
  self: LinkHref
}

export class ItemLinksDto extends SelfLinkDto {
  collection: LinkHref
}
