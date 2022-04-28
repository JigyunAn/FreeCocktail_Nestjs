import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  UserSignUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.SignUp(createUserDto);
  }

  @Delete(':email')
  UserSignOut(@Param('email') email: string): Promise<boolean> {
    return this.userService.SignOut(email);
  }

  @Post('/login')
  UserLogin(@Body() loginUserDto: LoginUserDto): Promise<User> {
    return this.userService.Login(loginUserDto);
  }

  //logout

  @UseGuards(AuthGuard)
  @Patch(':id')
  UserEdit(
    @Param('id') id: string,
    @Body() editUserDto: EditUserDto,
  ): Promise<boolean> {
    return this.userService.Edit(id, editUserDto);
  }
}
