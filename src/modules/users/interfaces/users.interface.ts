export interface CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly contactPhone?: string;
  readonly role: 'client' | 'admin' | 'manager';
}

export interface IUser extends CreateUserDto {
  _id: string;
}

export interface SearchUserParams {
  limit: number;
  offset: number;
  email: string;
  name: string;
  contactPhone: string;
}

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<IUser>;
  findById(id: ID): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
  findAll(params: SearchUserParams): Promise<IUser[]>;
}
