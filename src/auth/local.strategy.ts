import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'user_email', passwordField: 'user_pwd' });
  }

  async validate(user_email: string, user_pwd: string): Promise<any> {
    const user = await this.authService.validateUser(user_email, user_pwd);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
