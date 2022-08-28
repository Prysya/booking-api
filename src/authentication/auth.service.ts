import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../modules/users/interfaces/users.interface';
import { UsersService } from '../modules/users/users.service';
import { JwtTokenPayload } from './interfaces/jwt-token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    readonly configService: ConfigService,
  ) {}

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new BadRequestException('Неверный email или пароль');
    }
  }

  public getCookieWithJwtToken(userId: string) {
    const payload: JwtTokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  async validateUserLocal(
    email: string,
    userPassword: string,
  ): Promise<Omit<CreateUserDto, 'password'> | null> {
    const currentUser = await this.usersService.findByEmail(email);
    await this.verifyPassword(userPassword, currentUser.password);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = currentUser;

    return user;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
