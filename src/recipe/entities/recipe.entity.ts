import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Like } from 'src/like/entities/like.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';

@Entity('drink')
export class Recipe {
  @PrimaryGeneratedColumn({ type: 'int' })
  @ApiProperty({ example: 1, description: '레시피 아이디' })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ example: '모히토', description: '레시피 이름' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    example:
      "'https://dorun-image.s3.ap-northeast-2.amazonaws.com/images/defaultImg.png",
    description: '레시피 이미지',
  })
  image: string;

  @Column('text', { array: true, nullable: true, default: '{}' })
  @Transform(({ value }) => {
    if (!Array.isArray(value)) {
      return value.split(',');
    }
    return value;
  })
  @ApiProperty({ example: ['청량한', '드라이한'], description: '레시피 태그' })
  tags: string[];

  @Column({ type: 'simple-array', nullable: true })
  @Transform(({ value }) => {
    if (!Array.isArray(value)) {
      return value.split(',');
    }
    return value;
  })
  @ApiProperty({
    example: ['라임', '럼', '탄산수'],
    description: '레시피 재료',
  })
  Ingredient: string[];

  @Column({ type: 'simple-array', nullable: true })
  @Transform(({ value }) => {
    if (!Array.isArray(value)) {
      return value.split(',');
    }
    return value;
  })
  @ApiProperty({
    example: ['1/2개', '7온스', '500ml'],
    description: '재료의 용량',
  })
  measure: string[];

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    example: '재료를 한곳에넣고 섞어주세요.',
    description: '레시피 제조방법',
  })
  Instructions: string;

  @Column({ type: 'int', default: 0 }) // 좋아요 순으로 찾을때 사용
  @ApiProperty({ example: 7, description: '좋아요를 누른 유저수' })
  likeCount: number;

  @CreateDateColumn()
  @ApiProperty({
    example: '2022-05-16 11:20:03.6428',
    description: '생성시간 정보',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    example: '2022-05-16 11:19:19.741505',
    description: '수정시간 정보',
  })
  updatedAt: Date;

  @ApiProperty({
    example: 1,
    description: '레시피를 생성한 유저의 id',
  })
  @Column({ type: 'int', nullable: true, default: null })
  userId: number;

  @OneToMany((type) => Like, (like) => like.drink)
  likes: Like[];

  @ManyToOne((type) => User, (user) => user.recipes)
  user: User;
}
