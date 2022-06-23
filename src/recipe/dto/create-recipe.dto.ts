import { PickType } from '@nestjs/swagger';
import { Recipe } from '../entities/recipe.entity';

export class CreateRecipeDto extends PickType(Recipe, [
  'name',
  'tags',
  'image',
  'Ingredient',
  'measure',
  'Instructions',
  'userId',
]) {}
