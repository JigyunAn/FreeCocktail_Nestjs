import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RecipePageNationDto {
  @ApiProperty({ example: 5, description: 'skip 하려는 레시피 개수' })
  readonly skip: number;

  @ApiProperty({ example: 10, description: '가져올 레시피 개수' })
  readonly size: number;
}
