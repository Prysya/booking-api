import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { CreateUserDto } from '../modules/users/interfaces/users.interface';
import { TokenPayload } from './interfaces/token-payload.interface';
import { UsersService } from '../modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    readonly configService: ConfigService,
  ) {}

  async validateUser(id): Promise<Omit<CreateUserDto, 'password'> | null> {
    const user = await this.usersService.findById(id);

    if (user) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async validateUserLocal(
    email: string,
  ): Promise<Omit<CreateUserDto, 'password'> | null> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  sendToken(user: any) {
    const payload: TokenPayload = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
    };

    const secret = this.configService.get('JWT_SECRET');

    return {
      access_token: this.jwtService.sign(payload, { secret }),
    };
  }
}
