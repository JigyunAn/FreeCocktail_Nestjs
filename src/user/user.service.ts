import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  // 이미지작업 요망
  async SignUp(createuserDto: CreateUserDto): Promise<User> {
    const UserInfo = await this.usersRepository.findOne({
      email: createuserDto.email,
    });

    if (UserInfo) {
      throw new ConflictException('이미 가입되어 있는 이메일 입니다.');
    }
    const UserData = this.usersRepository.create(createuserDto);
    return await this.usersRepository.save(UserData);
  }

  async SignOut(email: string): Promise<boolean> {
    /**
     * remove() & delete()
     * - remove: 존재하지 않는 아이템을 삭제하면 404 Error가 발생합니다.
     * - delete: 해당 아이템이 존재 유무를 파악하고 존재하면 삭제하고, 없다면 아무 에러도 발생하지 않는다.
     */
    const deleteUser = await this.usersRepository.delete({ email });

    if (deleteUser.affected === 0) {
      throw new NotFoundException('존재하지 않는 유저의 이메일 입니다.');
    }

    return true;
  }

  async Login(
    loginUserDto: LoginUserDto,
    res: Response,
  ): Promise<ReturnUserDto> {
    const UserInfo = await this.usersRepository.findOne({
      email: loginUserDto.email,
    });

    const PasswordCheck = await bcrypt.compare(
      loginUserDto.password,
      UserInfo.password,
    );
    if (!UserInfo || !PasswordCheck) {
      throw new NotFoundException('유효하지 않은 유저정보 입니다.');
    }
    const token = this.authService.Login(UserInfo);

    res.cookie('accessToken', token, {
      maxAge: 60 * 60 * 24 * 1, //1day
      sameSite: 'none',
      httpOnly: true,
      //secure: true, // 추후 활성화
    });

    return UserInfo;
  }

  async Logout(res: Response): Promise<boolean> {
    res.clearCookie('accessToken');
    return true;
  }

  async Edit(
    iamge: Express.Multer.File,
    editUserDto: EditUserDto,
    id: string,
  ): Promise<boolean> {
    if (editUserDto.password) {
      editUserDto.password = await bcrypt.hash(editUserDto.password, 10);
    }
    if (iamge) {
      editUserDto.image = iamge['location'];
    }

    const userInfo = await this.usersRepository.update(id, {
      ...editUserDto,
    });

    if (userInfo.affected !== 1) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    return true;
  }

  async UserInfo(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }
}
