import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          // 'mongoose-unique-validator' поддерживает только require импорт
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-unique-validator'), {
            message: 'Поле {PATH} не уникально',
          });
          return schema;
        },
      },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
