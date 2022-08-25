import { IHotel } from 'src/modules/hotels/interfaces/hotel.interface';

export interface CreateHotelRoomDto {
  readonly hotel: ID | IHotel;
  readonly title: string;
  readonly description?: string;
  readonly images?: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly isEnabled: boolean;
}

export interface IHotelRoom extends CreateHotelRoomDto {
  _id: ID;
}

export interface SearchRoomsParams {
  limit: number;
  offset: number;
  title: ID;
  isEnabled?: true;
}

export interface IHotelRoomService {
  create(data: Partial<IHotelRoom>): Promise<IHotelRoom>;
  findById(id: ID, isEnabled?: boolean): Promise<IHotelRoom>;
  search(params: SearchRoomsParams): Promise<IHotelRoom[]>;
  update(id: ID, data: Partial<IHotelRoom>): Promise<IHotelRoom>;
}
