import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  findUser(email: string, password: string) {
    return this.userModel
      .findOne({ email })
      .select('+password')
      .then((user) => {
        if (!user) {
          throw new UnauthorizedException();
        }

        return bcrypt.compare(password, user.passwordHash).then((matched) => {
          if (!matched) {
            throw new UnauthorizedException();
          }

          return user;
        });
      });
  }

  findUserById(id: string) {
    return this.userModel.findOne({ id });
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.passwordHash, 10),
    };

    return this.userModel.create(user);
  }
}
