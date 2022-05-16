import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeLikeDto } from 'src/recipe/dto/like-recipe.dto';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
  ) {}

  likeUpdate(recipeLikeDto: RecipeLikeDto) {
    if (recipeLikeDto.likeCheck) {
      const likeInfo = this.likeRepository.create({
        userId: recipeLikeDto.userId,
        drinkId: recipeLikeDto.recipeId,
      });
      this.likeRepository.save(likeInfo);
    } else {
      this.likeRepository.delete({
        userId: recipeLikeDto.userId,
        drinkId: recipeLikeDto.recipeId,
      });
    }
  }
}
