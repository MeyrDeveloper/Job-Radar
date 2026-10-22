import { Injectable } from '@nestjs/common';
import { CreateUserDto, ResponseUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(): ResponseUserDto {
    return {
      email: 'meir.forthings@gmail.com',
      firstName: 'meir',
      lastName: 'nurali',
    };
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
