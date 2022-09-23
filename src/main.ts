import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { env } from 'process';
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors: any) => new BadRequestException(errors)
  }));
  // app.enableCors({
  //   origin:[`${env.FRONT_END_URL}`]
  // });
  app.enableCors() 
  await app.listen(env.END_POINT_URL || 3000);
}
bootstrap();
