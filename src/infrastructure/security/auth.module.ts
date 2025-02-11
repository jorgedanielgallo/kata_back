import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from './auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from 'src/application/use-cases/auth/auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthGuard, JwtStrategy, AuthService],
  exports: [AuthGuard, JwtStrategy, JwtModule],
})
export class AuthModule {}
