import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserNomalDto } from './user_dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';
import { randomNickMaker } from './randomNick';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async userSignUpWithEmail(signupform: CreateUserNomalDto) {
    const userEmail = signupform.user_email;
    const isExist = await this.isExistEmail(userEmail);

    if (isExist) {
      // 사용 불가능 이메일
      // 409 응답 보냄
      throw new ConflictException('이미 존재하는 이메일 입니다');
    }

    const hashedPWD = await bcrypt.hash(signupform.user_pwd, 18);

    // 랜덤 형용사 + 구단 마스코트
    const userNick = randomNickMaker(signupform.user_like_staId);

    const data = await this.prisma.user.create({
      data: {
        user_email: signupform.user_email,
        user_like_staId: signupform.user_like_staId
          ? signupform.user_like_staId
          : 0,
        user_pwd: hashedPWD,
        user_grade: 1,
        user_nick: userNick,
      },
    });
  }

  // 이메일로 가입한 회원/ grade :1
  async userfindByEmail(userEmail: string, teamID: number) {
    const mypageLogoIMG = await this.prisma.stadium.findFirst({
      where: {
        sta_id: teamID,
      },
      select: {
        sta_image: true,
      },
    });
    const data = await this.prisma.user.findFirst({
      where: {
        user_email: userEmail,
      },
      select: {
        user_like_staId: true,
        user_email: true,
        user_grade: true,
        user_nick: true,
      },
    });

    // 이미지 주소 취합해서 보내기
    const response = {
      ...data,
      sta_image: mypageLogoIMG?.sta_image,
    };

    return response;
  }

  // 이미 존재하는 회원인지 이메일로 확인
  private async isExistEmail(user_email: string) {
    const exist = await this.prisma.user.findFirst({
      where: {
        user_email: user_email,
      },
    });

    return exist;
  }

  async deleteUserById(user_id: number) {}
}
