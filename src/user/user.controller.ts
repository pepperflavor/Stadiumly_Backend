import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserNomalDto } from './user_dto/create-user.dto';
import { UpdateUserDto } from './user_dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('email-signup')
  async create(@Body() userFormData: CreateUserNomalDto) {
    return this.userService.userSignUpWithEmail(userFormData);
  }

  @Get()
  async getUseryEmail(@Body() userEmail: string) {
    return this.userService.userfindByEmail(userEmail);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
