import { Transform } from 'class-transformer';
export class CreateRecipeDto {
  readonly name: string;

  @Transform(({ value }) => {
    if (!Array.isArray(value)) {
      return value.split(',');
    }
    return value;
  })
  readonly tags: string[];

  public image?: string;

  @Transform(({ value }) => {
    if (!Array.isArray(value)) {
      return value.split(',');
    }
    return value;
  })
  readonly Ingredient: string[];

  @Transform(({ value }) => {
    if (!Array.isArray(value)) {
      return value.split(',');
    }
    return value;
  })
  readonly measure: string[];

  readonly Instructions: string;
}
