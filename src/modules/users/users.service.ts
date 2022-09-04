import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import {
  CreateUserDto,
  IUser,
  IUserService,
  SearchUserParams,
} from './interfaces/users.interface';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const user: CreateUserDto = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    return this.userModel.create(user);
  }

  findById(id: ID): Promise<IUser> {
    return this.userModel.findOne({ id }).exec();
  }

  findByEmail(email: string): Promise<IUser> {
    return this.userModel.findOne({ email }).exec();
  }

  findAll(params: SearchUserParams): Promise<IUser[]> {
    return this.userModel
      .find(
        {
          email: { $regex: params.email, $options: 'i' },
          name: { $regex: params.name, $options: 'i' },
          contactPhone: { $regex: params.contactPhone, $options: 'i' },
        },
        '_id email name contactPhone',
        { limit: params.limit, skip: params.offset },
      )
      .exec();
  }
}
