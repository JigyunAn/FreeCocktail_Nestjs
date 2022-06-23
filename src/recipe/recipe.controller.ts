import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipeTagQueryDto } from './dto/query-tag-recipe.dto';
import { RecipeLikeQueryDto } from './dto/query-like-recipe.dto';
import { RecipeLikeDto } from './dto/like-recipe.dto';
import { LikeService } from '../like/like.service';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Recipe } from './entities/recipe.entity';

@Controller('recipe')
@ApiTags('Recipe API')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly likeService: LikeService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({
    summary: '커스텀 레시피 생성',
    description: '커스텀 레시피 생성',
  })
  @ApiCreatedResponse({ description: '레시피 생성 성공', type: Recipe })
  recipeCreate(
    @UploadedFile() image: Express.Multer.File,
    @Body() createRecipeDto: CreateRecipeDto,
  ): Promise<Recipe> {
    return this.recipeService.create(createRecipeDto, image);
  }

  @Post('/like')
  @ApiOperation({
    summary: '레시피 좋아요 증감',
    description: '레시피 좋아요 증감',
  })
  @ApiCreatedResponse({ description: '좋아요 증감 반영 성공', type: Recipe })
  recipeUpdateLike(@Body() recipeLikeDto: RecipeLikeDto): Promise<Recipe> {
    this.likeService.likeUpdate(recipeLikeDto);
    return this.recipeService.updateLike(recipeLikeDto);
  }

  @Get()
  @ApiOperation({
    summary: '전체 레시피 조회',
    description: '전체 레시피 조회',
  })
  @ApiCreatedResponse({ description: '조회 성공', type: [Recipe] })
  recipeFindAll(): Promise<Recipe[]> {
    return this.recipeService.findAll();
  }

  @Get('/tag')
  @ApiOperation({
    summary: '태그별 레시피 조회',
    description: '태그별 레시피 조회',
  })
  @ApiCreatedResponse({ description: '조회 성공', type: [Recipe] })
  recipeFindTag(@Query() queryData: RecipeTagQueryDto): Promise<Recipe[]> {
    return this.recipeService.findTag(queryData);
  }

  @Get('/like')
  @ApiOperation({
    summary: '좋아요 개수 순으로 레시피 조회',
    description: '좋아요 개수 순으로 레시피 조회',
  })
  @ApiCreatedResponse({ description: '조회 성공', type: [Recipe] })
  recipeFindLike(@Query() queryData: RecipeLikeQueryDto): Promise<Recipe[]> {
    return this.recipeService.findLike(queryData);
  }

  @Get(':id')
  @ApiOperation({
    summary: '단일 레시피 조회',
    description: '단일 레시피 조회',
  })
  @ApiCreatedResponse({ description: '조회 성공', type: [Recipe] })
  recipeFindId(@Param('id') id: string): Promise<Recipe> {
    return this.recipeService.findOne(+id);
  }

  @Get('/custom/:userId')
  @ApiOperation({
    summary: '유저가 만든 커스텀 레시피 조회',
    description: '유저가 만든 커스텀 레시피 조회',
  })
  @ApiCreatedResponse({ description: '조회 성공', type: [Recipe] })
  recipeFindUserId(@Param('userId') userId: string): Promise<Recipe[]> {
    return this.recipeService.findByUserRecipe(+userId);
  }
}
