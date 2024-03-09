import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { usersDB } from './users-db';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user-password.dto';

@Injectable()
export class UserService {
  getUsers() {
    return JSON.stringify(usersDB);
  }

  getUserById(id: string) {
    if (usersDB[id]) {
      return JSON.stringify(usersDB[id]);
    }
  }

  CreateUserDto(CreateUserDto: CreateUserDto) {
    const id = uuidv4();
    usersDB[id] = {
      id: id,
      login: CreateUserDto.login,
      password: CreateUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    return JSON.stringify({
      id: id,
      login: CreateUserDto.login,
    });
  }

  UpdatePasswordDto(UpdatePasswordDto: UpdatePasswordDto, id: string) {
    if ((usersDB[id].password = UpdatePasswordDto.oldPassword)) {
      usersDB[id].password = UpdatePasswordDto.newPassword;
      usersDB[id].updatedAt = Date.now();
      usersDB[id].version = ++usersDB[id].version;
    }
    return JSON.stringify({
      id: id,
      oldPassword: UpdatePasswordDto.oldPassword,
      newPassword: UpdatePasswordDto.newPassword,
    });
  }

  DeleteUserById(id: string) {
    if (usersDB[id]) {
      delete usersDB[id];
      return `DeleteUserById ${id}`;
    }
  }
}
