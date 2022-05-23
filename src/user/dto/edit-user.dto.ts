import { CreateUserDto } from './create-user.dto';
//import { PartialType } from '@nestjs/mapped-types';
import { PartialType, PickType, OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class EditUserDto extends PartialType(CreateUserDto) {}
// export class EditUserDto extends PartialType(
//   OmitType(User, ['id', 'type',] as const),
// ) {}
