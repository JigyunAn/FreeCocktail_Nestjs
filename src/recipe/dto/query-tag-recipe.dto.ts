import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RecipeTagQueryDto {
  @Transform(({ value }) => {
    if (!Array.isArray(value)) {
      return value.split(',');
    }
    return value;
  })
  @ApiProperty({ example: ['청량한', '드라이한'], description: '레시피 태그' })
  readonly tag: string[];

  @ApiProperty({ example: 5, description: 'skip 하려는 레시피 개수' })
  readonly skip: number;

  @ApiProperty({ example: 10, description: '가져올 레시피 개수' })
  readonly size: number;
}
