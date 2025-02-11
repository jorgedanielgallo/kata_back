import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
} from './shared/constants';
import { ProjectModule } from './infrastructure/modules/project.module';
import { TaskModule } from './infrastructure/modules/task.module';
import { AuthModule } from './infrastructure/security/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get(DATABASE_HOST),
        port: +configService.get(DATABASE_PORT),
        username: configService.get(DATABASE_USER),
        password: configService.get(DATABASE_PASSWORD),
        database: configService.get(DATABASE_NAME),
        entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ProjectModule,
    TaskModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
