import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtCheckGuard extends AuthGuard('jwt-check') {
  handleRequest(err, user, info) {
    console.log({ err, user, info });
    return user;
  }
}
