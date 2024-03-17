import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Note: make sure to import the customised one
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // console.log('MONGODB_URI', configService.get('MONGODB_URI'));
        const uriFromEnv = configService.get('MONGODB_URI');
        return {
          uri: uriFromEnv,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
