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
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'express';
import { EditUserDto } from './dto/edit-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('user')
@ApiTags('User API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @ApiOperation({ summary: '유저가입', description: '유저 생성.' })
  @ApiCreatedResponse({ description: '유저 생성 성공.', type: User })
  UserSignUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.SignUp(createUserDto);
  }

  @Post('/login')
  @ApiOperation({ summary: '로그인', description: '로그인 진행' })
  @ApiOkResponse({ description: '로그인 성공.', type: User })
  @HttpCode(200)
  UserLogin(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<User> {
    return this.userService.Login(loginUserDto, res);
  }

  @Post('/logout')
  @ApiOperation({ summary: '로그아웃', description: '로그아웃' })
  @ApiOkResponse({
    description: '로그아웃 성공.',
    schema: {
      example: true,
    },
  })
  @HttpCode(200)
  //UserLogout(@Res({ passthrough: true }) res: Response): Promise<boolean> {
  UserLogout(@Res({ passthrough: true }) res: Response): any {
    return this.userService.Logout(res);
  }

  @Post('/google')
  @ApiOperation({ summary: '소셜로그인 구글', description: '소셜로그인 구글' })
  @ApiOkResponse({ description: '로그인 성공.', type: User })
  UserGoogleLogin(
    @Body('idToken') idToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.GoogleLogin(idToken, res);
  }

  @Post('/naver')
  @ApiOperation({
    summary: '소셜로그인 네이버',
    description: '소셜로그인 네이버',
  })
  @ApiOkResponse({ description: '로그인 성공.', type: User })
  UserNaverLogin(
    @Body('idToken') idToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.NaverLogin(idToken, res);
  }

  //@ApiBearerAuth()
  //@UseGuards(AuthGuard)
  @Delete(':email')
  @ApiOperation({ summary: '유저 탈퇴', description: '유저 탈퇴' })
  @ApiOkResponse({
    description: '유저 탈퇴 성공.',
    schema: {
      example: true,
    },
  })
  UserSignOut(@Param('email') email: string): Promise<boolean> {
    return this.userService.SignOut(email);
  }

  @Get('/check-name/:nickname')
  @ApiOperation({
    summary: '유저 닉네임 중복 체크',
    description: '유저 닉네임 중복 체크',
  })
  @ApiOkResponse({ description: '조회 성공.', type: Boolean })
  UserNameCheck(@Param('nickname') nickname: string) {
    return this.userService.NameCheck(nickname);
  }

  //@UseGuards(AuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({
    summary: '유저 정보수정',
    description: '유저 정보를 수정한다.',
  })
  @ApiCreatedResponse({
    description: '유저 정보수정 성공.',
    schema: {
      example: true,
    },
  })
  UserEdit(
    @UploadedFile() image: Express.Multer.File,
    @Param('id') id: string,
    @Body() editUserDto: EditUserDto,
  ): Promise<boolean> {
    return this.userService.Edit(image, editUserDto, id);
  }

  @Get(':email')
  @ApiOperation({ summary: '유저 조회', description: '유저 조회' })
  @ApiOkResponse({ description: '조회 성공.', type: User })
  UserFind(@Param('email') email: string): Promise<User> {
    return this.userService.FindOne(email);
  }
}
