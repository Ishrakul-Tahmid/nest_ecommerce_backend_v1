import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './update-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Endpoint to create a new user
  @Post('/auth/signup')
  async createUser(
    @Body('name') name: string,
    @Body('username') username: string, // Added username field
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: string, // Renamed rule to role
  ) {
    return this.usersService.create(name, username, email, password, role);
  }

  // Endpoint to find a user by ID
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Endpoint to find all users
  @Get()
  findAllUsers() {
    return this.usersService.find();
  }

  // Endpoint to delete a user by ID
  @Delete('/delete/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  // Endpoint to update a user by ID
  @Patch('/update/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
