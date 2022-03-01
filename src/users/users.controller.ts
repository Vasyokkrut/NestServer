import { Get, Controller, Body, Post, Delete } from '@nestjs/common';
import { AddUserDto } from './dto/add-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/getUsers')
  getUsers() {
    return this.userService.getUsers();
  }

  @Post('/addUser')
  addUser(@Body() dto: AddUserDto) {
    return this.userService.addUser(dto);
  }

  @Delete('/deleteUser')
  deleteUser(@Body() dto: DeleteUserDto) {
    return this.userService.deleteUser(dto);
  }
}
