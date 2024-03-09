import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user-password.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getUsers(): string {
    return this.UserService.getUsers();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUserById(@Param('id') id: string): string {
    return this.UserService.getUserById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  CreateUserDto(@Body() CreateUserDto: CreateUserDto): string {
    return this.UserService.CreateUserDto(CreateUserDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  UpdatePasswordDto(
    @Body() UpdatePasswordDto: UpdatePasswordDto,
    @Param('id') id: string,
  ): string {
    return this.UserService.UpdatePasswordDto(UpdatePasswordDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  DeleteUserById(@Param('id') id: string): string {
    return this.UserService.DeleteUserById(id);
  }
}
