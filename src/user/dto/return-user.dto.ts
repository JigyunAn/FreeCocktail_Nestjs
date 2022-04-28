import { IsOptional } from 'class-validator';
import { User } from '../entities/user.entity';
export class ReturnUserDto extends User {
  @IsOptional()
  token: string;
}
