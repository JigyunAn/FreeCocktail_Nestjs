import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { loginType } from './loginType';
import * as bcrypt from 'bcrypt';
import { Like } from 'src/like/entities/like.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  @ApiProperty({ example: 1, description: '유저 아이디' })
  id: number;

  @Column({ type: 'varchar' })
  @ApiProperty({ example: '홍길동', description: '유저 이름' })
  nickname: string;

  @Column({ type: 'varchar' })
  @ApiProperty({ example: '1q2w3e4r', description: '유저 비밀번호' })
  password: string;

  @Column({
    type: 'varchar',
    default:
      'https://dorun-image.s3.ap-northeast-2.amazonaws.com/images/defaultImg.png',
  })
  @ApiProperty({
    example:
      'https://dorun-image.s3.ap-northeast-2.amazonaws.com/images/defaultImg.png',
    description: '유저 프로필 사진',
    default:
      'https://dorun-image.s3.ap-northeast-2.amazonaws.com/images/defaultImg.png',
    required: false,
  })
  image: string;

  @Column({ type: 'varchar' })
  @ApiProperty({ example: '123asd@gmail.com', description: '유저 이메일' })
  email: string;

  @Column({ type: 'enum', enum: loginType, default: loginType.none })
  @ApiProperty({ example: '일반', description: '유저 타입', enum: loginType })
  type: loginType;

  @BeforeInsert()
  async hashPassword() {
    console.log('체크');
    this.password = await bcrypt.hash(this.password, 10);
  }
  @OneToMany((type) => Like, (like) => like.user)
  likes: Like[];
}
