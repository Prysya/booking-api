import {
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import JwtAuthGuard from '../common/guards/jwt-auth.guard';
import { LocalAuthenticationGuard } from '../common/guards/local-auth.guard';
import { UsersService } from '../modules/users/users.service';
import { AuthService } from './auth.service';
import { RequestWithUser } from './interfaces/request-with-user.intarface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;

    const cookie = this.authService.getCookieWithJwtToken(user._id);

    response.setHeader('Set-Cookie', cookie);

    const { email, name, contactPhone } = user;

    return response.send({ email, name, contactPhone });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }
}
