import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateUserDto extends PickType(User, [
  'nickname',
  'password',
  'image',
  'email',
] as const) {}
