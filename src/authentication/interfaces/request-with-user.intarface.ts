import { Request } from 'express';
import { IUser } from '../../modules/users/interfaces/users.interface';

export interface RequestWithUser extends Request {
  user: IUser;
}
