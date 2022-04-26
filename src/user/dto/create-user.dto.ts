import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly nickname: string;

  @IsString()
  //   @MinLength(2)
  //   @MaxLength(30) //password 길이 협의
  readonly password: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly image: string;
}
