import { IsString, IsEmail } from 'class-validator';
import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateUserDto extends PickType(User, [
  'nickname',
  'password',
  'image',
  'email',
] as const) {
  // @IsString()
  // nickname: string;
  // //   @MinLength(2)
  // //   @MaxLength(30) //password 길이 협의
  // @IsString()
  // password: string;
  // @IsString()
  // image?: string;
  // @IsString()
  // @IsEmail()
  // email: string;
}
