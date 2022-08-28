import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './common/adapters/redisIo.adapter';
import { AllExceptionsFilter } from './common/exceptions/all-exceptions.filter';

(async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.setGlobalPrefix('api');
  app.use(cookieParser());

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  const PORT = configService.get<number>('PORT') ?? 3002;

  await app.listen(PORT);
  console.log(`Приложение запущено на: ${await app.getUrl()}`);
})();
