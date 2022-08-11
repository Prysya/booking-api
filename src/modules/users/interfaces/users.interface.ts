export interface CreateUserDto {
  readonly email: string;
  readonly passwordHash: string;
  readonly name: string;
  readonly contactPhone?: string;
  readonly role: 'client' | 'admin' | 'manager';
}

export interface User extends CreateUserDto {
  _id: string;
}

interface SearchUserParams {
  limit: number;
  offset: number;
  email: string;
  name: string;
  contactPhone: string;
}

interface IUserService {
  create(data: Partial<User>): Promise<User>;
  findById(id: ID): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(params: SearchUserParams): Promise<User[]>;
}
