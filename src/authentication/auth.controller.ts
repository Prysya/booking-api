import {
  Controller,
  Get,
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...currentUser } = user;

    return response.send(currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }
}
