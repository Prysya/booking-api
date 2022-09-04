import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/authentication/auth.service';
import { LoginValidation } from '../validation/auth.validation';
import { authMessages } from '../utils/auth-messages.util';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const { error } = LoginValidation.validate({ email, password });

    if (error) {
      throw new BadRequestException(authMessages.credentialsError);
    }

    const user = await this.authService.validateUserLocal(email, password);

    if (!user) {
      throw new UnauthorizedException(authMessages.userNotFound);
    }

    return user;
  }
}
