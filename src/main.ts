import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './common/adapters/redisIo.adapter';
import { RequestInterceptor } from './common/interceptors/request.interceptor';
import { HttpExceptionFilter } from './common/exceptions/httpException.filter';

(async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalInterceptors(new RequestInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  const PORT = configService.get<number>('PORT') ?? 3002;

  await app.listen(PORT);
  console.log(`Приложение запущено на: ${await app.getUrl()}`);
})();
