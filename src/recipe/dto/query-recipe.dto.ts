import { Transform } from 'class-transformer';
import { IsArray, IsString, Length } from 'class-validator';
export class RecipeQueryDto {
  @Transform(({ value }) => {
    if (!Array.isArray(value)) {
      return value.split(',');
    }
    return value;
  })
  readonly tag?: string[];

  readonly skip: number;

  readonly size: number;
}
