import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // 하나의 모듈에서 Application을 생성한다.
  await app.listen(3000);
}
bootstrap();
