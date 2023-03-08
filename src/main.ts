import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { types } from 'pg';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);

  types.setTypeParser(
    types.builtins.INT8,
    (value: string | number | bigint | boolean) => Number(value),
  );
}
bootstrap();
