import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/application/use-cases/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data: { username: string; password: string }) {
    const token = this.authService.validateUser(data.username, data.password);
    if (!token) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    return { access_token: token };
  }
}
