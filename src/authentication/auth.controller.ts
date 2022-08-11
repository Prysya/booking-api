import { Body, Controller, Post, Request } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UsersService } from 'src/modules/users/users.service';
import { AuthService } from 'src/authentication/auth.service';

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
    const user = await this.userService.findUser(body.email, body.password);

    return this.authService.sendToken(user);
  }

  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    const user = await this.userService.createUser(body);

    return this.authService.sendToken(user);
  }
}
