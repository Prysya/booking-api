import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HotelsModule } from 'src/modules/hotels/hotels.module';
import { AuthModule } from './authentication/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BookingModule } from './modules/booking/booking.module';
import { SupportModule } from './modules/support/support.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { SupportRequestModule } from './modules/support-request/support-request.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('DB_HOST') ?? 'mongodb://localhost:27017',
        user: configService.get<string>('DB_USERNAME') ?? 'root',
        pass: configService.get<string>('DB_PASSWORD') ?? 'password',
        dbName: configService.get<string>('DB_NAME') ?? 'library_database',
      }),
      inject: [ConfigService],
    }),
    HotelsModule,
    AuthModule,
    UsersModule,
    BookingModule,
    SupportModule,
    ReservationModule,
    SupportRequestModule,
  ],
})
export class AppModule {}
