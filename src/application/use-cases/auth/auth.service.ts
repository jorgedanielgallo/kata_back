import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private users = [
    { id: 1, username: 'admin', password: '123456' }, // Usuario de prueba
  ];

  constructor(private readonly jwtService: JwtService) {}

  validateUser(username: string, password: string): string | null {
    const user = this.users.find(
      (u) => u.username === username && u.password === password,
    );
    if (!user) return null;

    const payload = { sub: user.id, username: user.username };
    return this.jwtService.sign(payload);
  }
}
