import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice<TcpOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('PAYMENTS_TCP_PORT'),
    },
  });

  app.useLogger(app.get(Logger));

  await app.startAllMicroservices(); // Note: this microservice now connected using TCP
}
bootstrap();
