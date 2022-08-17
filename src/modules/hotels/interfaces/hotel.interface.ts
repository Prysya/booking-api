export interface CreateHotelDto {
  readonly title: ID;
  readonly description?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface IHotel extends CreateHotelDto {
  _id: ID;
}

export interface HotelParams {
  limit: number;
  offset: number;
}

export interface IHotelService {
  create(data: Partial<CreateHotelDto>): Promise<IHotel>;
  findById(id: ID): Promise<IHotel>;
  search(params: HotelParams): Promise<IHotel[]>;
  update(id: ID, data: Partial<CreateHotelDto>): Promise<IHotel>;
}
