import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Note: make sure to import the customised one
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uriFromEnv = configService.get('MONGODB_URI');
        return {
          uri: uriFromEnv,
        };
      },
    }),
  ],
})

// Note: lecture 10 at 12:26
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
