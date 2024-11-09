import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = YAML.load('doc/api.yaml');
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
