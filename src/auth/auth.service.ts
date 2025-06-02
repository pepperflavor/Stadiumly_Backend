import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MypageService } from 'src/user/mypage/mypage.service';
import { UserService } from 'src/user/user.service';

import { JwtService } from '@nestjs/jwt';
import { CreateUserNomalDto } from 'src/user/user_dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthUser } from 'src/types/auth-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private myPageService: MypageService,
    private jwtService: JwtService,
  ) {}

  async loginEmail(user: AuthUser) {
    const payload = {
      sub: +user.user_id,
      username: user.user_nick,
      user_refreshtoken: user.user_refreshtoken || null,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1d' });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '14d',
    });

    await this.userService.updateRefreshToken(user.user_id, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken);
      const user = await this.userService.findUserById(decoded.sub);

      if (!user || !user.user_refreshtoken) {
        throw new UnauthorizedException('No user or refresh token found');
      }

      const isMatch = await bcrypt.compare(
        refreshToken,
        user.user_refreshtoken,
      );

      if (!isMatch) {
        throw new UnauthorizedException('Refresh token is SUCK');
      }

      const payload = { sub: user?.user_id, username: user?.user_nick };

      const newAccessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
      const newRefreshToken = this.jwtService.sign(payload, {
        expiresIn: '14d',
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      await this.userService.updateRefreshToken(user.user_id, newRefreshToken);

      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Token expired or Invalid');
    }
  }

  // // 이메일로 로그인시 검사
  // async signInWithEmail(emailSignInDto: EmailSignInDto) {
  //   // 비밀번호 제외한 data
  //   const userData = await this.userService.userFindByEmail(emailSignInDto);

  //   // 여기에 JWT 리턴해줘야 함
  //   const payload = { sub: userData?.user_id, username: userData?.user_nick };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  async validateUser(
    user_email: string,
    user_pwd: string,
  ): Promise<AuthUser | null> {
    const user = await this.userService.userFindByEmail({
      user_email,
      user_pwd,
    });
    if (!user || !user.user_id) return null;
    if (!user || !user.user_pwd) return null;

    const isMatch = await bcrypt.compare(user_pwd, user.user_pwd);
    if (!isMatch) return null;

    const { user_pwd: _, user_refreshtoken: __, ...safeUser } = user; // user_pwd 제거
    return safeUser as AuthUser; // 타입 보장
  }

  async signUpWithEmail(userData: CreateUserNomalDto) {
    return this.userService.signUpWithEmail(userData);
  }
}
