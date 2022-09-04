import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UsersService } from '../../modules/users/users.service';
import { JwtTokenPayload } from '../interfaces/jwt-token-payload.interface';

@Injectable()
export class JwtCheckStrategy extends PassportStrategy(Strategy, 'jwt-check') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload?: JwtTokenPayload) {
    console.log('test');

    const user = await this.userService.findById(payload.userId);

    if (!user) {
      return null;
    }

    return user;
  }
}
