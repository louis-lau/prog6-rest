import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId } from 'class-validator'

export class MovieIdParamsDto {
  @IsMongoId()
  @ApiProperty({ type: String })
  id: string
}
