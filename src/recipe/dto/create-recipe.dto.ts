import { Transform } from 'class-transformer';
import { PickType } from '@nestjs/swagger';
import { Recipe } from '../entities/recipe.entity';

export class CreateRecipeDto extends PickType(Recipe, [
  'name',
  'tags',
  'image',
  'Ingredient',
  'measure',
  'Instructions',
]) {
  // readonly name: string;
  // @Transform(({ value }) => {
  //   if (!Array.isArray(value)) {
  //     return value.split(',');
  //   }
  //   return value;
  // })
  // readonly tags: string[];
  // public image?: string;
  // @Transform(({ value }) => {
  //   if (!Array.isArray(value)) {
  //     return value.split(',');
  //   }
  //   return value;
  // })
  // readonly Ingredient: string[];
  // @Transform(({ value }) => {
  //   if (!Array.isArray(value)) {
  //     return value.split(',');
  //   }
  //   return value;
  // })
  // readonly measure: string[];
  // readonly Instructions: string;
}
