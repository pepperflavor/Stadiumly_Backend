import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(userEmail: string): Promise<any> {
    const user = await this.userService.userfindOne(userEmail);
  }
}
