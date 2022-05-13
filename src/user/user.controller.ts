import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  UserSignUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.SignUp(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':email')
  UserSignOut(@Param('email') email: string): Promise<boolean> {
    return this.userService.SignOut(email);
  }

  @Post('/login')
  UserLogin(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<User> {
    return this.userService.Login(loginUserDto, res);
  }

  @Post('/logout')
  UserLogout(@Res({ passthrough: true }) res: Response): Promise<boolean> {
    return this.userService.Logout(res);
  }

  //@UseGuards(AuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async UserEdit(
    @UploadedFile() iamge: Express.Multer.File,
    @Param('id') id: string,
    @Body() body,
  ): Promise<boolean> {
    return this.userService.Edit(iamge, body, id);
  }

  @Get(':email')
  UserFind(@Param('email') email: string): Promise<User> {
    return this.userService.UserInfo(email);
  }
}
