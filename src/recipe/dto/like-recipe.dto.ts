import { ApiProperty } from '@nestjs/swagger';

export class RecipeLikeDto {
  @ApiProperty({ example: 1, description: '유저 아이디' })
  readonly userId: number;

  @ApiProperty({ example: 7, description: '레시피 아이디' })
  readonly recipeId: number;

  @ApiProperty({ example: true, description: '좋아요 상태 확인' })
  readonly likeCheck: boolean;
}
