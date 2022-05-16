import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeQueryDto } from './dto/query-recipe.dto';
import { RecipeLikeDto } from './dto/like-recipe.dto';
import { LikeService } from '../like/like.service';

@Controller('recipe')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly likeService: LikeService,
  ) {}

  @Post() //
  @UseInterceptors(FileInterceptor('image'))
  recipeCreate(
    @UploadedFile() image: Express.Multer.File,
    @Body() createRecipeDto: CreateRecipeDto,
  ) {
    return this.recipeService.create(createRecipeDto, image);
  }

  @Post('/like') //
  async recipeUpdateLike(@Body() recipeLikeDto: RecipeLikeDto) {
    this.likeService.likeUpdate(recipeLikeDto);
    return await this.recipeService.updateLike(recipeLikeDto);
  }

  @Get() //
  async recipeFindAll() {
    return await this.recipeService.findAll();
  }

  @Get('/tag') //
  async recipeFindTag(@Query() queryData: RecipeQueryDto) {
    return await this.recipeService.findTag(queryData);
  }

  @Get('/like') //
  async recipeFindLike(@Query() queryData: RecipeQueryDto) {
    return await this.recipeService.findLike(queryData);
  }

  @Get(':id') //
  recipeFindId(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
  }
}
