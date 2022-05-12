import { Request } from 'express';
import { Observable } from 'rxjs';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const userData = this.validateRequest(request);

    request.body.UserData = userData;

    return this.validateRequest(request);
  }

  private validateRequest(request: Request) {
    try {
      const jwtString = request.cookies['accessToken'];

      return this.authService.verify(jwtString);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
