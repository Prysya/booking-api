import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import * as Joi from 'joi';

import { HotelsModule } from './modules/hotels/hotels.module';
import { AuthModule } from './authentication/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { SupportRequestModule } from './modules/support-request/support-request.module';
import { HotelRoomModule } from './modules/hotel-room/hotel-room.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        DB_HOST: Joi.string(),
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_NAME: Joi.string(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('DB_HOST') ?? 'mongodb://localhost:27017',
        user: configService.get<string>('DB_USERNAME') ?? 'root',
        pass: configService.get<string>('DB_PASSWORD') ?? 'password',
        dbName: configService.get<string>('DB_NAME') ?? 'booking_database',
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    HotelsModule,
    AuthModule,
    UsersModule,
    ReservationModule,
    SupportRequestModule,
    HotelRoomModule,
  ],
})
export class AppModule {}
