import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  Login(loginUser: User): any {
    const payload = { loginUser };
    //loginUser['token'] = this.jwtService.sign(payload);
    return this.jwtService.sign(payload);
  }

  verify(jwtString: string) {
    try {
      const payload = this.jwtService.verify(jwtString);

      const { loginUser } = payload;

      return loginUser;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
