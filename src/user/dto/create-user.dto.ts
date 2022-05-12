import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly nickname: string;

  //   @MinLength(2)
  //   @MaxLength(30) //password 길이 협의
  @IsString()
  password: string;

  @IsString()
  image: string;

  @IsString()
  @IsEmail()
  readonly email: string;
}
