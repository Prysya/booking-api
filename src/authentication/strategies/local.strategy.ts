import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/authentication/auth.service';
import { LoginValidation } from '../validation/auth.validation';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const { error } = LoginValidation.validate({ email, password });

    if (error) {
      throw new BadRequestException(error);
    }

    const user = await this.authService.validateUserLocal(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
