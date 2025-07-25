import { Controller, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserNomalDto } from './user_dto/create-user.dto';
import { EmailSignInDto } from 'src/auth/dto/signIn-email.dto';

// 회원가입, 탈퇴
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('email-join')
  async create(@Body() userFormData: CreateUserNomalDto) {
    return this.userService.signUpWithEmail(userFormData);
  }

  @Post('email-enter')
  async signInWithEmail(@Body() emailSignInDto: EmailSignInDto) {
    return this.userService.userFindByEmail(emailSignInDto);
  }

  // @Get()
  // async getUseryEmail(@Body() userEmail: string, @Body() teamID: string) {
  //   return this.myPage.userfindByEmail(userEmail, +teamID);
  // }

  @Post('delete/:id')
  async leaveMembership(@Param('id') user_id: string) {
    return this.userService.deleteUserById(+user_id);
  }
}
