export interface CreateHotelDto {
  readonly title: ID;
  readonly description?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
export interface CreateHotelRoomDto {
  readonly hotel: ID;
  readonly description?: string;
  readonly images?: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly isEnabled: boolean;
}

export interface Hotel extends CreateHotelDto {
  _id: ID;
}

export interface HotelRoom extends CreateHotelRoomDto {
  _id: ID;
}

export interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: ID): Promise<Hotel>;
  search(params: Pick<Hotel, 'title'>): Promise<Hotel[]>;
}

export interface HotelRoom extends CreateHotelDto {
  _id: ID;
}

export interface SearchRoomsParams {
  limit: number;
  offset: number;
  title: string;
  isEnabled?: true;
}

export interface HotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom>;
  findById(id: ID, isEnabled?: true): Promise<HotelRoom>;
  search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom>;
}
