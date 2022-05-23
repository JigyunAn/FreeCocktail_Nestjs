import { PickType } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
import { User } from '../entities/user.entity';
export class LoginUserDto extends PickType(User, ['email', 'password']) {
  //@IsString()
  // readonly email: string;
  // @IsString()
  // readonly password: string;
}
