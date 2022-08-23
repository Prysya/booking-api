import { Body, Controller, Post, Request } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../modules/users/interfaces/users.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Post('signin')
  async signin(
    @Request() req: any,
    @Body() body: Body & { email: string; password: string },
  ) {
    const user = await this.userService.findByEmail(body.email);

    return this.authService.sendToken(user);
  }

  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    const user = await this.userService.create(body);

    return this.authService.sendToken(user);
  }
}
