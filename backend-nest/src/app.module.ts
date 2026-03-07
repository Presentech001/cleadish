import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { resolve } from 'path';
import { AuthModule } from './auth/auth.module';

// Load .env from backend root (same folder as package.json) so MONGODB_URI is always found
const backendRoot = resolve(__dirname, '..');
const envPaths = [
  resolve(backendRoot, '.env'),
  resolve(backendRoot, '.env.local'),
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envPaths,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI', 'mongodb://localhost:27017/tridish'),
        retryWrites: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
})
export class AppModule {}
