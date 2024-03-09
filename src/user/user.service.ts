import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

import { usersDB } from './users-db';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user-password.dto';

@Injectable()
export class UserService {
  getUsers() {
    return Object.values(usersDB);
  }

  getUserById(id: string) {
    if (uuidValidate(id)) {
      if (id in usersDB) {
        return usersDB[id];
      } else {
        throw new NotFoundException('User is not found');
      }
    } else {
      throw new BadRequestException('User id is not correct');
    }
  }

  CreateUserDto(CreateUserDto: CreateUserDto) {
    if ('login' in UpdatePasswordDto && 'password' in UpdatePasswordDto) {
      const id = uuidv4();
      usersDB[id] = {
        id: id,
        login: CreateUserDto.login,
        password: CreateUserDto.password,
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      return {
        id: id,
        login: usersDB[id].login,
        version: 1,
        createdAt: usersDB[id].createdAt,
        updatedAt: usersDB[id].updatedAt,
      };
    } else {
      throw new BadRequestException('Request is not correct');
    }
  }

  UpdatePasswordDto(UpdatePasswordDto: UpdatePasswordDto, id: string) {
    if (
      'oldPassword' in UpdatePasswordDto &&
      'newPassword' in UpdatePasswordDto
    ) {
      if (uuidValidate(id)) {
        if (id in usersDB) {
          if ((usersDB[id].password = UpdatePasswordDto.oldPassword)) {
            usersDB[id].password = UpdatePasswordDto.newPassword;
            usersDB[id].version = ++usersDB[id].version;
            usersDB[id].updatedAt = Date.now();
          }
          return {
            id: id,
            login: usersDB[id].login,
            version: usersDB[id].version,
            createdAt: usersDB[id].createdAt,
            updatedAt: usersDB[id].updatedAt,
          };
        } else {
          throw new NotFoundException('User is not found');
        }
      } else {
        throw new BadRequestException('User id is not correct');
      }
    } else {
      throw new BadRequestException('Request is not correct');
    }
  }

  DeleteUserById(id: string) {
    if (uuidValidate(id)) {
      if (id in usersDB) {
        delete usersDB[id];
      } else {
        throw new NotFoundException('User is not found');
      }
    } else {
      throw new BadRequestException('User id is not correct');
    }
  }
}
