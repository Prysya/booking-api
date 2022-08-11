import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';

import type { TokenPayload } from 'src/authentication/interfaces/token-payload.interface';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    readonly configService: ConfigService,
  ) {}

  async validateUser(id): Promise<Omit<CreateUserDto, 'password'> | null> {
    const user = await this.usersService.findUserById(id);

    if (user) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async validateUserLocal(
    email: string,
    password: string,
  ): Promise<Omit<CreateUserDto, 'password'> | null> {
    const user = await this.usersService.findUser(email, password);

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
