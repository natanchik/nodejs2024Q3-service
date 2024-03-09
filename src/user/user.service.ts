import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

import { users } from './users';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  getUsers() {
    return Object.values(users);
  }

  getUserById(id: string) {
    if (uuidValidate(id)) {
      if (id in users) {
        return users[id];
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
      users[id] = {
        id: id,
        login: CreateUserDto.login,
        password: CreateUserDto.password,
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      return {
        id: id,
        login: users[id].login,
        version: 1,
        createdAt: users[id].createdAt,
        updatedAt: users[id].updatedAt,
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
        if (id in users) {
          if ((users[id].password = UpdatePasswordDto.oldPassword)) {
            users[id].password = UpdatePasswordDto.newPassword;
            users[id].version = ++users[id].version;
            users[id].updatedAt = Date.now();
          }
          return {
            id: id,
            login: users[id].login,
            version: users[id].version,
            createdAt: users[id].createdAt,
            updatedAt: users[id].updatedAt,
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
      if (id in users) {
        delete users[id];
      } else {
        throw new NotFoundException('User is not found');
      }
    } else {
      throw new BadRequestException('User id is not correct');
    }
  }
}
