import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeTagQueryDto } from './dto/query-tag-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { RecipeLikeDto } from './dto/like-recipe.dto';
import { RecipeLikeQueryDto } from './dto/query-like-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto, image) {
    try {
      createRecipeDto.image = image['location'];

      const recipeInfo = this.recipeRepository.create(createRecipeDto);

      return await this.recipeRepository.save(recipeInfo);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.recipeRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Recipe> {
    return await this.recipeRepository.findOne({ id });
  }

  async findTag(data: RecipeTagQueryDto): Promise<Recipe[]> {
    const { tag, skip, size } = data;
    return await this.recipeRepository
      .createQueryBuilder('recipe')
      .where('recipe.tags @> ARRAY[:...tag]', { tag })
      .offset(skip)
      .limit(size)
      .orderBy('id', 'ASC')
      .getMany();
  }

  async findLike(data: RecipeLikeQueryDto): Promise<Recipe[]> {
    const { skip, size } = data;
    return await this.recipeRepository
      .createQueryBuilder('Drink')
      .offset(skip)
      .limit(size)
      .orderBy('Drink.likeCount', 'DESC')
      .addOrderBy('Drink.id', 'ASC')
      .getMany();
  }

  async updateLike(recipeLikeDto: RecipeLikeDto) {
    const recipeInfo = await this.recipeRepository.findOne({
      id: recipeLikeDto.recipeId,
    });

    if (recipeLikeDto.likeCheck) {
      recipeInfo.likeCount = recipeInfo.likeCount + 1;
    } else {
      if (recipeInfo.likeCount > 0) {
        recipeInfo.likeCount = recipeInfo.likeCount - 1;
      }
    }

    this.recipeRepository.save(recipeInfo);
    return recipeInfo;
  }
}
