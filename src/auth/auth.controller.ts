import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserNomalDto } from 'src/user/user_dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt.guard';
import { UserService } from 'src/user/user.service';
import { AuthUser } from 'src/types/auth-user.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('email-signup')
  async signUpWithEmail(@Body() userformData: CreateUserNomalDto) {
    return this.authService.signUpWithEmail(userformData);
  }

  @Post('refresh')
  async getNewRefreshToken(@Body() body: { refresh_token: string }) {
    return this.authService.refreshTokens(body.refresh_token);
  }

  @UseGuards(LocalAuthGuard)
  @Post('email-login')
  async signInWithEmial(@Request() req: { user: AuthUser }) {
    return this.authService.loginEmail(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: { user: AuthUser }) {
    return this.userService.updateRefreshToken(req.user.user_id, '');
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('email-login')
  // async signInWithEmial(@Request() req) {
  //   return this.authService.signInWithEmail(req.user);
  // }
}
